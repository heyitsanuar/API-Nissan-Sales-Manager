
$(document).ready(function(){

    refreshStock();
    fillSelectStates();

    $("#add-stock-submit").on('click', addStock);
    $("#form-stock-state").on('change', fillSelectCities);
    $("#form-stock-city").on('change', fillSelectAgencies);

    function showModels(models){
        var result = "";
    
        $.each(models, function(index, model){
            result += "<tr class='table__row-td'>";
            result += "<tr class='table__row-td'>";
            result += "<td class='table__td'>" + model.modelo + "</td>";
            result += "<td class='table__td'>" + model.anio + "</td>";
            result += "<td class='table__td'>" + model.modelo + "</td>";
            result += "<td class='table__td'>" + model.categoria + "</td>";
            result += "<td class='table__controls'>";
            result += "<div class='table__dropdown dropdown dropleft'>";
            result +=  "<a class='table__dropdown-button' id='data1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>...</a>";
            result += "<div class='table__dropdown-menu dropdown-menu' aria-labelledby='data1'>";
            result += "<a class='edit-model_show table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.edit-model' data-id='" + model._id +"'>Edit</a>";
            result += "<a class='table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.delete-element'>Delete</a>";
            result += "</div>";
            result += "</div>";
            result += "</td>";
            result += "</tr>";
        });
    
        $("#table-models").html(result);
    }
    
    function refreshStock(){

        var URL = "/cars";
        
        $.ajax({
            url: URL,
            method: "GET",
            dataType: "json",
            success: showModels
        });

    }

    function addStock(){
        
        var modelForm = $("#add-model-form"),
            url = "/cars",
            data = {};
        
        modelForm.find('[name]').each(function(index, value){
            var name  = $(this).attr('name'),
                value = $(this).val();

            data[name] = value;
        });

        console.log(data);
        
        $.ajax({
            url: url,
            method: "POST",
            data: data,
            success: refreshModels
        });
    }

    function fillSelectStates(){
        fillLocationsSelect("/locations/states", "form-stock-state");
    }

    function fillSelectCities(){
        var state = $("#form-stock-state").val();
        var citiesURL = "/locations/cities/" + state;
        
        fillLocationsSelect(citiesURL, "form-stock-city");

        var clean = "<option value='none'>Select an agency</option>";
        $("#form-stock-agency").html(clean);
    }

    function fillSelectAgencies(){
        var state = $("#form-stock-state").val();
        var city = $("#form-stock-city").val();

        var agenciesURL = "/locations/" + state + "/" + city;
        
        fillLocationsSelect(agenciesURL, "form-stock-agency");
    }
    
    function fillLocationsSelect(url, id){            
        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            success: function(locations){
                var result = "";

                $.each(locations, function(index, location){
                    result += "<option value='" + location + "'>" + location + "</option>";
                });

                if(locations.length == 0){
                    result += "<option value='none'>Not Available</option>";
                    $("#"+id).html(result);
                }else{
                    $("#"+id).html(result);
                }
            }
        });
    }

});