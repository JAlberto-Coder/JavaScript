"use strict";

var filtersComponent = {
    create: function (containerId, containerIdFilter, statuses, classComponent) {
        const filter = document.getElementById(containerId);
        const container = document.getElementById(containerIdFilter);
        filter.innerHTML = '';
        
        const { uniqueStatuses, statusCount } = this.getUniqueStatusesAndCount(statuses);

        uniqueStatuses.unshift('Todos');
        statusCount['Todos'] = statuses.length; // Agregar el total 'Todos'

        filter.classList.add('filter-labels');

        function createFilterOption(status, count, selected = false) {
            const option = document.createElement('div');
            option.classList.add('filter-label');

            const countElement = document.createElement('span');
            countElement.innerHTML = `&nbsp;${count}`;
            countElement.classList.add('filter-count');

            option.textContent = status;
            option.appendChild(countElement);

            if (selected) {
                option.classList.add('active');
            }

            return option;
        }

        uniqueStatuses.forEach((status) => {
            const cardCount = statusCount[status] || 0;
            const filterOption = createFilterOption(status, cardCount);

            filterOption.addEventListener('click', function () {
                Array.from(filter.getElementsByClassName('filter-label')).forEach((label) => {
                    label.classList.remove('active');
                });

                filterOption.classList.add('active');

                const filterValue = status.replace(/\s+/g, '-');
                const cards = container.getElementsByClassName(classComponent);

                if (filterValue !== 'Todos') {
                    Array.from(cards).forEach((card) => {
                        card.style.display = 'none';
                    });

                    const filteredCards = container.getElementsByClassName(filterValue);
                    Array.from(filteredCards).forEach((card) => {
                        card.style.display = 'block';
                    });
                } else {
                    Array.from(cards).forEach((card) => {
                        card.style.display = 'block';
                    });
                }
            });

            filter.appendChild(filterOption);
        });
    },
    getUniqueStatusesAndCount: function (statuses) {
        const uniqueStatuses = [...new Set(statuses)];
        const statusCount = {};

        statuses.forEach((status) => {
            if (statusCount[status]) {
                statusCount[status]++;
            } else {
                statusCount[status] = 1;
            }
        });

        return { uniqueStatuses, statusCount };
    }
};
