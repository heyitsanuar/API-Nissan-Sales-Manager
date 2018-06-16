$(document).ready(function(){

    refreshAgencies();
    fillSelectStates();

    $("#btn-add-agency").on('click', prepareFormToAdd);
    $("#btn-remove-agency").on('click', removeAgency);
    $("#filter-agency-state").on('change', fillSelectCities);
    $("#filter-agency-city").on('change', showAgenciesByCity);;

    function showAgencies(agencies){
        var result = "";
    
        $.each(agencies, function(index, agency){

            result += "<tr class='table__row-td'>";
            result += "<td class='table__td'>" + agency.name + "</td>";
            result += "<td class='table__td'>" + agency.manager.fullName + "</td>";
            result += "<td class='table__td state'>" + agency.state + "</td>";
            result += "<td class='table__td city'>" + agency.city + "</td>";
            result += "<td class='table__td'>" + agency.cp + "</td>";
            result += "<td class='table__td'>" + agency.address + "</td>";
            result += "<td class='table__controls'>";
            result += "<div class='table__dropdown dropdown dropleft'>";
            result += "<a class='table__dropdown-button' id='data1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>...</a>";
            result += "<div class='table__dropdown-menu dropdown-menu' aria-labelledby='data1'>";
            result +=   "<a class='edit-agency_show table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.form-agency' data-id='" + agency._id + "'>Edit</a>";
            result +=   "<a class='remove-agency_show table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.delete-element' data-id='" + agency._id + "'>Delete</a>";
            result += "</div>";
            result += "</div>";
            result += "</td>";
            result += "</tr>";

        });
    
        $("#table-agency").html(result);

        editButtons = $(".edit-agency_show");
        editButtons.on('click', prepareFormToUpdate);
        
        removeButtons = $(".remove-agency_show");
        removeButtons.on('click', function(){
            var id = $(this).attr("data-id");
            $("#btn-remove-agency").attr("data-id", id);
        });
    }

    function prepareFormToUpdate(){
        var id = $(this).attr("data-id"),
            url = "/agency/" + id;
            
        var formTitle    = $("#form-agency_title"),
            inputName    = $("#form-agency_name"),
            inputState   = $("#form-agency_state"),
            inputCity    = $("#form-agency_city"),
            inputCp      = $("#form-agency_cp"),
            inputAddress = $("#form-agency_address");

        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            success: function(agency){
                formTitle.text("Edit agency");

                agency.forEach(function(agency){
                    inputName.val(agency.name);
                    inputState.val(agency.state);
                    inputCity.val(agency.city);
                    inputCp.val(agency.cp);
                    inputAddress.val(agency.address);

                    //Changing button id to trigger another function
                });
                
                $("#agency-add").attr("id", "agency-edit");
                
                $("#agency-edit").on('click', function(){
                    
                    var userForm = $("#agency-form"),
                    urlUpdate = "/agency/" + id + "?_method=PUT",
                    data = {};
                
                    console.log(url);
            
                    userForm.find('[name]').each(function(index, value){
                        var name  = $(this).attr('name'),
                            value = $(this).val();
            
                        data[name] = value;
                    });
            
                    console.log(data);
                    
                    $.ajax({
                        url: urlUpdate,
                        method: "POST",
                        data: data,
                        success: refreshAgencies
                    });

                });
            }
        });
        
    }
    
    function prepareFormToAdd(){
        $("#form-agency_title").text("Add branch");
        $("#form-agency_name").val("");
        $("#form-agency_state").val("");
        $("#form-agency_city").val("");
        $("#form-agency_cp").val("");
        $("#form-agency_address").val("");
        
        $("#agency-edit").attr("id", "agency-add");
        $("#agency-add").on('click', addAgency);
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

        fillSelectStates();
    }

    function removeAgency(){
        var id = $("#btn-remove-agency").attr("data-id");
        var url = "/agency/" + id + "?_method=DELETE";

        console.log(url);

        $.ajax({
            url: url,
            method: "POST",
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