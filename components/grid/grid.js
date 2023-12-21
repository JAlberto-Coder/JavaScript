"use strict";

class GridComponent {
    constructor() {
        this.currentPage = 1;
        this.selectedData = null;
        this.selectedRow = null;
    }

    create (containerId, config, data, rowsPerPage = 25, height = 256) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        this.createHeader(container, config);
        const tbody = this.createBody(container, config, data, rowsPerPage, height);
        this.createPagination(containerId, container, config, data, rowsPerPage, tbody);
    }

    createHeader (container, config) {
        const headerTable = document.createElement('table');
        headerTable.classList.add('custom-table');
        headerTable.style.tableLayout = 'fixed';
        headerTable.style.width = '100%';

        const headerColgroup = this.createColgroup(config);
        headerTable.appendChild(headerColgroup);

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        config.forEach(column => {
            const th = document.createElement('th');
            th.innerHTML = `<i class="${column.faIcon}"></i> ${column.title}`;
            headerRow.appendChild(th);
        });

        const scrollColumn = document.createElement('th');
        scrollColumn.style.width = '18px';
        scrollColumn.style.border = 'none';
        headerRow.appendChild(scrollColumn);

        thead.appendChild(headerRow);
        headerTable.appendChild(thead);
        container.appendChild(headerTable);
    }

    createBody (container, config, data, rowsPerPage, height) {
        const bodyWrapper = document.createElement('div');
        bodyWrapper.style.overflowY = 'scroll';
        bodyWrapper.style.borderLeft = '1px solid #F5F5F6';
        bodyWrapper.style.height = `${height}px`;
        container.appendChild(bodyWrapper);

        const bodyTable = document.createElement('table');
        bodyTable.classList.add('custom-table-body', 'body-table');
        bodyTable.style.tableLayout = 'fixed';
        bodyTable.style.width = '100%';

        const bodyColgroup = this.createColgroup(config);
        bodyTable.appendChild(bodyColgroup);

        const tbody = document.createElement('tbody');
        bodyTable.appendChild(tbody);
        bodyWrapper.appendChild(bodyTable);

        this.renderPage(config, data, tbody, rowsPerPage);

        return tbody;
    }

    createColgroup (config) {
        const colgroup = document.createElement('colgroup');
        config.forEach(column => {
            const col = document.createElement('col');
            col.style.width = column.width;
            colgroup.appendChild(col);
        });
        return colgroup;
    }

    createPagination(containerId, container, config, data, rowsPerPage, tbody) {
        const paginationControls = document.createElement('div');
        paginationControls.classList.add('pagination-controls');
        paginationControls.style.display = 'flex';
        paginationControls.style.justifyContent = 'space-between'; 
        paginationControls.style.alignItems = 'center';
        paginationControls.style.width = '100%';

        const navContainer = document.createElement('div');
        navContainer.style.display = 'flex';
        navContainer.style.alignItems = 'center';

        const prevButton = document.createElement('button');
        prevButton.innerHTML = '<i class="fa fa-chevron-left" aria-hidden="true"></i>';
        prevButton.addEventListener('click', () => {
            this.changePage(containerId, -1, config, data, tbody, rowsPerPage);
        });
        this.setButtonStyles(prevButton);

        const nextButton = document.createElement('button');
        nextButton.innerHTML = '<i class="fa fa-chevron-right" aria-hidden="true"></i>';
        nextButton.addEventListener('click', () => {
            this.changePage(containerId, 1, config, data, tbody, rowsPerPage);
        });
        this.setButtonStyles(nextButton);

        navContainer.appendChild(prevButton);
        navContainer.appendChild(nextButton);

        paginationControls.appendChild(navContainer);

        const pageInfo = document.createElement('span');
        pageInfo.id = `${containerId}-page-info`;
        pageInfo.innerHTML = `${data.length === 0 ? '0' : '1' } de ${Math.ceil(data.length / rowsPerPage)} P&aacute;ginas | ${data.length} Registros`;

        const rightSideContainer = document.createElement('div');
        rightSideContainer.appendChild(pageInfo);

        rightSideContainer.style.display = 'flex';
        rightSideContainer.style.alignItems = 'center';
        rightSideContainer.style.justifyContent = 'flex-end';

        paginationControls.appendChild(rightSideContainer);
        container.appendChild(paginationControls);
    }

    renderPage (config, data, tbody, rowsPerPage) {
        tbody.innerHTML = '';
        tbody.setAttribute('role', 'rowgroup');

        const start = (this.currentPage - 1) * rowsPerPage;
        const end = Math.min(start + rowsPerPage, data.length);

        for (let i = start; i < end; i++) {
            const item = data[i];
            const tr = document.createElement('tr');
            tr.style.cursor = 'pointer';
            tr.style.height = '18px';
            tr.setAttribute('role', 'row');
            tr.dataItem = JSON.stringify(item);

            tr.addEventListener('click', () => {
                if (this.selectedRow) {
                    this.selectedRow.classList.remove('selected');
                }
                tr.classList.add('selected');
                this.selectedRow = tr;
                this.selectedData = tr.dataItem;
            });

            config.forEach(column => {
                const td = document.createElement('td');
                td.style.textAlign = column.align;
                td.textContent = item[column.field] || '-';
                td.style.width = column.width;
                td.setAttribute('role', 'cell');
                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        }
    }

    changePage(containerId, direction, config, data, tbody, rowsPerPage) {
        const totalPages = Math.ceil(data.length / rowsPerPage);

        this.currentPage += direction;

        if (this.currentPage < 1) {
            this.currentPage = 1;
        } else if (this.currentPage > totalPages) {
            this.currentPage = totalPages;
        }

        this.renderPage(config, data, tbody, rowsPerPage);

        const pageInfo = document.getElementById(`${containerId}-page-info`);
        pageInfo.innerHTML = `${this.currentPage} de ${totalPages} P&aacute;ginas | ${data.length} Registros`;
    }


    getSelection () {
        return this.selectedData !== null ? JSON.parse(this.selectedData) : null;
    }

    setButtonStyles(button) {
        button.style.border = '1px solid #F5F5F6';
        button.style.color = 'var(--primary-color)';
        button.style.backgroundColor = '#F5F5F6';
        button.style.borderRadius = '50%';
        button.style.width = '16px';
        button.style.height = '16px';
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
        button.style.cursor = 'pointer';
        button.style.marginLeft = '8px';
        button.style.marginRight = '4px';
    }
}
