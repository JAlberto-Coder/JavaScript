"use strict"

var listComponent = {
    toggleSelection: function (item, multiselect) {
        const itemData = JSON.parse(item.dataset.item);
        if (!multiselect) {
            const selectedItems = document.querySelectorAll(".custom-list .selected");
            selectedItems.forEach(selectedItem => selectedItem.classList.remove("selected"));
        }

        item.classList.toggle("selected");
    },
    create: function (containerId, data, idField, displayField, multiselect) {
        const container = document.getElementById(containerId);
        container.style.border = "1px solid #CCCCCC";
        container.style.borderRadius = "4px";
        const ul = document.createElement("ul");
        ul.className = "custom-list";

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        const containerHeight = container.style.minHeight || '180px';
        ul.style.height = containerHeight;

        data.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item[displayField];
            li.dataset.id = item[idField];
            li.dataset.item = JSON.stringify(item);
            li.addEventListener("click", () => this.toggleSelection(li, multiselect));
            ul.appendChild(li);
        });

        container.appendChild(ul);
    },
    addItem: function (containerId, item, idField, displayField, multiselect) {
        const container = document.getElementById(containerId);

        if (!container) {
            console.error(`Container with ID '${containerId}' not found.`);
            return;
        }

        const ul = container.querySelector("ul.custom-list");

        if (!ul) {
            console.error("Custom list not found within the container.");
            return;
        }

        const li = document.createElement("li");
        li.textContent = item[displayField];
        li.dataset.id = item[idField];
        li.dataset.item = JSON.stringify(item);
        li.addEventListener("click", () => this.toggleSelection(li, multiselect));
        ul.appendChild(li);
    },
    getItems: function (containerId) {
        const container = document.getElementById(containerId);
        const selectedItems = container.querySelectorAll(".custom-list .selected");
        const selectedData = [];

        selectedItems.forEach(selectedItem => {
            const id = selectedItem.dataset.id;
            const text = selectedItem.textContent;
            selectedData.push(id);
        });

        return selectedData;
    },
    getItem: function (containerId, itemId) {
        const container = document.getElementById(containerId);

        if (!container) {
            console.error(`Container with ID '${containerId}' not found.`);
            return null; // Devuelve null si el contenedor no se encuentra
        }

        const item = container.querySelector(`li[data-id="${itemId}"]`);

        if (!item) {
            console.error(`Item with data-id '${itemId}' not found in container '${containerId}'.`);
            return null;
        }

        const itemData = JSON.parse(item.dataset.item);

        return itemData;
    },
    removeItem: function (containerId, itemId) {
        const container = document.getElementById(containerId);

        if (!container) {
            console.error(`Container with ID '${containerId}' not found.`);
            return;
        }

        const itemToRemove = container.querySelector(`.custom-list li[data-id="${itemId}"]`);

        if (itemToRemove) {
            itemToRemove.remove(); // Usa el método remove() para eliminar el elemento
        }
    }
};
