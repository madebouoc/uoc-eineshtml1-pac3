const ejs = require('ejs');
const fs = require('fs');
const path = require('path');


ejs.views = './src/templates/';
ejs.views.partials = './src/templates/partials/';

const languages = ['es','en','ca'];
const defaultLanguage = 'es';

function render(templateFilePath){
    if (templateFilePath.endsWith('.ejs')) {
        const defaultliteralFile = JSON.parse(fs.readFileSync(`./src/locales/messages_${defaultLanguage}.json`, 'utf8'));
        //Por cada plantilla, por cada idioma...
        languages.forEach(function(lang){
            let literalFile = JSON.parse(fs.readFileSync(`./src/locales/messages_${lang}.json`, 'utf8'));
            //...si es español, sáltate esto
            //if(lang != defaultLanguage){
                literalFile = deepMerge(literalFile, defaultliteralFile);
            //}

            const renderedFilePath = templateFilePath.replace(".ejs",".html")
                .replace(path.sep+"templates"+path.sep, path.sep+"rendered"+path.sep+lang+path.sep);
            const options = {
                filename: templateFilePath,
                root: path.join(__dirname, 'src/templates')
            };
            console.log(renderedFilePath);
            console.log(JSON.stringify(literalFile).substring(0,100));
            ejs.renderFile(templateFilePath, literalFile, options, (err, renderedTemplate) => {
                if (err) throw err;
                //console.log(renderedFilePath);
                fs.writeFile(renderedFilePath, renderedTemplate, (err) => {
                    if (err) throw err;
                });
            });

        });
    }
}

function renderAll(){
    //crea las carpetas si las habíamos borrado
    languages.forEach(function(lang, index) {
        try{
            //fs.rmdirSync(`./src/rendered/${lang}`, { recursive: true });
            fs.mkdirSync(`./src/rendered/${lang}`, { recursive: true });
        }catch(error){};
    });
    //lee cada fichero de plantilla y hace el render multidoma
    fs.readdirSync(ejs.views).forEach(function (file) {
        const templateFilePath  = path.join(__dirname, 'src/templates', file);
        render(templateFilePath);
    });
}


function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

function deepMerge(obj1, obj2) {
    const output = { ...obj2 };
    if (!obj1) {
        return output;
    }
    Object.keys(obj1).forEach((key) => {
        if (isObject(obj1[key]) && isObject(obj2[key])) {
            output[key] = deepMerge(obj1[key], obj2[key]);
        } else if (obj2.hasOwnProperty(key)) {
            output[key] = obj1[key];
        }
    });
    return output;
}

renderAll();