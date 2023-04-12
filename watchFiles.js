const watch = require('watch');
const { exec } = require('child_process');


watch.createMonitor('./src/templates', { interval: 0.1, ignoreDotFiles: true, ignored: '**/rendered/**'}, function (monitor) {
    monitor.on('created', function (f, stat) {
        // El archivo es nuevo
        console.log(`${f} ha sido añadido`);
        renderiza();
    });
    monitor.on('changed', function (f, curr, prev) {
        // El archivo ha sido modificado
        console.log(`${f} ha sido modificado`);
        renderiza();
    });
    monitor.on('removed', function (f, stat) {
        // El archivo ha sido eliminado
        console.log(`${f} ha sido eliminado`);
        renderiza();
    });

});

watch.createMonitor('./src/locales', { interval: 0.1, ignoreDotFiles: true, ignored: '**/rendered/**'}, function (monitor) {
    monitor.on('created', function (f, stat) {
        // El archivo es nuevo
        console.log(`${f} ha sido añadido`);
        renderiza();
    });
    monitor.on('changed', function (f, curr, prev) {
        // El archivo ha sido modificado
        console.log(`${f} ha sido modificado`);
        renderiza();
    });
    monitor.on('removed', function (f, stat) {
        // El archivo ha sido eliminado
        console.log(`${f} ha sido eliminado`);
        renderiza();
    });

});

/*
watch.watchTree('./src/templates', {interval: 0.1}, function (f, curr, prev) {
    if (typeof f === 'object' && prev === null && curr === null) {
        // El directorio se está escaneando por primera vez
    } else if (prev === null) {
        // El archivo es nuevo
        console.log(`${f} ha sido añadido`);
    } else if (curr.nlink === 0) {
        // El archivo ha sido eliminado
        console.log(`${f} ha sido eliminado`);
    } else {
        // El archivo ha sido modificado
        console.log(`${f} ha sido modificado`);
    }
    renderiza();
});
*/



function renderiza(){
    exec('npm run renderTemplates', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
            return;
        }
    });
}
