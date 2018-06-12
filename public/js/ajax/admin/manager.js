$(document).ready(function(){

    refreshManagers();

    $("#add-employee-submit").on('click', addEmployee);

    function showManagers(managers){
        var result = "";
    
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
            result += "<a class='table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.edit-employee'>Edit</a>";
            result += "<a class='table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.delete-element'>Delete</a>";
            result += "</div>";
            result += "</div>";
            result += "</td>";
            result += "</tr>";
        });
    
        $("#table-managers").html(result);
    }
   
    function refreshManagers(){

        var URL = "/employees/managers";
        
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
});