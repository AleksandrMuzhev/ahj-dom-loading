const moviesData = [
    { id: 26, title: "Побег из Шоушенка", imdb: 9.30, year: 1994 },
    { id: 25, title: "Крёстный отец", imdb: 9.20, year: 1972 },
    { id: 27, title: "Крёстный отец 2", imdb: 9.00, year: 1974 },
    { id: 1047, title: "Тёмный рыцарь", imdb: 9.00, year: 2008 },
    { id: 223, title: "Криминальное чтиво", imdb: 8.90, year: 1994 }
];

class MovieTable {
    constructor() {
        this.currentField = 'id';
        this.currentOrder = 'asc'; // 'asc' или 'desc'
        this.sortInterval = null;
        this.sortConfigs = [
            { field: 'id', order: 'asc' },
            { field: 'id', order: 'desc' },
            { field: 'title', order: 'asc' },
            { field: 'title', order: 'desc' },
            { field: 'year', order: 'asc' },
            { field: 'year', order: 'desc' },
            { field: 'imdb', order: 'asc' },
            { field: 'imdb', order: 'desc' }
        ];
        this.configIndex = 0;
    }

    init() {
        this.renderTable();
        this.startSorting();
        this.updateSortInfo();
    }

    renderTable() {
        const tbody = document.getElementById('movies-body');
        tbody.innerHTML = '';

        // Сортируем данные
        const sortedData = this.sortData();

        sortedData.forEach(movie => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', movie.id);
            row.setAttribute('data-title', movie.title);
            row.setAttribute('data-year', movie.year);
            row.setAttribute('data-imdb', movie.imdb.toFixed(2));

            row.innerHTML = `
                <td>${movie.id}</td>
                <td>${movie.title}</td>
                <td>${movie.year}</td>
                <td>imdb: ${movie.imdb.toFixed(2)}</td>
            `;

            tbody.appendChild(row);
        });

        this.updateSortIndicators();
    }

    sortData() {
        const sorted = [...moviesData];

        sorted.sort((a, b) => {
            let aVal = a[this.currentField];
            let bVal = b[this.currentField];

            // Для строк сравниваем без учета регистра
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            if (aVal < bVal) return this.currentOrder === 'asc' ? -1 : 1;
            if (aVal > bVal) return this.currentOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    }

    startSorting() {
        this.sortInterval = setInterval(() => {
            const config = this.sortConfigs[this.configIndex];
            this.currentField = config.field;
            this.currentOrder = config.order;

            this.renderTable();
            this.updateSortInfo();

            this.configIndex = (this.configIndex + 1) % this.sortConfigs.length;
        }, 2000);
    }

    updateSortInfo() {
        const fieldNames = {
            id: 'ID',
            title: 'названию',
            year: 'году выпуска',
            imdb: 'рейтингу IMDB'
        };

        const orderNames = {
            asc: 'по возрастанию',
            desc: 'по убыванию'
        };

        const sortField = document.getElementById('sort-field');
        const sortOrder = document.getElementById('sort-order');

        if (sortField) sortField.textContent = fieldNames[this.currentField];
        if (sortOrder) sortOrder.textContent = orderNames[this.currentOrder];
    }

    updateSortIndicators() {
        const headers = document.querySelectorAll('.movies-table th');
        headers.forEach(header => {
            header.classList.remove('sorted-asc', 'sorted-desc');
            const field = header.dataset.field;
            if (field === this.currentField) {
                header.classList.add(this.currentOrder === 'asc' ? 'sorted-asc' : 'sorted-desc');
            }
        });
    }

    stopSorting() {
        if (this.sortInterval) {
            clearInterval(this.sortInterval);
        }
    }
}

module.exports = MovieTable;