$(document).ready(function(){

    refreshAgencies();
    fillSelectStates();

    $("#agency-submit").on('click', addAgency);
    $("#filter-agency-state").on('change', fillSelectCities);
    $("#filter-agency-city").on('change', showAgenciesByCity);;

    $(".table__dropdown-item").click(fillAgencyFormForUpdate);

    function showAgencies(agencies){
        var result = "";
    
        $.each(agencies, function(index, agency){

            result += "<tr class='table__row-td'>";
            result += "<td class='table__td'>" + agency.name + "</td>";
            result += "<td class='table__td state'>" + agency.state + "</td>";
            result += "<td class='table__td city'>" + agency.city + "</td>";
            result += "<td class='table__td'>" + agency.cp + "</td>";
            result += "<td class='table__td'>" + agency.address + "</td>";
            result += "<td class='table__controls'>";
            result += "<div class='table__dropdown dropdown dropleft'>";
            result += "<a class='table__dropdown-button' id='data1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>...</a>";
            result += "<div class='table__dropdown-menu dropdown-menu' aria-labelledby='data1'>";
            result +=   "<a class='table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.branch-form' data-id='" + agency._id + "'>Edit</a>";
            result +=   "<a class='table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.delete-element'>Delete</a>";
            result += "</div>";
            result += "</div>";
            result += "</td>";
            result += "</tr>";

        });
    
        $("#table-agency").html(result);
    }

    function fillAgencyFormForUpdate(){
        var id = $(this).attr("data-id").val(),
            url = "/agency/" + id;
        
        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            success: function(agency){
                $("#form-agency_title").html("Edit branch");
                $("#form-agency_name").val(agency.name);
                $("#form-agency_state").val(agency.state);
                $("#form-agency_city").val(agency.city);
                $("#form-agency_cp").val(agency.cp);
                $("#form-agency_address").val(agency.address);
            }
        });

    }
    
    function refreshAgencies(){
        
        $.ajax({
            url: "/agency",
            method: "GET",
            dataType: "json",
            success: showAgencies
        });

    }

    function addAgency(){
        
        var userForm = $("#agency-form"),
            url = "/agency",
            data = {};
        
        userForm.find('[name]').each(function(index, value){
            var name  = $(this).attr('name'),
                value = $(this).val();

            data[name] = value;
        });
        
        $.ajax({
            url: url,
            method: "POST",
            data: data,
            success: refreshAgencies
        });
    }

    function updateAgency(){
        var userForm = $("#agency-form"),
            url = "/agency?_method=PUT",
            data = {};


        userForm.find('[name]').each(function(index, value){
            var name  = $(this).attr('name'),
                value = $(this).val();

            data[name] = value;
        });
        
        $.ajax({
            url: url,
            method: "POST",
            data: data,
            success: refreshAgencies
        });
        
    }

    function fillSelectStates(){
        fillLocationsSelect("/locations/states", "filter-agency-state");
    }

    function fillSelectCities(){
        var state = $("#filter-agency-state").val();
        var citiesURL = "/locations/cities/" + state;
        
        fillLocationsSelect(citiesURL, "filter-agency-city");
        showAgenciesByState();
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

    function showAgenciesByState(){
        var state = $("#filter-agency-state").val();
        var URL = "/locations/" + state + "/";

        $.ajax({
            url: URL,
            method: "GET",
            dataType: "json",
            success: showAgencies
        });
    }

    function showAgenciesByCity(){
        var state = $("#filter-agency-state").val();
        var city = $("#filter-agency-city").val();

        var URL = "/locations/all/" + state + "/" + city;

        $.ajax({
            url: URL,
            method: "GET",
            dataType: "json",
            success: showAgencies
        });
    }

});