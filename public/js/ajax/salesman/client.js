$(document).ready(function(){

    refreshClients();
    fillSelectStates();

    $("#add-client-submit").on('click', addClient);
    $("#btn-remove-client").on('click', removeClient);

    $("#filter-clients-state").on('change', fillSelectCities);
    $("#filter-clients-city").on('change', fillSelectAgencies);

    function showClients(receivedClients){
        var result = "";
    
        $.each(receivedClients, function(index, client){
            result += "<tr class='table__row-td'>";
            result += "<td class='table__td'>" + client.name + " " + client.surname + "</td>";
            result += "<td class='table__td'>" + client.phone + "</td>";
            result += "<td class='table__td'>" + client.email + "</td>";
            result += "<td class='table__td'>" + client.state + "</td>";
            result += "<td class='table__td'>" + client.city + "</td>";
            result += "<td class='table__td'>" + client.cp + "</td>";
            result += "<td class='table__td'>" + client.address + "</td>";
            result += "<td class='table__controls'>";
            result += "<div class='table__dropdown dropdown dropleft'>";
            result += "<a class='table__dropdown-button' id='data1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>...</a>";
            result += "<div class='table__dropdown-menu dropdown-menu' aria-labelledby='data1'>";
            result += "<a class='edit-client_show table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.edit-employee' data-id='" + client._id + "'>Edit</a>";
            result += "<a class='remove-client_show table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.delete-element' data-id='" + client._id + "'>Delete</a>";
            result += "</div>";
            result += "</div>";
            result += "</td>";
            result += "</tr>";
        });
    
        $("#table-clients").html(result);

        editButtons = $(".edit-client_show");
        editButtons.on('click', updateClient);

        removeButtons = $(".remove-client_show");
        removeButtons.on('click', function(){
            var id = $(this).attr("data-id");
            $("#btn-remove-client").attr("data-id", id);
        });
    }
   
    function refreshClients(){

        var URL = "/clients";
        console.log(URL);
        $.ajax({
            url: URL,
            method: "GET",
            dataType: "json",
            success: showClients
        });

    }

    function addClient(){
        
        var userForm = $("#add-client-form"),
            url = "/clients",
            data = {};
        
        userForm.find('[name]').each(function(index, value){
            var name  = $(this).attr('name'),
                value = $(this).val();

            data[name] = value;
        });

        console.log(data);
        
        $.ajax({
            url: url,
            method: "POST",
            data: data,
            success: refreshClients
        });
    }

    function updateClient(){
        var id = $(this).attr("data-id"),
            url = "/employees/" + id;
        
        var inputName    = $("#form-e-manager_name"),
            inputSurname = $("#form-e-manager_surname"),
            inputEmail   = $("#form-e-manager_email"),
            inputPhone   = $("#form-e-manager_phone"),
            inputAddress = $("#form-e-manager_address");

            $.ajax({
                url: url,
                method: "GET",
                dataType: "json",
                success: function(manager){

                    inputName.val(manager.name);
                    inputSurname.val(manager.surname);
                    inputEmail.val(manager.email);
                    inputPhone.val(manager.phone);
                    inputAddress.val(manager.address);
                    
                    $("#edit-manager-submit").on('click', function(){
                        
                        var userForm = $("#edit-employee-form"),
                            urlUpdate = "/employees/" + id + "?_method=PUT",
                            data = {};
                        
                        console.log(urlUpdate);
                        
                        userForm.find('[name]').each(function(index, value){
                            var name  = $(this).attr('name'),
                                value = $(this).val();
                
                            data[name] = value;
                        });
                        
                        $.ajax({
                            url: urlUpdate,
                            method: "POST",
                            data: data,
                            success: refreshClients
                        });
    
                    });
                }
            });
    }

    function removeClient(){
        var id = $("#btn-remove-employee").attr("data-id");
        var url = "/employees/" + id + "?_method=DELETE";

        $.ajax({
            url: url,
            method: "POST",
            success: refreshClients
        });
    }

});