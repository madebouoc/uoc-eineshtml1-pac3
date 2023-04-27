const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesFolderPath = './documents/photos_original';
const outputFolderPath = './src/assets/photos';

if (!fs.existsSync(outputFolderPath)) {
    fs.mkdirSync(outputFolderPath);
}

function processImageFile(filePath, outputPath) {
    sharp(filePath)
        .metadata()
        .then((metadata) => {
            const isLandscape = metadata.width >= metadata.height;
            const resizeOptions = isLandscape
                ? { width: 1200, withoutEnlargement: true }
                : { height: 1200, withoutEnlargement: true };

            return sharp(filePath)
                .resize(resizeOptions)
                .toFile(outputPath);
        })
        .then((info) => {
            console.log('Imágenes redimensionadas', info);
        })
        .catch((err) => {
            console.error('Error al redimensionar la imagen:', err);
        });
}

function processFolder(inputFolderPath, outputFolderPath) {
    fs.readdirSync(inputFolderPath).forEach((file) => {
        const inputFilePath = path.join(inputFolderPath, file);
        const outputFile = path.join(outputFolderPath, file);

        if (fs.lstatSync(inputFilePath).isDirectory()) {
            if (!fs.existsSync(outputFile)) {
                fs.mkdirSync(outputFile);
            }
            processFolder(inputFilePath, outputFile);
        } else {
            const ext = path.extname(inputFilePath).toLowerCase();
            if (ext === '.jpg' || ext === '.jpeg') {
                processImageFile(inputFilePath, outputFile);
            }
        }
    });
}

processFolder(imagesFolderPath, outputFolderPath);