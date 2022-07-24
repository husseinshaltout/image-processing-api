import supertest from 'supertest';
import app from '../../../index';
// create a request object
const request = supertest(app);

describe('Image processing endpoint test suite', () => {
    const routePath = '/api/images';
    it('should perform GET and response be 200', async (): Promise<void> => {
        const response: supertest.Response = await request.get(routePath);
        expect(response.status).toBe(200);
    });
});
