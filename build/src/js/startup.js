seajs.config({
    paths: {
        '%cwd%': seajs.data.cwd.replace(/[\/]$/g, '')
    }
});

window.console.disabled = true;

seajs.use(['seajs.css', 'seajs.queue', 'jquery', '%cwd%/js/test/touch'], function() {

    seajs.use('%cwd%/css/main.css');

    seajs.use('class');

    //$(document.body).append('');
});
