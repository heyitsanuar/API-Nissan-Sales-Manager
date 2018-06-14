
let cb_categorias;
let cb_modelos;
let cb_variantes;
let bt_agregar;

let tRow_Modelo;
let tRow_Categoria;
let tRow_Colores;
let tRow_Dimensiones;
let tRow_Rendimiento;
let tRow_Potencia;
let tRow_Torque;
let tRow_Transmision;
let tRow_Traccion;
let tRow_Precio;

let modelos;
let modeloSeleccionado;
let varianteSeleccionada;

let idsComparados = [];

$(() => {
    cb_categorias = $("#cb_categorias").append($("<option>").val("nope").html("Seleccione una categoría"));
    cb_modelos = $("#cb_modelos").append($("<option>").val("nope").html("Seleccione un modelo")).attr("disabled", true);
    cb_variantes = $("#cb_variantes").append($("<option>").val("nope").html("Seleccione una variante")).attr("disabled", true);
    bt_agregar = $("#bt_agregar").attr("disabled", true);
    tRow_Modelo = $("#tRow_Modelo");
    tRow_Categoria = $("#tRow_Categoria");
    tRow_Colores = $("#tRow_Colores");
    tRow_Dimensiones = $("#tRow_Dimensiones");
    tRow_Rendimiento = $("#tRow_Rendimiento");
    tRow_Potencia = $("#tRow_Potencias");
    tRow_Torque = $("#tRow_Torque");
    tRow_Transmision = $("#tRow_Transmisión");
    tRow_Traccion = $("#tRow_Tracción");
    tRow_Precio = $("#tRow_Precio");

    $.get("/cars", (result) => {
        modelos = result;
        
        let categorias = [];
        $.each(modelos, (index, modelo) => {
            if (!categorias.includes(modelo.categoria)) {
                categorias.push(modelo.categoria);
                cb_categorias.append($("<option>").val(modelo.categoria).html(modelo.categoria));
            }
        });

        cb_categorias.change(function(e) {
            if (cb_categorias.val() != "nope") {
                cb_variantes.html("").append($("<option>").val("nope").html("Seleccione una variante")).attr("disabled", true);
                cb_modelos.html("").append($("<option>").val("nope").html("Seleccione un modelo")).attr("disabled", false);
                bt_agregar.attr("disabled", true);

                let modelosPorCategoria = modelos.filter( modelo => modelo.categoria == cb_categorias.val());

                $.each(modelosPorCategoria, (index, modelo) => {
                    cb_modelos.append($("<option>").val(modelo._id).html(modelo.modelo));
                });
            }
        });

        cb_modelos.change(function(e) {
            if (cb_modelos.val() != null && cb_modelos.val() != "nope") {
                cb_variantes.html("").append($("<option>").val("nope").html("Seleccione una variante")).attr("disabled", false);
                bt_agregar.attr("disabled", true);
                modeloSeleccionado = modelos.filter( modelo => modelo._id == cb_modelos.val())[0];

                $.each(modeloSeleccionado.variantes, (index, variante) => {
                    cb_variantes.append($("<option>").val(variante._id).html(variante.variante));
                });
            }
        });

        cb_variantes.change(function(e) {
            if (cb_variantes.val() != null && cb_variantes.val() != "nope") {
                bt_agregar.attr("disabled", false);
                varianteSeleccionada = modeloSeleccionado.variantes.filter( variante => variante._id == cb_variantes.val())[0];
            }   
        });

        bt_agregar.click(function() {
            if (idsComparados.includes(varianteSeleccionada._id)) {
                return;
            }
            let idComparado = varianteSeleccionada._id;
            let cellModelo = $("<td>").attr("id", "modelo" + idComparado);
            let cellCategoria = $("<td>").attr("id", "categoria" + idComparado);
            let cellColores = $("<td>").attr("id", "colores" + idComparado);
            let cellDimensiones = $("<td>").attr("id", "dimensiones" + idComparado);
            let cellRendimiento = $("<td>").attr("id", "rendimiento" + idComparado);
            let cellPotencia = $("<td>").attr("id", "potencia" + idComparado);
            let cellTorque = $("<td>").attr("id", "torque" + idComparado);
            let cellTransmision = $("<td>").attr("id", "transmision" + idComparado);
            let cellTraccion = $("<td>").attr("id", "traccion" + idComparado);
            let cellPrecio = $("<td>").attr("id", "precio" + idComparado);

            cellModelo
                .append($("<span>").html(modeloSeleccionado.modelo).css("display", "block"))
                .append($("<span>").html(varianteSeleccionada.variante).css("display", "block"));
            cellCategoria.html(modeloSeleccionado.categoria);
            cellColores.html(modeloSeleccionado.colores.exterior[0].nombre);
            cellDimensiones.html(modeloSeleccionado.dimensiones.alto + "x" +
                                 modeloSeleccionado.dimensiones.largo + "x" +
                                 modeloSeleccionado.dimensiones.ancho);
            cellRendimiento.html(varianteSeleccionada.caracteristicas.rendimiento + " Km/L");
            cellPotencia.html(varianteSeleccionada.caracteristicas.potencia + " HP");
            cellTorque.html(varianteSeleccionada.caracteristicas.torque + " lb/ft");
            cellTransmision.html(varianteSeleccionada.caracteristicas.transmision);
            cellTraccion.html(varianteSeleccionada.caracteristicas.traccion);
            cellPrecio.html("$" + varianteSeleccionada.precio);

            cellModelo.append($("<button>").html("Quitar").click(function() {
                cellModelo.remove();
                cellCategoria.remove();
                cellColores.remove();
                cellDimensiones.remove();
                cellRendimiento.remove();
                cellPotencia.remove();
                cellTorque.remove();
                cellTransmision.remove();
                cellTraccion.remove();
                cellPrecio.remove();

                console.log(idsComparados.indexOf(idComparado));
                idsComparados.splice(idsComparados.indexOf(idComparado), 1);
                console.log(idsComparados);
            }));
            
            tRow_Modelo.append(cellModelo);
            tRow_Categoria.append(cellCategoria);
            tRow_Colores.append(cellColores);
            tRow_Dimensiones.append(cellDimensiones);
            tRow_Rendimiento.append(cellRendimiento);
            tRow_Potencia.append(cellPotencia);
            tRow_Torque.append(cellTorque);
            tRow_Transmision.append(cellTransmision);
            tRow_Traccion.append(cellTraccion);
            tRow_Precio.append(cellPrecio);

            idsComparados.push(idComparado);
        });
    });
});