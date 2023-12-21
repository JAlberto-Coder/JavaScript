"use strict"

var tabsComponent = {
    create: function (containerId, tabsConfig) {
        const container = document.getElementById(containerId);

        const tabsList = document.createElement('ul');
        tabsList.classList.add('tabs-list');

        let initialTab = null;

        tabsConfig.forEach((tabInfo) => {
            const tab = document.createElement('li');
            tab.textContent = tabInfo.label;
            tab.classList.add('tab');
            tab.dataset.tabId = tabInfo.id;

            const content = document.getElementById(tabInfo.content);
            content.classList.add(`${containerId}-tab-content`);
            content.style.display = 'none';

            tab.addEventListener('click', () => {
                const tabContents = document.querySelectorAll(`.${containerId}-tab-content`);
                tabContents.forEach((content) => {
                    content.style.display = 'none';
                });

                const selectedTabContent = document.getElementById(tabInfo.content);
                selectedTabContent.style.display = 'block';

                const tabs = document.querySelectorAll('.tab');
                tabs.forEach((t) => {
                    t.classList.remove('active');
                });
                tab.classList.add('active');
            });

            tabsList.appendChild(tab);

            if (tabInfo.start) {
                initialTab = tab;
            }
        });

        container.appendChild(tabsList);

        const lineBreak = document.createElement('br');
        container.appendChild(lineBreak);

        if (initialTab) {
            initialTab.click();
        }
    },
    get: function () {
        console.log("Hola");
    }
};
