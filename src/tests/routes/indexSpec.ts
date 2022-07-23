import supertest from 'supertest';
import app from '../../index';

// create a request object
const request = supertest(app);

describe('Test routes endpoint response', () => {
    it('test api endpoint', async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
    });
});
