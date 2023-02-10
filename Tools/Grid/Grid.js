// =======================================================
// JALberto-Coder | Se crea una tabla con estilos de bootrap
// =======================================================
var objGrid = {
	Construir: function (idGrid, columnas, titulo = "", filasPorPagina = 15, altura = "", color = "#330073") {
		try {
			var grid = document.getElementById(idGrid);
			grid.classList.add("rounded");
			grid.classList.add("bg-white");
			grid.style.width = "100%";
			grid.style.borderRadius = "5px";
			grid.innerHTML = "<div id='" + idGrid + "-contenedor'></div>";
	
			var contenedor = document.getElementById(idGrid + "-contenedor");
			contenedor.style.display = "block";
			contenedor.style.width = "100%";
			contenedor.style.overflowX = "auto";
			contenedor.innerHTML = "<div id='" + idGrid + "-contenedor-table'></div>";
	
			var contenedorTable = document.getElementById(idGrid + "-contenedor-table");
			contenedorTable.classList.add("table-responsive");
			contenedorTable.style.borderCollapse = "separate";
			contenedorTable.style.width = "100%";
	
			if (titulo.length > 0) {
				contenedorTable.innerHTML = "<h4 style='margin:5px;'>" + titulo + "</h4>";
			}
	
			var tabla = document.createElement("table");
			tabla.id = "tbl" + idGrid;
			tabla.classList.add("table-hover");
			tabla.classList.add("table-ecore");
			tabla.style.width = "100%";
			contenedorTable.append(tabla);
			var tablaEncabezado = document.createElement("thead");
			var filaEncabezado = document.createElement("tr");
			tablaEncabezado.append(filaEncabezado);
	
			var tamanio = columnas.length;
			for (var i = 0; i < tamanio; i++) {
				var tamanioAncho = parseFloat(Math.round((100 / tamanio) * Math.pow(10, 2)) / Math.pow(10, 2));
				var ancho = (columnas[i].width === undefined) || columnas[i].width === null || columnas[i].width === "" ? tamanioAncho + "%" : columnas[i].width;
				var columna = document.createElement("td");
				columna.id = "row" + columnas[i].field;
				columna.scope = "col";
				columna.classList.add("font-weight-bold");
				columna.classList.add("text-white");
				columna.classList.add("h5");
				columna.classList.add("text-" + columnas[i].align);
				columna.style.backgroundColor = color;
				columna.width = ancho;
				columna.innerText = columnas[i].title;
				filaEncabezado.append(columna);
			}
			tabla.append(tablaEncabezado);
	
			var tablaCuerpo = document.createElement("tbody");
			tablaCuerpo.id = "tbl" + idGrid + "-body";
			tablaCuerpo.style.height = altura.length === 0 ? "100%" : altura;
			tabla.append(tablaCuerpo);
	
			var tablaPie = document.createElement("tfoot");
			var filaPie = document.createElement("tr");
			tablaPie.append(filaPie);
			tabla.append(tablaPie);
	
			var columnaPie = document.createElement("td");
			columnaPie.classList.add("td-color-morado");
			columnaPie.classList.add("td-footer");
			columnaPie.classList.add("h5");
			columnaPie.colspan = tamanio;
	
			filaPie.append(columnaPie);
			var smallPaginacion = document.createElement("small");
			smallPaginacion.id = "tbl" + idGrid + "-paginacion";
			smallPaginacion.style.width = "50%";
			smallPaginacion.classList.add("text-left");
			columnaPie.append(smallPaginacion);
	
			var aLink = document.createElement("a");
			aLink.href = "#";
			aLink.classList.add("a-lectura");
			aLink.classList.add("table-paginacion");
			aLink.innerText = "1";
			smallPaginacion.append(aLink);
	
			var smallPaginas = document.createElement("small");
			smallPaginas.style.width = "50%";
			smallPaginas.id = "tbl" + idGrid + "-paginas";
			smallPaginas.innerText = "0 registros.";
			smallPaginas.classList.add("text-right");
			smallPaginas.classList.add("pull-right");
			columnaPie.append(smallPaginas);
		} catch(e) { 
			alert(e);
		}
	},
	Agregar: function (idGrid, columnas, titulo = "", filasPorPagina = 15, altura = "", color = "#330073") {
		try {
			var keys = Object.keys(objRow)
				, values = Object.values(objRow);

			var tablaBody = document.getElementById("tbl" + idGrid + "-body");

			var fila = document.createElement("tr");
			fila.id = objGrid.GuidGenera();
			fila.style.height = "18px";
			fila.style.borderLeft = "1px solid #ccc";
			fila.style.cursor = "pointer";
			tablaBody.append(fila);

			var color = "#330073";
			var tamanio = columnas.length;
			for (var i = 0; i < tamanio; i++) {
				var tamanioAncho = parseFloat(Math.round((100 / tamanio) * Math.pow(10, 2)) / Math.pow(10, 2));
				var ancho = !IsNotNullOrUndefined(columnas[i].width) || columnas[i].width === "" ? tamanioAncho + "%" : columnas[i].width;
				var valor = IsNotNullOrUndefined(objRow[columnas[i].field]) ? objRow[columnas[i].field] : "";

				var columna = document.createElement("td");
				columna.scope = "col";
				columna.classList.add("h5");
				columna.width = ancho;
				columna.innerText = valor;
				fila.append(columna);
			}
			$("#tbl" + idGrid + "-body tr").unbind();
			$("#tbl" + idGrid + "-body tr").click(function (e) {
				$("#" + e.currentTarget.parentElement.id + " tr").removeClass("table-active");

				if (!$("#" + e.currentTarget.id).hasClass("table-active"))
					$("#" + e.currentTarget.id).addClass("table-active");
			});
		} catch (e) {
			alert(e);
		}
	},
	Eliminar: function (idGrid) {
		try {
			var elementos = document.querySelectorAll(idGrid + " tr.table-active");

			if (elementos.length < 1) {
				alert("Debes de seleccionar un registro para poder realizar esta acción.");
				return;
			}
			var elemento = document.getElementById(elementos[0].id);
			elemento.remove();
		} catch (e) {
			console.log(e);
		}
	},
	Utilerias: {
		GuidGenera: function () {
			var d = new Date().getTime();
			var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = Math.random() * 16;
				if (d > 0) {
					r = (d + r) % 16 | 0;
					d = Math.floor(d / 16);
				} else {
					r = (d2 + r) % 16 | 0;
					d2 = Math.floor(d2 / 16);
				}
				return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
			});
		}
	}
};