"use strict";
// =======================================================
// JALberto-Coder | Se crea una tabla con estilos de bootrap
// =======================================================
const objGrid = {
	Construir: function (idGrid, columnas, titulo = "", filasPorPagina = 15, altura = "", color = "#330073") {
		try {
			// Verificar que los argumentos sean válidos
			if (!idGrid || !Array.isArray(columnas) || columnas.length === 0) {
				throw new Error("Los argumentos son inválidos");
			}
			// Crear la tabla
			const grid = document.getElementById(idGrid);
			grid.classList.add("rounded", "bg-white");
			grid.style.width = "100%";
			grid.style.borderRadius = "5px";
			grid.innerHTML = `<div id="${idGrid}-contenedor"></div>`;

			const gridContainer = document.getElementById(`${idGrid}-contenedor`);
			gridContainer.style.display = "block";
			gridContainer.style.width = "100%";
			gridContainer.style.overflowX = "auto";
			gridContainer.innerHTML = `<div id="${idGrid}-contenedor-table"></div>`;

			const tableContainer = document.getElementById(`${idGrid}-contenedor-table`);
			gridContainer.classList.add("table-responsive");
			gridContainer.style.borderCollapse = "separate";
			gridContainer.style.width = "100%";
			
			if (titulo.length > 0) {
				tableContainer.innerHTML = `<h4 style="margin:5px;">${titulo}</h4>`;
			}
			
			const table = document.createElement("table");
			table.id = `tbl${idGrid}`;
			table.classList.add("table-hover", "table-ecore");
			table.style.width = "100%";
			gridContainer.append(table);

			const tableHead = document.createElement("thead");
			const headRow = document.createElement("tr");
			tableHead.append(headRow);

			const tamanio = columnas.length;
			const columnCount = columnas;
			columnCount.forEach(function (columna) {
				const tamanioAncho = parseFloat(Math.round((100 / tamanio) * Math.pow(10, 2)) / Math.pow(10, 2));
				const ancho = (columna.width === undefined) || columna.width === null || columna.width === "" ? tamanioAncho + "%" : columna.width;

				const elementColum = document.createElement("td");
				elementColum.id = `row${columna.field}`;
				elementColum.scope = "col";
				elementColum.classList.add("font-weight-bold", "text-white", "h5", `text-${columna.align}`);
				elementColum.style.backgroundColor = color;
				elementColum.style.width = ancho;
				elementColum.innerText = columna.title;

				headRow.append(elementColum);
			});

			tableHead.append(headRow);
			table.append(tableHead);

			const tableBody = document.createElement("tbody");
			tableBody.id = `tbl${idGrid}-body`;
			tableBody.style.height = altura.length === 0 ? "100%" : altura;
			table.append(tableBody);

			const tableFooter = document.createElement("tfoot");
			const rowFooter = document.createElement("tr");
			tableFooter.append(rowFooter);
			table.append(tableFooter);

			const columnFooter = document.createElement("td");
			columnFooter.classList.add("td-color-morado", "td-footer", "h5");
			columnFooter.colspan = tamanio;
			rowFooter.append(columnFooter);

			const smallPaginacion = document.createElement("small");
			smallPaginacion.id = `tbl${idGrid}-paginacion`;
			smallPaginacion.style.width = "50%";
			smallPaginacion.classList.add("text-left");
			columnFooter.append(smallPaginacion);

			const aLink = document.createElement("a");
			aLink.href = "#";
			aLink.classList.add("a-lectura", "table-paginacion");
			aLink.innerText = "1";
			smallPaginacion.append(aLink);

			const smallPaginas = document.createElement("small");
			smallPaginas.style.width = "50%";
			smallPaginas.id = `tbl${idGrid}-paginas`;
			smallPaginas.innerText = "0 registros.";
			smallPaginas.classList.add("text-right", "pull-right");
			columnFooter.append(smallPaginas);
		} catch (e) {
			console.error(e);
		}
	},
	Agregar: function (idGrid, columnas, objRow) {
		try {
			const tablaBody = document.getElementById(`tbl${idGrid}-body`);

			const tamanio = columnas.length;
			let filaHTML = '<tr id="${objGrid.GuidV4Generar()}" style="height: 18px; border-left: 1px solid #ccc; cursor: pointer;">';

			for (let i = 0; i < tamanio; i++) {
				const tamanioAncho = parseFloat(Math.round((100 / tamanio) * Math.pow(10, 2)) / Math.pow(10, 2));
				const ancho = !objGrid.Utilerias.EsIndefinidoONulo(columnas[i].width) || columnas[i].width !== "" ? `${tamanioAncho}%` : columnas[i].width;
				const valor = objGrid.Utilerias.EsIndefinidoONulo(objRow[columnas[i].field]) ? objRow[columnas[i].field] : "";
				filaHTML += `<td scope="col" class="h5" width="${ancho}">${valor}</td>`;
			}

			filaHTML += '</tr>';
			tablaBody.insertAdjacentHTML('beforeend', filaHTML);

			$(`#tbl${idGrid}-body tr`).unbind().click(function (e) {
				$(`#${e.currentTarget.parentElement.id} tr`).removeClass("table-active");

				if (!$(`#${e.currentTarget.id}`).hasClass("table-active")) {
					$(`#${e.currentTarget.id}`).addClass("table-active");
				}
			});
		} catch (e) {
			console.error(e);
		}
	},
	Eliminar: function (idGrid) {
		try {
			const registrosSeleccionados = document.querySelectorAll(`${idGrid} tr.table-active`);

			if (registrosSeleccionados.length < 1) {
				const table = document.querySelector(idGrid);
				table.classList.add("seleccion-requerida");
				return;
			}

			const registroSeleccionado = document.getElementById(registrosSeleccionados[0].id);
			registroSeleccionado.remove();
		} catch (e) {
			console.error(e);
		}
	},
	Utilerias: {
		GuidV4Generar: function () {
			const timestamp = new Date().getTime();
			const [performanceNow = 0] = performance ? [performance.now() * 1000] : [];
			const UUID_PATTERN = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

			return UUID_PATTERN.replace(/[xy]/g, function (c) {
				const r = Math.random() * 16;
				const randomNumber = (timestamp > 0)
					? (timestamp + r) % 16 | 0
					: (performanceNow + r) % 16 | 0;
				const uuidDigit = (c === 'x') ? randomNumber : (randomNumber & 0x3 | 0x8);
				return uuidDigit.toString(16);
			});
		},
		EsIndefinidoONulo: function (valor) {
			return valor !== null && valor !== undefined;
		}
	}
};