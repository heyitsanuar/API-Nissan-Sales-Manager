let tabla;
let cb_agencias;
let cb_categorias;
let cb_modelos;
let cb_variantes;
let bt_agregar;

let tRow_Modelo;
let tRow_Categoria;
let tRow_Dimensiones;
let tRow_Rendimiento;
let tRow_Potencia;
let tRow_Torque;
let tRow_Transmision;
let tRow_Traccion;
let tRow_Precio;

let agencias = new Object();
let agenciaSeleccionada;
let categoriaSeleccionada;
let modeloSeleccionado;
let varianteSeleccionada;

let variantesComparadas = [];

$(() => {
    tabla = $("#tabla").hide();
    cb_agencias = $("#cb_agencias")
        .append($("<option>").val("nope").html("Seleccione una agencia"));
    cb_categorias = $("#cb_categorias").append($("<option>").val("nope").html("Seleccione una categoría")).attr("disabled", true);
    cb_modelos = $("#cb_modelos").append($("<option>").val("nope").html("Seleccione un modelo")).attr("disabled", true);
    cb_variantes = $("#cb_variantes").append($("<option>").val("nope").html("Seleccione una variante")).attr("disabled", true);
    bt_agregar = $("#bt_agregar").attr("disabled", true);
    tRow_Modelo = $("#tRow_Modelo");
    tRow_Categoria = $("#tRow_Categoria");
    tRow_Dimensiones = $("#tRow_Dimensiones");
    tRow_Rendimiento = $("#tRow_Rendimiento");
    tRow_Potencia = $("#tRow_Potencias");
    tRow_Torque = $("#tRow_Torque");
    tRow_Transmision = $("#tRow_Transmisión");
    tRow_Traccion = $("#tRow_Tracción");
    tRow_Precio = $("#tRow_Precio");

    $.get("/comparerExt", (result) => {
        agregarAgencia("Nissan", result);
        // cb_agencias.val("Nissan");
    });

    $.get("http://andreaml.ddns.net/volkswagen/modelos/publico", (result) => {
        $.each(result, (index, modelo) => {
            modelo.categoria = "Generico";
        });
        agregarAgencia("Volkswagen", result);
    });

    cb_agencias.change(function() {
        if (cb_agencias.val() != "nope") {
            agenciaSeleccionada = agencias[cb_agencias.val()];
            cb_categorias.html("").append($("<option>").val("nope").html("Seleccione una categoría")).attr("disabled", false);
            cb_modelos.html("").append($("<option>").val("nope").html("Seleccione un modelo")).attr("disabled", true);
            cb_variantes.html("").append($("<option>").val("nope").html("Seleccione una variante")).attr("disabled", true);
            bt_agregar.attr("disabled", true);

            let categorias = [];
            $.each(agenciaSeleccionada, (index, modelo) => {
                if (!categorias.includes(modelo.categoria)) {
                    categorias.push(modelo.categoria);
                    cb_categorias.append($("<option>").val(modelo.categoria).html(modelo.categoria));
                }
            });
        }
    });

    cb_categorias.change(function() {
        if (cb_categorias.val() != "nope") {
            categoriaSeleccionada = cb_categorias.val();
            cb_variantes.html("").append($("<option>").val("nope").html("Seleccione una variante")).attr("disabled", true);
            cb_modelos.html("").append($("<option>").val("nope").html("Seleccione un modelo")).attr("disabled", false);
            bt_agregar.attr("disabled", true);

            let modelosPorCategoria = agenciaSeleccionada.filter( modelo => modelo.categoria == categoriaSeleccionada);

            $.each(modelosPorCategoria, (index, modelo) => {
                cb_modelos.append($("<option>").val(modelo.modelo).html(modelo.modelo));
            });
        }
    });

    cb_modelos.change(function() {
        if (cb_modelos.val() != "nope") {
            modeloSeleccionado = agenciaSeleccionada.filter(modelo => modelo.modelo == cb_modelos.val())[0];
            cb_variantes.html("").append($("<option>").val("nope").html("Seleccione una variante")).attr("disabled", false);
            bt_agregar.attr("disabled", true);

            $.each(modeloSeleccionado.variantes, (index, variante) => {
                cb_variantes.append($("<option>").val(variante.variante).html(variante.variante));
            });
        }
    });

    cb_variantes.change(function() {
        if (cb_variantes.val() != "nope") {
            varianteSeleccionada = modeloSeleccionado.variantes.filter(variante => variante.variante == cb_variantes.val())[0];
            bt_agregar.attr("disabled", false);
        }   
    });

    bt_agregar.click(function() {
        if (variantesComparadas.includes(varianteSeleccionada)) {
            return;
        }

        let cellModelo = $("<td>").addClass("table__td_comparer");
        let cellCategoria = $("<td>").addClass("table__td_comparer");
        let cellDimensiones = $("<td>").addClass("table__td_comparer");
        let cellRendimiento = $("<td>").addClass("table__td_comparer");
        let cellPotencia = $("<td>").addClass("table__td_comparer");
        let cellTorque = $("<td>").addClass("table__td_comparer");
        let cellTransmision = $("<td>").addClass("table__td_comparer");
        let cellTraccion = $("<td>").addClass("table__td_comparer");
        let cellPrecio = $("<td>").addClass("table__td_comparer");

        cellModelo
            .append($("<span>").html(modeloSeleccionado.modelo).css("display", "block"))
            .append($("<span>").html(varianteSeleccionada.variante).css("display", "block"));

        cellCategoria.html(modeloSeleccionado.categoria);

        if (modeloSeleccionado.dimensiones != undefined) {
            cellDimensiones.html(modeloSeleccionado.dimensiones.alto + "x" +
                                    modeloSeleccionado.dimensiones.largo + "x" +
                                    modeloSeleccionado.dimensiones.ancho);
        } else {
            cellDimensiones.html("No Disponible");
        }

        if (varianteSeleccionada.caracteristicas.rendimiento != undefined)
            cellRendimiento.html(varianteSeleccionada.caracteristicas.rendimiento + " Km/L");
        else 
        cellRendimiento.html("No Disponible");

        if (varianteSeleccionada.caracteristicas.potencia != undefined) {
            cellPotencia.html(varianteSeleccionada.caracteristicas.potencia + " HP");
        } else {
            cellPotencia.html("No Disponible");
        }

        if (varianteSeleccionada.caracteristicas.torque != undefined) {
            cellTorque.html(varianteSeleccionada.caracteristicas.torque + " lb/ft");
        } else {
            cellTorque.html("No Disponible");
        }

        if (varianteSeleccionada.caracteristicas.transmision != undefined) {
            cellTransmision.html(varianteSeleccionada.caracteristicas.transmision);
        } else {
            cellTransmision.html("No disponible");
        }

        if (varianteSeleccionada.caracteristicas.traccion != undefined) {
            cellTraccion.html(varianteSeleccionada.caracteristicas.traccion);
        } else {
            cellTraccion.html("No disponible");
        }

        if (varianteSeleccionada.precio) {
            cellPrecio.html("$" + varianteSeleccionada.precio);
        } else {
            cellPrecio.html("No Disponible");
        }

        cellModelo.append($("<button>").html("Quitar").click(function() {
            cellModelo.remove();
            cellCategoria.remove();
            cellDimensiones.remove();
            cellRendimiento.remove();
            cellPotencia.remove();
            cellTorque.remove();
            cellTransmision.remove();
            cellTraccion.remove();
            cellPrecio.remove();

            variantesComparadas.splice(variantesComparadas.indexOf(varianteSeleccionada), 1);
            if (variantesComparadas.length == 0) {
                tabla.hide();
            } else {
                tabla.css("width", (150 + (variantesComparadas.length * 180)) + "px")
            }
        }));
        
        tRow_Modelo.append(cellModelo);
        tRow_Categoria.append(cellCategoria);
        tRow_Dimensiones.append(cellDimensiones);
        tRow_Rendimiento.append(cellRendimiento);
        tRow_Potencia.append(cellPotencia);
        tRow_Torque.append(cellTorque);
        tRow_Transmision.append(cellTransmision);
        tRow_Traccion.append(cellTraccion);
        tRow_Precio.append(cellPrecio);

        tabla.show();
        tabla.css("width", (150 + ((variantesComparadas.length + 1) * 180)) + "px")
        variantesComparadas.push(varianteSeleccionada);
    });
});

function agregarAgencia(agencia, modelos) {
    agencias[agencia] = modelos;
    cb_agencias.append($("<option>").val(agencia).html(agencia));
}