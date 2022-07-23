import supertest from 'supertest';
import app from '../../../index';

// create a request object
const request = supertest(app);

describe('Image processing test suite', () => {
    const path = '/api/images';
    const fileName = 'fjord';
    const height = 20;
    const width = 20;
    it('should perform GET and response be 200', async (): Promise<void> => {
        const response: supertest.Response = await request.get(path);
        expect(response.status).toBe(200);
    });
    describe('request parameters validation', () => {
        it('should be image file is missing', async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `${path}?width=${width}&height=${height}`
            );
            expect(response.text).toContain('image file is missing');
        });

        it('should be image file does not exist', async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `${path}?filename=wrongimage&width=${width}&height=${height}`
            );
            expect(response.text).toContain('image file is missing does not exist');
        });

        it('should be width is missing', async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `${path}?filename=${fileName}&height=${height}`
            );
            expect(response.text).toContain('width is missing');
        });

        it('should be height is missing', async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `${path}?filename=${fileName}&width=${width}`
            );
            expect(response.text).toContain('height is missing');
        });

        it('should be width is NaN', async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `${path}?filename=${fileName}&width=a&height=10`
            );
            expect(response.text).toContain('width is NaN');
        });

        it('should be height is NaN', async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `${path}?filename=${fileName}&height=a&width=10`
            );
            expect(response.text).toContain('height is NaN');
        });
    });
});
