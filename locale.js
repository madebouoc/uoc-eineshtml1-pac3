const propertiesReader = require('properties-reader');
const path = require('path');

const locales = ['en', 'es', 'ca'];
const localePath = './src/locales';
const encoding = 'utf-8';

const msg = {};

locales.forEach(locale => {
    const file = path.join(localePath, `messages_${locale}.properties`);
    const properties = propertiesReader(file, { encoding }).getAllProperties();
    msg[locale] = properties;
});

module.exports = msg;