const request = require('supertest');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');
const app = require('../app');
const { Account } = require('../models');

jest.mock('axios');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../common-utils/modules/accessToken', () => ({
    verifyTokenUser: () => (req, res, next) => next(),
    verifyTokenAdmin: () => (req, res, next) => next(),
}));
jest.mock('../models', () => {
    const SequelizeMock = require('sequelize-mock');
    const mockDb = new SequelizeMock();

    const mockAccount = mockDb.define('Account', {
        id: 1,
        email: 'test@example.com',
        password: 'hashed_password',
    });

    mockAccount.create = jest.fn();
    mockAccount.findOne = jest.fn();
    mockAccount.findByPk = jest.fn();

    const mockTransaction = {
        commit: jest.fn(),
        rollback: jest.fn(),
    };

    return {
        Account: mockAccount,
        sequelize: {
            transaction: jest.fn().mockResolvedValue(mockTransaction),
        },
    };
});

describe('User Routes', () => {
    const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'hashedpassword',
        countryId: 1,
        role: 'User',
        accountStatus: 'ACTIVE',
        save: jest.fn().mockResolvedValue(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /register', () => {
        it('should register a new user successfully', async () => {
            bcrypt.hash.mockResolvedValue('hashedpassword');
            Account.create.mockResolvedValue(mockUser);
            Account.findOne.mockResolvedValue(null);

            axios.post.mockResolvedValue({ data: { success: true } });

            const response = await request(app)
                .post('/user/register')
                .send({
                    username: mockUser.username,
                    firstname: 'Test',
                    lastname: 'User',
                    email: mockUser.email,
                    password: 'password',
                    countryId: mockUser.countryId,
                    role: mockUser.role,
                });

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('User created successfully');
        });

        it('should return error if username is already taken', async () => {
            Account.findOne.mockResolvedValue({ username: 'existinguser' });

            const response = await request(app)
                .post('/user/register')
                .send({
                    username: 'existinguser',
                    firstname: 'Test',
                    lastname: 'User',
                    email: 'testuser@example.com',
                    password: 'password',
                    countryId: 1,
                    role: 'User',
                });

            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBe('Username is already taken');
        });
    });

    describe('POST /login', () => {
        it('should login successfully', async () => {
            Account.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('mockToken');

            const response = await request(app)
                .post('/user/login')
                .send({
                    username: 'testuser',
                    password: 'password',
                });

            expect(response.statusCode).toBe(200);
            expect(response.body.token).toBe('mockToken');
        });

        it('should return error if credentials are invalid', async () => {
            Account.findOne.mockResolvedValue(null);

            const response = await request(app)
                .post('/user/login')
                .send({
                    username: 'wronguser',
                    password: 'password',
                });

            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBe('Invalid credentials');
        });
    });

    describe('PUT /change-password/:id', () => {
        it('should change password successfully', async () => {
            Account.findByPk.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);
            bcrypt.hash.mockResolvedValue('newhashedpassword');

            const token = jwt.sign(
                { userId: mockUser.id, username: mockUser.username, status: mockUser.accountStatus, role: 'User' },
                config.tokenSecret
            );

            const response = await request(app)
                .put(`/user/change-password/${mockUser.id}`)
                .set('Authorization', token)
                .send({
                    userId: mockUser.id,
                    oldPassword: 'oldpassword',
                    newPassword: 'newpassword',
                });

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Password updated successfully');
        });

        it('should return error if old password is incorrect', async () => {
            Account.findByPk.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(false);

            const response = await request(app)
                .put(`/user/change-password/${mockUser.id}`)
                .send({
                    userId: mockUser.id,
                    oldPassword: 'wrongoldpassword',
                    newPassword: 'newpassword',
                });

            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBe('Old password is incorrect');
        });
    });
});
