const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesFolderPath = './src/assets/photos';

async function processImageFile(filePath) {
    const directory = path.dirname(filePath);
    const extension = path.extname(filePath);
    const filename = path.basename(filePath, extension);

    const outputPath300 = path.join(directory, `${filename}_300${extension}`);
    const outputPath600 = path.join(directory, `${filename}_600${extension}`);

    // Obtén las dimensiones de la imagen original
    const metadata = await sharp(filePath).metadata();

    // Si la imagen original es más ancha que 300px, crea una versión de 300px
    if (metadata.width > 300) {
        sharp(filePath)
            .resize({ width: 300, withoutEnlargement: true })
            .toFile(outputPath300)
            .then((info) => {
                console.log('Imagen redimensionada a 300px:', info);
            })
            .catch((err) => {
                console.error('Error al redimensionar la imagen a 300px:', err);
            });
    }

    // Si la imagen original es más ancha que 600px, crea una versión de 600px
    if (metadata.width > 600) {
        sharp(filePath)
            .resize({ width: 600, withoutEnlargement: true })
            .toFile(outputPath600)
            .then((info) => {
                console.log('Imagen redimensionada a 600px:', info);
            })
            .catch((err) => {
                console.error('Error al redimensionar la imagen a 600px:', err);
            });
    }
}

function processFolder(inputFolderPath) {
    fs.readdirSync(inputFolderPath).forEach((file) => {
        const inputFilePath = path.join(inputFolderPath, file);
        if (fs.lstatSync(inputFilePath).isDirectory()) {
            processFolder(inputFilePath);
        } else {
            const ext = path.extname(inputFilePath).toLowerCase();
            if (ext === '.jpg' || ext === '.jpeg') {
                processImageFile(inputFilePath);
            }
        }
    });
}

processFolder(imagesFolderPath);
