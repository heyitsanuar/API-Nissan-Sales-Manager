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
    cb_agencias = $("#cb_agencias").attr("title", "Cargando Agencias");
    cb_categorias = $("#cb_categorias").attr({disabled: true, title: "Seleccione una categoría", "data-style": "btn-light"}).selectpicker("refresh");
    cb_modelos = $("#cb_modelos").attr({disabled: true, title: "Seleccione un modelo", "data-style": "btn-light"}).selectpicker("refresh");
    cb_variantes = $("#cb_variantes").attr({disabled: true, title: "Seleccione una variante", "data-style": "btn-light"}).selectpicker("refresh");
    bt_agregar = $("#bt_agregar").attr("disabled", true)
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
        agencias["Nissan"] = result;
        cb_agencias.prepend($("<option>").val("Nissan").html("Nissan")).selectpicker("refresh");
        cb_agencias.val("Nissan").trigger("change");
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
            cb_agencias
            .selectpicker('setStyle', 'btn-danger')
            .selectpicker('setStyle', 'btn-secondary', "remove")
            .selectpicker('setStyle', 'btn-light', "remove");
            cb_categorias.html("").attr({disabled: false});
            cb_modelos.html("").attr({disabled: true}).selectpicker("refresh")
            .selectpicker('setStyle', 'btn-danger', "remove")
            .selectpicker('setStyle', 'btn-secondary', "remove")
            .selectpicker('setStyle', 'btn-light');
            cb_variantes.html("").attr({disabled: true}).selectpicker("refresh")
            .selectpicker('setStyle', 'btn-danger', "remove")
            .selectpicker('setStyle', 'btn-secondary', "remove")
            .selectpicker('setStyle', 'btn-light');
            bt_agregar.attr("disabled", true).switchClass("btn-secondary", "btn-light", 200, "swing");

            let categorias = [];
            $.each(agenciaSeleccionada, (index, modelo) => {
                if (!categorias.includes(modelo.categoria)) {
                    categorias.push(modelo.categoria);
                    cb_categorias.append($("<option>").val(modelo.categoria).html(modelo.categoria));
                }
            });
            cb_categorias.selectpicker("refresh")
            .selectpicker('setStyle', 'btn-danger', "remove")
            .selectpicker('setStyle', 'btn-secondary')
            .selectpicker('setStyle', 'btn-light', "remove");
        }
    });

    cb_categorias.change(function() {
        if (cb_categorias.val() != "nope") {
            categoriaSeleccionada = cb_categorias.val();
            cb_agencias
            .selectpicker('setStyle', 'btn-danger')
            .selectpicker('setStyle', 'btn-secondary', "remove")
            .selectpicker('setStyle', 'btn-light', "remove");
            cb_categorias
            .selectpicker('setStyle', 'btn-danger')
            .selectpicker('setStyle', 'btn-secondary', "remove")
            .selectpicker('setStyle', 'btn-light', "remove");
            cb_modelos.html("").attr({disabled: false});
            cb_variantes.html("").attr({disabled: true}).selectpicker("refresh")
            .selectpicker('setStyle', 'btn-danger', "remove")
            .selectpicker('setStyle', 'btn-secondary', "remove")
            .selectpicker('setStyle', 'btn-light');
            bt_agregar.attr("disabled", true).switchClass("btn-secondary", "btn-light", 200, "swing");

            let modelosPorCategoria = agenciaSeleccionada.filter( modelo => modelo.categoria == categoriaSeleccionada && modelo.variantes.length > 0);

            $.each(modelosPorCategoria, (index, modelo) => {
                cb_modelos.append($("<option>").val(modelo.modelo).html(modelo.modelo));
            });
            cb_modelos.selectpicker("refresh")
            .selectpicker('setStyle', 'btn-danger', "remove")
            .selectpicker('setStyle', 'btn-secondary')
            .selectpicker('setStyle', 'btn-light', "remove");
        }
    });

    cb_modelos.change(function() {
        if (cb_modelos.val() != "nope") {
            modeloSeleccionado = agenciaSeleccionada.filter(modelo => modelo.modelo == cb_modelos.val())[0];
            cb_agencias
            .selectpicker('setStyle', 'btn-danger')
            .selectpicker('setStyle', 'btn-secondary', "remove")
            .selectpicker('setStyle', 'btn-light', "remove");
            cb_categorias
            .selectpicker('setStyle', 'btn-danger')
            .selectpicker('setStyle', 'btn-secondary', "remove")
            .selectpicker('setStyle', 'btn-light', "remove");
            cb_modelos
            .selectpicker('setStyle', 'btn-danger')
            .selectpicker('setStyle', 'btn-secondary', "remove")
            .selectpicker('setStyle', 'btn-light', "remove");
            cb_variantes.html("").attr({disabled: false})
            bt_agregar.attr("disabled", true).switchClass("btn-secondary", "btn-light", 200, "swing");

            $.each(modeloSeleccionado.variantes, (index, variante) => {
                cb_variantes.append($("<option>").val(variante.variante).html(variante.variante));
            });
            cb_variantes.selectpicker("refresh")
            .selectpicker('setStyle', 'btn-danger', "remove")
            .selectpicker('setStyle', 'btn-secondary')
            .selectpicker('setStyle', 'btn-light', "remove");
        }
    });

    cb_variantes.change(function() {
        if (cb_variantes.val() != "nope") {
            varianteSeleccionada = modeloSeleccionado.variantes.filter(variante => variante.variante == cb_variantes.val())[0];
            cb_agencias
            .selectpicker('setStyle', 'btn-danger')
            .selectpicker('setStyle', 'btn-secondary', "remove")
            .selectpicker('setStyle', 'btn-light', "remove");
            cb_categorias
            .selectpicker('setStyle', 'btn-danger')
            .selectpicker('setStyle', 'btn-secondary', "remove")
            .selectpicker('setStyle', 'btn-light', "remove");
            cb_modelos
            .selectpicker('setStyle', 'btn-danger')
            .selectpicker('setStyle', 'btn-secondary', "remove")
            .selectpicker('setStyle', 'btn-light', "remove");
            cb_variantes
            .selectpicker('setStyle', 'btn-danger')
            .selectpicker('setStyle', 'btn-secondary', "remove")
            .selectpicker('setStyle', 'btn-light', "remove");
            bt_agregar.attr("disabled", false).switchClass("btn-light", "btn-secondary", 200, "swing");
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

        let bt_quitar = $("<a>").attr("href", "#").css("margin-left", "10px").addClass("badge").addClass("badge-danger");
        cellModelo.append($("<div>").css("display", "inline-block")
        .append($("<div>")
            .append($("<span>").html(modeloSeleccionado.modelo).css("display", "inline"))
            .append(bt_quitar)
        )
        .append($("<span>").html(varianteSeleccionada.variante).css("display", "block")));

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

        bt_quitar.html("&times;").click(function(e) {
            e.preventDefault();
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
            }
        });
        
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
        variantesComparadas.push(varianteSeleccionada);
    });
});

function agregarAgencia(agencia, modelos) {
    agencias[agencia] = modelos;
    cb_agencias.append($("<option>").val(agencia).html(agencia)).selectpicker("refresh");
}