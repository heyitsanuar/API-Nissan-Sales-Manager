$(document).ready(function(){

    refreshStock();
    $("#filter-location").on('change', refreshStockWithValue);
    $("#filter-model").on('change', fillVersionSelect);
    $("#filter-version").on('change', refreshStockByVersion);

    function showStock(vehicles){
        var result = "";

        var stockLevel = $("#filter-location").val();
        
        if(stockLevel == "Global"){
            $.each(vehicles, function(index, vehicle){
                result += "<tr class='table__row-td'>";
                result += "<td class='table__td'>" + vehicle.model.name + " " + vehicle.model.version + "</td>";
                result += "<td class='table__td'>" + vehicle.serieNumber + "</td>";
                result += "<td class='table__td'>" + vehicle.status + "</td>";
                result += "<td class='table__td'>" + vehicle.agency.name + "</td>";
                result += "<td class='table__td'><a class='table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.edit-vehicle'>Pedir envío</a></td>";
                result += "</tr>";
            });
        }else{
            $.each(vehicles, function(index, vehicle){
                result += "<tr class='table__row-td'>";
                result += "<td class='table__td'>" + vehicle.model.name + "</td>";
                result += "<td class='table__td'>" + vehicle.serieNumber + "</td>";
                result += "<td class='table__td'>" + vehicle.model.status + "</td>";
                result += "<td class='table__td'><a class='table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.edit-vehicle'>Vender</a></td>";
                result += "</tr>";
            });
        }
    
        $("#table-vehicles").html(result);
    }
    
    function refreshStock(){

        var URL = "/vehicles/agency/salesman";
        
        $.ajax({
            url: URL,
            method: "GET",
            dataType: "json",
            success: showStock
        });

    }

    function refreshStockWithValue(){

        var stockLevel = $(this).val();

        if(stockLevel == "Global"){
            var URL = "/vehicles";
        }else{
            var URL = "/vehicles/agency/salesman";
        }
        
        $.ajax({
            url: URL,
            method: "GET",
            dataType: "json",
            success: function(data){
                if(stockLevel == "Global"){
                    $("#table-criteria").append("<th class='table__th agency'>Agency <span class=''></span></th>");
                }else{
                    $("#table-criteria").children(".agency").remove();
                }
                
                showStock(data);
                fillModelSelect();
            }
        });
    }

    function refreshStockByModel(){
        var stockLevel = $("#filter-location").val();
        var model = $("#filter-model").val();

        if(stockLevel == "Global"){
            var URL = "/vehicles/models/global";
        }else{
            var URL = "/vehicles/models/local";
        }
        
        var carInfo = {
            name: model
        };

        console.log(carInfo);

        $.ajax({
            url: URL,
            method: "POST",
            data: carInfo,
            dataType: "text",
            success: function(vehicles){
                var result = "";

                var stockLevel = $("#filter-location").val();
                
                if(stockLevel == "Global"){
                    $.each(vehicles, function(index, vehicle){
                        result += "<tr class='table__row-td'>";
                        result += "<td class='table__td'>" + vehicle.model.name + " " + vehicle.model.version + "</td>";
                        result += "<td class='table__td'>" + vehicle.serieNumber + "</td>";
                        result += "<td class='table__td'>" + vehicle.status + "</td>";
                        result += "<td class='table__td'>" + vehicle.agency.name + "</td>";
                        result += "<td class='table__td'><a class='table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.edit-vehicle'>Pedir envío</a></td>";
                        result += "</tr>";
                    });
                }else{
                    $.each(vehicles, function(index, vehicle){
                        result += "<tr class='table__row-td'>";
                        result += "<td class='table__td'>" + vehicle.model.name + "</td>";
                        result += "<td class='table__td'>" + vehicle.serieNumber + "</td>";
                        result += "<td class='table__td'>" + vehicle.model.status + "</td>";
                        result += "<td class='table__td'><a class='table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.edit-vehicle'>Vender</a></td>";
                        result += "</tr>";
                    });
                }
                
                console.log(result);
                $("#table-vehicles").html(result);
            }
        });
    }

    function refreshStockByVersion(){
        var stockLevel = $("#filter-location").val();
        var model = $("#filter-model").val();
        var version =$("#filter-version").val();

        if(stockLevel == "Global"){
            var URL = "/vehicles/models/version/global";
        }else{
            var URL = "/vehicles/models/version/local";
        }

        var carInfo = {
            name: model,
            version: version
        };

        console.log(carInfo);
        
        $.ajax({
            url: URL,
            method: "POST",
            data: carInfo,
            dataType: "text",
            success: function(data){
                if(stockLevel == "Global"){
                    $("#table-criteria").append("<th class='table__th agency'>Agency <span class=''></span></th>");
                }else{
                    $("#table-criteria").children(".agency").remove();
                }
                
                showStock(data);
            }
        });
    }

    function fillModelSelect(){
        var stockLevel = $("#filter-location").val();

        if(stockLevel == "Global"){
            var URL = "/vehicles";
        }else{
            var URL = "/vehicles/agency/salesman";
        }
        
        $.ajax({
            url: URL,
            method: "GET",
            dataType: "json",
            success: function(foundModels){
                var models = [];

                console.log("Hey");

                foundModels.forEach(function(currentModel){
                    models.push(currentModel.model.name);
                });
                
                console.log(models);
                models = models.filter(function(element, position) {
                    return models.indexOf(element) == position;
                });

                console.log(models);
    
                //models = JSON.stringify(models);
                
                var result = "";

                $.each(models, function(index, location){
                    result += "<option value='" + location + "'>" + location + "</option>";
                });

                if(models.length == 0){
                    result += "<option value='none'>Not Available</option>";
                }
                
                $("#filter-model").html(result);

                refreshStockByModel();
            }
        });
    }

    function fillVersionSelect(){
        var stockLevel = $("#filter-location").val();

        if(stockLevel == "Global"){
            var URL = "/vehicles";
        }else{
            var URL = "/vehicles/agency/salesman";
        }
        
        $.ajax({
            url: URL,
            method: "GET",
            dataType: "json",
            success: function(foundModels){
                var versions = [];

                foundModels.forEach(function(currentModel){
                    versions.push(currentModel.model.version);
                });
                
                versions = versions.filter(function(element, position) {
                    return versions.indexOf(element) == position;
                });
    
                //versions = JSON.stringify(versions);
                
                var result = "";

                $.each(versions, function(index, location){
                    result += "<option value='" + location + "'>" + location + "</option>";
                });

                if(versions.length == 0){
                    result += "<option value='none'>Not Available</option>";
                    $("#filter-version").html(result);
                }

                $("#filter-version").html(result);
                refreshStockByModel();
            }
        });
    }
    

});