"use strict";

var cardsClientsComponent = {
    calculateDaysLeft: function (startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const differenceInMilliseconds = end - start;
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
        return Math.floor(differenceInDays);
    },
    showContextMenu: function (event, contextMenuData, clickCallback, cardElement) {
        event.preventDefault();
        const menu = document.createElement("div");
        menu.className = "context-menu";

        // Crear elementos del menú según el JSON de contextMenuData
        contextMenuData.forEach((item) => {
            const menuItem = document.createElement("div");
            menuItem.textContent = item.label;

            // Asignar una función al hacer clic en una opción del menú
            menuItem.addEventListener("click", () => {
                clickCallback(item.action);
                menu.remove();
            });

            menu.appendChild(menuItem);
        });

        // Posicionar el menú en la posición del clic derecho
        menu.style.top = event.clientY + "px";
        menu.style.left = event.clientX + "px";

        // Agregar el menú al documento
        document.body.appendChild(menu);

        // Ocultar el menú al hacer clic en cualquier lugar fuera de él
        document.addEventListener("click", function hideContextMenu() {
            menu.remove();
            document.removeEventListener("click", hideContextMenu);
        });

        // Asignar el menú contextual al elemento de la tarjeta
        cardElement.dataset.contextMenu = "shown";
    },
    create: function (containerId, data, idField, contextMenuData = null, clickCallback = null) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        container.style.display = "flex";
        container.style.flexWrap = "wrap";
        container.style.gap = "20px";
        container.style.justifyContent = "center";
        container.style.alignItems = "flex-start";
        
        data.forEach((item) => {
            const card = document.createElement("div");
            card.className = "card-special";
            card.dataset.cardId = item[idField];
            card.classList.add(item.Estatus.replace(/\s+/g, '-'));

            let imagen = "";
            if (item.ImagenCliente.includes('base64'))
                imagen = item.ImagenCliente;
            else
                imagen = `data:image/png;base64,${item.ImagenCliente}`;

            const cardContent = `
            <div class="card-special-logo">
                <img src="${imagen}" alt="">
            </div>
            <div class="card-special-title">
                <p>${item.AbreviacionCliente}</p>
            </div>
            <div class="card-special-entity">
                <p></p>
            </div>
            <div class="card-special-type">
                <p>${item.NombreTipoConmutador}</p>
            </div>
            <div class="card-special-responsability">
                <p title="Responsable">&nbsp;${item.NombreCliente}</p>
            </div>
            <div class="card-start-date">
                <p title="Inicio de operaciones">${item.FechaIntegracion}</p>
            </div>
            <div class="card-end-date">
                <p title=""></p>
            </div>
            <div class="card-special-status">
                <p style="color: ${item.ColorEstatus}">${item.Estatus}</p>
            </div>
            <div class="card-special-description-bk" style="background-image: linear-gradient(to top, ${item.ColorEstatus}, #FFFFFF);"></div>`;
            
            card.innerHTML = cardContent;

            card.dataset.cardData = JSON.stringify(item);
            card.addEventListener("click", () => {
                // Ver como, pasarle el evento click
                const cardData = JSON.parse(card.dataset.cardData);
                console.log(cardData);
            });

            // Menú contextual
            if (contextMenuData !== null) {
                card.addEventListener("contextmenu", (e) => {
                    e.preventDefault();

                    const cardId = card.getAttribute("data-card-id");

                    // Eliminar el menú contextual existente si hay uno
                    const existingContextMenu = document.querySelector(".context-menu");
                    if (existingContextMenu) {
                        existingContextMenu.remove();
                    }

                    const clickedCardData = data.find((item) => item[idField] === cardId);

                    if (clickedCardData) {
                        const contextMenu = this.createContextMenu(contextMenuData, (action) => {
                            clickCallback(action, clickedCardData);
                        });
                        contextMenu.style.left = e.clientX + "px";
                        contextMenu.style.top = e.clientY + "px";
                        document.body.appendChild(contextMenu);

                        // Ocultar el menú al hacer clic fuera de él
                        const hideContextMenu = () => {
                            contextMenu.remove();
                            document.removeEventListener("click", hideContextMenu);
                        };

                        document.addEventListener("click", hideContextMenu);
                    }
                });
            }

            container.appendChild(card);
        });
    },
    createContextMenu: function (contextMenuData, clickCallback) {
        const menu = document.createElement("div");
        menu.className = "context-menu";

        contextMenuData.forEach((item) => {
            const menuItem = document.createElement("div");
            menuItem.innerHTML = item.label;

            menuItem.addEventListener("click", () => {
                clickCallback(item.action);
                menu.remove();
            });

            menu.appendChild(menuItem);
        });

        return menu;
    },
    getCards: function (containerId) {
        const container = document.getElementById(containerId);
        const cardElements = container.querySelectorAll('.card-special');
        const cards = [];

        cardElements.forEach((cardElement) => {
            const cardData = JSON.parse(cardElement.dataset.cardData);
            cards.push(cardData);
        });

        return cards;
    },
};
