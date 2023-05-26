const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesFolderPath = './src/assets/banner';

async function processImageFile(filePath) {
    const directory = path.dirname(filePath);
    const extension = path.extname(filePath);
    const filename = path.basename(filePath, extension);

    const outputPath300 = path.join(directory, `${filename}_300${extension}`);
    const outputPath600 = path.join(directory, `${filename}_600${extension}`);
    const outputPath1200 = path.join(directory, `${filename}_1200${extension}`);
    const outputPath1920 = path.join(directory, `${filename}_1920${extension}`);
    const outputPath2560 = path.join(directory, `${filename}_2560${extension}`);

    // Obtén las dimensiones de la imagen original
    const metadata = await sharp(filePath).metadata();

    // Si la imagen original es más ancha que 300px, crea una versión de 300px
    if (metadata.width > 300) {
        sharp(filePath)
            .resize({ width: 300, withoutEnlargement: true })
            .jpeg({ quality: 95 })
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

    // Si la imagen original es más ancha que 600px, crea una versión de 600px
    if (metadata.width > 1200) {
        sharp(filePath)
            .resize({ width: 1200, withoutEnlargement: true })
            .toFile(outputPath1200)
            .then((info) => {
                console.log('Imagen redimensionada a 1200px:', info);
            })
            .catch((err) => {
                console.error('Error al redimensionar la imagen a 1200px:', err);
            });
    }

    // Si la imagen original es más ancha que 600px, crea una versión de 600px
    if (metadata.width > 1920) {
        sharp(filePath)
            .resize({ width: 1920, withoutEnlargement: true })
            .toFile(outputPath1920)
            .then((info) => {
                console.log('Imagen redimensionada a 1920px:', info);
            })
            .catch((err) => {
                console.error('Error al redimensionar la imagen a 1920px:', err);
            });
    }

    // Si la imagen original es más ancha que 600px, crea una versión de 600px
    if (metadata.width > 2560) {
        sharp(filePath)
            .resize({ width: 2560, withoutEnlargement: true })
            .toFile(outputPath2560)
            .then((info) => {
                console.log('Imagen redimensionada a 2560px:', info);
            })
            .catch((err) => {
                console.error('Error al redimensionar la imagen a 2560px:', err);
            });
    }
}

function processFolder(inputFolderPath) {
    fs.readdirSync(inputFolderPath).forEach((file) => {
        const inputFilePath = path.join(inputFolderPath, file);
        if (fs.lstatSync(inputFilePath).isDirectory()) {
            //No recorrer subdirectorios
        } else {
            const ext = path.extname(inputFilePath).toLowerCase();
            if (ext === '.jpg' || ext === '.jpeg') {
                processImageFile(inputFilePath);
            }
        }
    });
}

processFolder(imagesFolderPath);
