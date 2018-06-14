$(document).ready(function(){

    refreshStock();

    function showModels(models){
        var result = "";
    
        $.each(models, function(index, model){
            result += "<tr class='table__row-td'>";
            result += "<tr class='table__row-td'>";
            result += "<td class='table__td'>" + model.modelo + "</td>";
            result += "<td class='table__td'>" + model.anio + "</td>";
            result += "<td class='table__td'>" + model.serieNumber + "</td>";
            result += "<td class='table__td'>" + model.categoria + "</td>";
            result += "</tr>";
        });
    
        $("#table-models").html(result);
    }
    
    function refreshStock(){

        var URL = "/vehicles/agency";
        
        $.ajax({
            url: URL,
            method: "GET",
            dataType: "json",
            success: showModels
        });

    }

});