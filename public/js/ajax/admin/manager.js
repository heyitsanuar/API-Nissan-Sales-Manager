$(document).ready(function(){

    refreshManagers();

    $("#add-manager-submit").on('click', addEmployee);
    $("#btn-remove-manager").on('click', removeManager);

    function showManagers(managers){
        var result = "";

        console.log(managers);
    
        $.each(managers, function(index, manager){
            result += "<tr class='table__row-td'>";
            result += "<td class='table__td'>" + manager.name + " " + manager.surname + "</td>";
            result += "<td class='table__td'>Tabaranch</td>";
            result += "<td class='table__td'>" + manager.phone + "</td>";
            result += "<td class='table__td'>" + manager.email + "</td>";
            result += "<td class='table__td'>" + manager.address + "</td>";
            result += "<td class='table__controls'>";
            result += "<div class='table__dropdown dropdown dropleft'>";
            result += "<a class='table__dropdown-button' id='data1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>...</a>";
            result += "<div class='table__dropdown-menu dropdown-menu' aria-labelledby='data1'>";
            result += "<a class='edit-employee_show table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.edit-employee' data-id='" + manager._id + "'>Edit</a>";
            result += "<a class='remove-employee_show table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.delete-element' data-id='" + manager._id + "'>Delete</a>";
            result += "</div>";
            result += "</div>";
            result += "</td>";
            result += "</tr>";
        });
    
        $("#table-managers").html(result);

        editButtons = $(".edit-employee_show");
        editButtons.on('click', updateEmployee);

        removeButtons = $(".remove-employee_show");
        removeButtons.on('click', function(){
            var id = $(this).attr("data-id");
            $("#btn-remove-manager").attr("data-id", id);
        });
    }
   
    function refreshManagers(){

        var URL = "/employees/managers";
        console.log(URL);
        $.ajax({
            url: URL,
            method: "GET",
            dataType: "json",
            success: showManagers
        });

    }

    function addEmployee(){
        
        var userForm = $("#add-employee-form"),
            url = "/employees",
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
            success: refreshManagers
        });
    }

    function updateEmployee(){
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
                            success: refreshManagers
                        });
    
                    });
                }
            });
    }

    function removeManager(){
        var id = $("#btn-remove-manager").attr("data-id");
        var url = "/employees/" + id + "?_method=DELETE";

        $.ajax({
            url: url,
            method: "POST",
            success: refreshManagers
        });
    }
});