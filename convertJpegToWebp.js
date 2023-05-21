const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesFolderPath = './src/assets';
const outputFolderPath = './src/assets';

if (!fs.existsSync(outputFolderPath)) {
    fs.mkdirSync(outputFolderPath);
}

function processImageFile(filePath, outputPath) {
    sharp(filePath)
        .metadata()
        .then(function() {
            return sharp(filePath)
                .webp({ quality: 95 })
                .toFile(outputPath.replace('.jpeg','.webp').replace('.jpg','.webp'));
        })
        .then((info) => {
            console.log('WEBP creado', info);
        })
        .catch((err) => {
            console.error('Error al crear WEBP:', err);
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