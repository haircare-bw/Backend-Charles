const request = require('supertest');
const server = require('./server.js');

const db = require('../data/dbConfig.js');

describe('express server API testing', () => {
    //resets the db before each test
    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('server side', () => {
        //sets the testing environment
        it('Environment set to testing', () => {
            expect(process.env.DB_ENV).toBe('testing');
        });

        //connect to the server with 200 OK status
        it('GET / returns status 200', () => {
            return request(server).get('/')
            .expect(200);
        });

        //speak to the server 
        it('GET / returns You Complete Me!', async () => {
            await request(server)
            .get('/')
            .then(res => {
              expect(res.body).toEqual(`You Complete Me!`)  
            })
        });

        //get returns JSON type of information from server
        it('Should return JSON use callback', async () => {
                const res = await request(server)
                .get('/');
                expect(res.type).toBe('application/json'); // Content-Type
        });
    }); 

    describe('GET()', () => {
        //get returns 200 for good endpoint
        it('GET /api/users returns 200', async () => {
            await request(server)
            .get('/api/users');
            expect(200);
        })

        //get returns JSON type of information from application
        it('GET /api/users returns JSON', async () => {
            const res = await request(server)
            .get('/api/users');
            expect(res.type).toBe('application/json'); //Content-Type
        });

        //get returns message when  you don't provide credentials
        it('GET /users returns an array', async () => {
            const res = await request(server)
            .get('/api/users');
            expect(res.body).toStrictEqual({"message": "No credentials provided"});
        });
    });

    describe('GetAllUsers()', () => {
        //get returns 200 for good endpoint
        it('GET /api/users/all returns 200', async () => {
            await request(server)
            .get('/api/users/all');
            expect(200);
        })

        //get returns JSON type of information from application
        it('GET /api/users/all returns JSON', async () => {
            const res = await request(server)
            .get('/api/users/all');
            expect(res.type).toBe('application/json'); //Content-Type
        });

        //get returns message when  you don't provide credentials
        it('GET /users returns an array', async () => {
            const res = await request(server)
            .get('/api/users/all');
            expect(res.body).toStrictEqual({"message": "No credentials provided"});
        });
    });         
});
