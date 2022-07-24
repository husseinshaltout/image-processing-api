import imageResize from '../../utilities/imageResize';
import path from 'path';

describe('Test image resize funtion', () => {
    const fileName = 'fjord.jpg';
    const height = 20;
    const width = 20;
    const imagesDir: string = path.resolve(__dirname, '../../../assets/images');
    it('should resize image and not throw error', () => {
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
