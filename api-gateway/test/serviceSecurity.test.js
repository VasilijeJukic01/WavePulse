const dotenv = require('dotenv');
dotenv.config();

const request = require('supertest');
const express = require('express');
const setupSecurity = require('../modules/serviceSecurity');

describe('Security Middleware', () => {
    let app;

    // Setup
    beforeEach(() => {
        app = express();
        setupSecurity(app);
        app.get('/test', (req, res) => res.send('ok'));
        app.post('/test', (req, res) => res.send('post ok'));
    });

    // Teardown
    afterEach(() => {
        jest.resetModules();
        process.env.NODE_ENV = 'test';
    });

    describe('CORS Configuration', () => {
        it('should set CORS headers for allowed origins', async () => {
            const allowedOrigin = process.env.CORS_ORIGINS.split(',')[0];
            const res = await request(app)
                .get('/test')
                .set('Origin', allowedOrigin);
            expect(res.headers['access-control-allow-origin']).toBe(allowedOrigin);
        });

        it('should not allow disallowed origins', async () => {
            const res = await request(app)
                .get('/test')
                .set('Origin', 'http://disallowed-origin.com');
            expect(res.headers['access-control-allow-origin']).toBeUndefined();
        });

        it('should handle multiple allowed origins', async () => {
            const origins = process.env.CORS_ORIGINS.split(',');
            for (const origin of origins) {
                const res = await request(app)
                    .get('/test')
                    .set('Origin', origin);
                expect(res.headers['access-control-allow-origin']).toBe(origin);
            }
        });
    });

    describe('Helmet Security Headers', () => {
        it('should set Content Security Policy headers', async () => {
            const res = await request(app).get('/test');
            expect(res.headers['content-security-policy']).toBeDefined();
            const csp = res.headers['content-security-policy'];
            expect(csp).toContain("default-src 'self'");
            expect(csp).toContain("script-src 'self' 'unsafe-inline'");
            expect(csp).toContain("object-src 'none'");
            expect(csp).toContain("upgrade-insecure-requests");
        });

        it('should set Referrer-Policy header to strict-origin', async () => {
            const res = await request(app).get('/test');
            expect(res.headers['referrer-policy']).toBe('strict-origin');
        });

        it('should set Cross-Origin-Resource-Policy to same-origin', async () => {
            const res = await request(app).get('/test');
            expect(res.headers['cross-origin-resource-policy']).toBe('same-origin');
        });

        it('should enforce frameguard to deny framing', async () => {
            const res = await request(app).get('/test');
            expect(res.headers['x-frame-options']).toBe('DENY');
        });

        it('should set Strict-Transport-Security header correctly', async () => {
            const res = await request(app).get('/test');
            expect(res.headers['strict-transport-security']).toBeDefined();
            expect(res.headers['strict-transport-security']).toMatch(/max-age=31536000/);
            expect(res.headers['strict-transport-security']).toMatch(/includeSubDomains/);
            expect(res.headers['strict-transport-security']).toMatch(/preload/);
        });

        it('should disable X-Powered-By header', async () => {
            const res = await request(app).get('/test');
            expect(res.headers['x-powered-by']).toBeUndefined();
        });

        it('should set X-Content-Type-Options to nosniff', async () => {
            const res = await request(app).get('/test');
            expect(res.headers['x-content-type-options']).toBe('nosniff');
        });

        it('should set X-Download-Options to noopen', async () => {
            const res = await request(app).get('/test');
            expect(res.headers['x-download-options']).toBe('noopen');
        });

        it('should set X-XSS-Protection to 0', async () => {
            const res = await request(app).get('/test');
            expect(res.headers['x-xss-protection']).toBe('0');
        });
    });

    describe('Rate Limiting', () => {
        it('should allow up to 100 requests within window', async () => {
            for (let i = 0; i < 100; i++) {
                const res = await request(app).get('/test');
                expect(res.status).toBe(200);
                expect(res.text).toBe('ok');
            }
        });

        it('should block requests exceeding rate limit', async () => {
            for (let i = 0; i < 100; i++) {
                await request(app).get('/test');
            }
            const res = await request(app).get('/test');
            expect(res.status).toBe(429);
            expect(res.text).toMatch(/Too many requests/);
        });

        it('should reset rate limit after window expires', async () => {
            jest.useFakeTimers();
            for (let i = 0; i < 100; i++) {
                await request(app).get('/test');
            }
            let res = await request(app).get('/test');
            expect(res.status).toBe(429);

            // Advance time by 15 minutes
            jest.advanceTimersByTime(15 * 60 * 1000);

            res = await request(app).get('/test');
            expect(res.status).toBe(200);
            expect(res.text).toBe('ok');

            jest.useRealTimers();
        });
    });

    describe('CSRF Protection', () => {
        describe('Production Environment', () => {
            let agent;
            let xsrfToken;

            beforeEach(async () => {
                process.env.NODE_ENV = 'production';
                app = express();
                setupSecurity(app);
                // Parse URL-encoded bodies
                app.use(express.urlencoded({ extended: false }));
                // Parse JSON bodies
                app.use(express.json());
                app.post('/test', (req, res) => res.send('post ok'));

                agent = request.agent(app);
                const res = await agent.get('/test');
                const cookies = res.headers['set-cookie'];
                const xsrfCookie = cookies.find(cookie => cookie.startsWith('XSRF-TOKEN'));
                if (xsrfCookie) {
                    xsrfToken = decodeURIComponent(xsrfCookie.split(';')[0].split('=')[1]);
                }
            });

            it('should set CSRF token cookie', () => {
                expect(xsrfToken).toBeDefined();
            });

            it('should allow POST requests with valid CSRF token', async () => {
                const postRes = await agent
                    .post('/test')
                    .set('X-XSRF-TOKEN', xsrfToken)
                    .send();
                expect(postRes.status).toBe(200);
                expect(postRes.text).toBe('post ok');
            });

            it('should reject POST requests without CSRF token', async () => {
                const res = await agent
                    .post('/test')
                    .send();
                expect(res.status).toBe(403);
                expect(res.text).toMatch(/Forbidden/i);
            });

            it('should reject POST requests with invalid CSRF token', async () => {
                const res = await agent
                    .post('/test')
                    .set('X-XSRF-TOKEN', 'invalidtoken')
                    .send();
                expect(res.status).toBe(403);
                expect(res.text).toMatch(/Forbidden/i);
            });
        });

        describe('Non-Production Environment', () => {
            beforeEach(() => {
                process.env.NODE_ENV = 'development';
                app = express();
                setupSecurity(app);
                app.use(express.urlencoded({ extended: false }));
                app.use(express.json());
                app.post('/test', (req, res) => res.send('post ok'));
            });

            it('should not set CSRF token cookie', async () => {
                const res = await request(app).get('/test');
                expect(res.headers['set-cookie']).not.toEqual(
                    expect.arrayContaining([expect.stringContaining('XSRF-TOKEN')])
                );
            });

            it('should allow POST requests without CSRF token', async () => {
                const res = await request(app)
                    .post('/test');
                expect(res.status).toBe(200);
                expect(res.text).toBe('post ok');
            });
        });
    });

    describe('Cookie Parser', () => {
        it('should parse cookies correctly', async () => {
            app.get('/cookies', (req, res) => {
                res.json({ cookies: req.cookies });
            });

            const res = await request(app)
                .get('/cookies')
                .set('Cookie', 'testcookie=12345; anothercookie=67890');

            expect(res.body.cookies).toEqual({
                testcookie: '12345',
                anothercookie: '67890'
            });
        });
    });
});
