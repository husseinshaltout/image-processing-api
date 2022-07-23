import sharp from 'sharp';

const imageResize = async (
    file: string,
    imgWidth: number,
    imgHeight: number,
    outputPath: string
) => {
    try {
        await sharp(file)
            .resize({
                width: imgWidth,
                height: imgHeight
            })
            .toFile(outputPath);
    } catch (error) {
        console.log(error);
    }
};

export default imageResize;
