$(document).ready(function(){

    refreshStocks();
    fillSelectStates();

    $("#add-stock-submit").on('click', addStock);
    $("#form-stock-state").on('change', fillSelectCities);
    $("#form-stock-city").on('change', fillSelectAgencies);

    function showStocks(stocks){
        var result = "";

        console.log(stocks);
        
        $.each(stocks, function(index, stock){
            result += "<tr class='table__row-td'>";
            result += "<td class='table__td'>" + stock.agency.name + "</td>";
            result += "<td class='table__td'>" + stock.category + "</td>";
            result += "<td class='table__td'>" + stock.meta.created_at + "</td>";
            result += "</tr>";
        });
    
        $("#table-stock").html(result);
    }
    
    function refreshStocks(){

        var URL = "/stock";
        
        $.ajax({
            url: URL,
            method: "GET",
            dataType: "json",
            success: showStocks
        });

    }

    function addStock(){
        
        var stockForm = $("#add-stock-form"),
            url = "/stock",
            data = {};

        var category = $("#form-category").val();

        if(category != "All"){
            url += "/" + category;
        }else{
            url += "/" + "all";
        }
        
        stockForm.find('[name]').each(function(index, value){
            var name  = $(this).attr('name'),
                value = $(this).val();

            data[name] = value;
        });
        
        $.ajax({
            url: url,
            method: "POST",
            data: data,
            success: refreshStocks
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