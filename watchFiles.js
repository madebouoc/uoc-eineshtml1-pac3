const watch = require('watch');
const { exec } = require('child_process');


watch.createMonitor('./src/templates', { interval: 0.1, ignoreDotFiles: true, ignored: '**/rendered/**'}, function (monitor) {
    monitor.on('created', function (f, stat) {
        executeRenderTemplates();
    });
    monitor.on('changed', function (f, stat) {
        executeRenderTemplates();
    });
    monitor.on('removed', function (f, stat) {
        executeRenderTemplates();
    });
});

watch.createMonitor('./src/locales', { interval: 0.1, ignoreDotFiles: true, ignored: '**/rendered/**'}, function (monitor) {
    monitor.on('created', function (f, stat) {
        executeRenderTemplates();
    });
    monitor.on('changed', function (f, stat) {
        executeRenderTemplates();
    });
    monitor.on('removed', function (f, stat) {
        executeRenderTemplates();
    });
});


function executeRenderTemplates(){
    exec('npm run renderTemplates', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
        }
    });
}
