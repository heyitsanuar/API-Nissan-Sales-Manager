$(document).ready(function(){

    refreshStock();

    function showModels(vehicles){
        var result = "";

        console.log(vehicles);
    
        $.each(vehicles, function(index, vehicle){
            result += "<tr class='table__row-td'>";
            result += "<tr class='table__row-td'>";
            result += "<td class='table__td'>" + vehicle.model.name + "</td>";
            result += "<td class='table__td'>" + vehicle.serieNumber + "</td>";
            result += "<td class='table__td'>" + vehicle.status + "</td>";
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