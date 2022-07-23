import supertest from 'supertest';
import app from '../../../index';
import imageResize from '../../../utilities/imageResize';
import path from 'path';
// create a request object
const request = supertest(app);

describe('Image processing test suite', () => {
    const route_path = '/api/images';
    const fileName = 'fjord';
    const height = 20;
    const width = 20;
    it('should perform GET and response be 200', async (): Promise<void> => {
        const response: supertest.Response = await request.get(route_path);
        expect(response.status).toBe(200);
    });
    describe('request parameters validation', () => {
        it('should be image file is missing', async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `${route_path}?width=${width}&height=${height}`
            );
            expect(response.text).toContain('image file is missing');
        });

        it('should be image file does not exist', async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `${route_path}?filename=wrongimage&width=${width}&height=${height}`
            );
            expect(response.text).toContain('image file does not exist');
        });

        it('should be width is missing', async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `${route_path}?filename=${fileName}&height=${height}`
            );
            expect(response.text).toContain('width is missing');
        });

        it('should be height is missing', async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `${route_path}?filename=${fileName}&width=${width}`
            );
            expect(response.text).toContain('height is missing');
        });

        it('should be width is NaN', async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `${route_path}?filename=${fileName}&width=a&height=10`
            );
            expect(response.text).toContain('width is NaN');
        });

        it('should be height is NaN', async (): Promise<void> => {
            const response: supertest.Response = await request.get(
                `${route_path}?filename=${fileName}&height=a&width=10`
            );
            expect(response.text).toContain('height is NaN');
        });
    });
    describe('Test image resize funtion', () => {
        const imagesDir: string = path.resolve(__dirname, '../../../../assets/images');
        it('should add numbers in array and be truthy', () => {
            expect(async () => {
                await imageResize(
                    `${imagesDir}/full/${fileName}`,
                    height,
                    width,
                    `${imagesDir}/test_${width}_${height}.jpg`
                );
            }).not.toThrow();
        });
    });
});
