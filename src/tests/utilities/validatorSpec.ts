import supertest from 'supertest';
import app from '../../index';

// create a request object
const request = supertest(app);

describe('Test request parameters validation', () => {
    const routePath = '/api/images';
    const fileName = 'fjord';
    const height = 20;
    const width = 20;
    describe('Test image file validation', () => {
        it('should be image file is missing', async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `${routePath}?width=${width}&height=${height}`
            );
            expect(response.text).toContain('image file is missing');
        });

        it('should be image file does not exist', async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `${routePath}?filename=wrongimage&width=${width}&height=${height}`
            );
            expect(response.text).toContain('image file does not exist');
        });
    });
    describe('Test width parameter validation', () => {
        it('should be width is missing', async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `${routePath}?filename=${fileName}&height=${height}`
            );
            expect(response.text).toContain('width is missing');
        });
        it('should be width is NaN', async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `${routePath}?filename=${fileName}&width=a&height=10`
            );
            expect(response.text).toContain('width is NaN');
        });
    });

    describe('Test height parameter validation', () => {
        it('should be height is missing', async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `${routePath}?filename=${fileName}&width=${width}`
            );
            expect(response.text).toContain('height is missing');
        });

        it('should be height is NaN', async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `${routePath}?filename=${fileName}&height=a&width=10`
            );
            expect(response.text).toContain('height is NaN');
        });
    });
});
