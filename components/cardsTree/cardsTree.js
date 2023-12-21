"use strict";

var cardsTreeComponent = {
    activeContextMenu: null,
    create: function (containerId, data, contextMenuData = null, clickCallback = null) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        const entidades = cardsTreeComponent.arrayToTree(data);
        const htmlElements = cardsTreeComponent.generarHtml(entidades);
        
        if (contextMenuData) {
            container.addEventListener("contextmenu", (event) => {
                
            });
        }

        container.innerHTML = htmlElements;

        let regex = /id="([^"]*)"/g;
        let match;
        let ids = [];

        while ((match = regex.exec(htmlElements)) !== null) {
            ids.push(match[1]);
        }

        ids.forEach(function (idButton) {
            const elementButtonClick = document.getElementById(idButton);
            
            elementButtonClick.childNodes[1].addEventListener('contextmenu', function (e) {
                e.preventDefault();

                // Cierra el men� contextual activo si existe
                if (cardsTreeComponent.activeContextMenu) {
                    cardsTreeComponent.activeContextMenu.remove();
                    cardsTreeComponent.activeContextMenu = null;
                }

                const contextMenu = cardsTreeComponent.createContextMenu(contextMenuData, clickCallback, idButton);
                contextMenu.style.left = `${e.pageX}px`;
                contextMenu.style.top = `${e.pageY}px`;
                document.body.appendChild(contextMenu);

                // Establece el nuevo men� contextual activo
                cardsTreeComponent.activeContextMenu = contextMenu;

            })
        })
    },
    createContextMenu: function (contextMenuData, clickCallback, idButton) {
        const menu = document.createElement("div");
        menu.className = "context-menu";

        contextMenuData.forEach((item) => {
            const menuItem = document.createElement("div");
            menuItem.innerHTML = item.label;
            menuItem.addEventListener("click", () => {
                clickCallback(item.action, idButton);
                menu.remove();
            });
            menu.appendChild(menuItem);
        });

        return menu;
    },
    arrayToTree: (array) => {
        const map = new Map();
        array.forEach((item) => {
            map.set(item.UuidEntidad, { ...item, children: [] });
        });

        const tree = [];
        array.forEach((item) => {
            const parent = map.get(item.UuidEntidadPadre);
            if (parent) {
                parent.children.push(map.get(item.UuidEntidad));
            } else {
                tree.push(map.get(item.UuidEntidad));
            }
        });

        return tree;
    },
    generarHtml: (items) => {
        let html = '<ul>';
        const ids = [];
        items.forEach((item, index) => {
            const elementCronograma = `<li id="${item.Id}" title="${item.NombreTipoEntidad}">
                <a href="#">${item.NombreEntidad}</a>`;
            html += elementCronograma;

            if (item.children && item.children.length > 0) {
                html += cardsTreeComponent.generarHtml(item.children);
            }
            html += '</li>';
            ids.push(`${item.NombreTipoEntidad}-${item.NombreEntidad}-${index}`);
        });
        html += '</ul>';
        const newObject = {
            htmlElements: html,
            idsElements: ids
        };
        return html;
    }
};