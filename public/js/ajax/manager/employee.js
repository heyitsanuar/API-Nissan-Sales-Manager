$(document).ready(function(){

    refreshEmployees();

    $("#add-employee-submit").on('click', addEmployee);
    $("#btn-remove-employee").on('click', removeManager);

    function showEmployees(receivedAgency){
        var result = "";
        var employees = {};
        //var agency = agency.employees;
        receivedAgency.forEach(element => {
            employees = element.employees;
        });

        console.log(employees);
    
        $.each(employees, function(index, employee){
            result += "<tr class='table__row-td'>";
            result += "<td class='table__td'>" + employee.fullName + "</td>";
            result += "<td class='table__td'>" + employee.phone + "</td>";
            result += "<td class='table__td'>" + employee.email + "</td>";
            result += "<td class='table__td'>" + employee.address + "</td>";
            result += "<td class='table__controls'>";
            result += "<div class='table__dropdown dropdown dropleft'>";
            result += "<a class='table__dropdown-button' id='data1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>...</a>";
            result += "<div class='table__dropdown-menu dropdown-menu' aria-labelledby='data1'>";
            result += "<a class='edit-employee_show table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.edit-employee' data-id='" + employee._id + "'>Edit</a>";
            result += "<a class='remove-employee_show table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.delete-element' data-id='" + employee._id + "'>Delete</a>";
            result += "</div>";
            result += "</div>";
            result += "</td>";
            result += "</tr>";
        });
    
        $("#table-employees").html(result);

        editButtons = $(".edit-employee_show");
        editButtons.on('click', updateEmployee);

        removeButtons = $(".remove-employee_show");
        removeButtons.on('click', function(){
            var id = $(this).attr("data-id");
            $("#btn-remove-employee").attr("data-id", id);
        });
    }
   
    function refreshEmployees(){

        var URL = "/employees/salesmen";
        console.log(URL);
        $.ajax({
            url: URL,
            method: "GET",
            dataType: "json",
            success: showEmployees
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
            success: refreshEmployees
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
                            success: refreshEmployees
                        });
    
                    });
                }
            });
    }

    function removeManager(){
        var id = $("#btn-remove-employee").attr("data-id");
        var url = "/employees/" + id + "?_method=DELETE";

        $.ajax({
            url: url,
            method: "POST",
            success: refreshEmployees
        });
    }

});