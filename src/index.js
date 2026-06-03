require('./css/style.css');

const MovieTable = require('./js/app');

document.addEventListener('DOMContentLoaded', () => {
    const table = new MovieTable();
    table.init();
});