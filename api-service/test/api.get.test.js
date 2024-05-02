const request = require('supertest');
const app = require('../app.js');

describe('GET /album', () => {
    it('should return all albums', async () => {
        const res = await request(app).get('/album');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('GET /artist', () => {
    it('should return all artists', async () => {
        const res = await request(app).get('/artist');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('GET /concert', () => {
    it('should return all concerts', async () => {
        const res = await request(app).get('/concert');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('GET /country', () => {
    it('should return all countries', async () => {
        const res = await request(app).get('/country');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('GET /genre', () => {
    it('should return all genres', async () => {
        const res = await request(app).get('/genre');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('GET /playlist', () => {
    it('should return all playlists', async () => {
        const res = await request(app).get('/playlist');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('GET /role', () => {
    it('should return all roles', async () => {
        const res = await request(app).get('/role');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('GET /song', () => {
    it('should return all songs', async () => {
        const res = await request(app).get('/song');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('GET /tag', () => {
    it('should return all tags', async () => {
        const res = await request(app).get('/tag');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('GET /user', () => {
    it('should return all users', async () => {
        const res = await request(app).get('/user');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('GET /usersettings', () => {
    it('should return all user settings', async () => {
        const res = await request(app).get('/usersettings');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('GET /albumrating', () => {
    it('should return all album ratings', async () => {
        const res = await request(app).get('/albumrating');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('GET /albumreview', () => {
    it('should return all album reviews', async () => {
        const res = await request(app).get('/albumreview');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('GET /follow', () => {
    it('should return all follows', async () => {
        const res = await request(app).get('/follow');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('GET /playlistsong', () => {
    it('should return all playlist songs', async () => {
        const res = await request(app).get('/playlistsong');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('GET /songgenre', () => {
    it('should return all song genres', async () => {
        const res = await request(app).get('/songgenre');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('GET /songrating', () => {
    it('should return all song ratings', async () => {
        const res = await request(app).get('/songrating');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('GET /songreview', () => {
    it('should return all song reviews', async () => {
        const res = await request(app).get('/songreview');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('GET /songtag', () => {
    it('should return all song tags', async () => {
        const res = await request(app).get('/songtag');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});