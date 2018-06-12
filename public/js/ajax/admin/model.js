$(document).ready(function(){

    refreshModels();

    $("#add-model-submit").on('click', addModel);
    $("i .edit-model_show").on('click', function(){
        console.log("Hey");
    });

    $("#filter-category").on('change', filterCategory);

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
            result += "<i class='edit-model_show table__dropdown-item' data-toggle='modal' data-target='.edit-model' data-id='" + model._id +"'>Edit</i>";
            result += "<a class='table__dropdown-item' href='#' data-toggle='modal' data-target='.delete-element'>Delete</a>";
            result += "</td>";
            result += "</tr>";
        });
    
        $("#table-models").html(result);
    }
   
    function refreshModels(){

        var URL = "/cars";
        
        $.ajax({
            url: URL,
            method: "GET",
            dataType: "json",
            success: showModels
        });

    }

    function addModel(){
        
        var modelForm = $("#add-model-form"),
            url = "/cars",
            data = {};
        
        modelForm.find('[name]').each(function(index, value){
            var name  = $(this).attr('name'),
                value = $(this).val();

            data[name] = value;
        });
        
        $.ajax({
            url: url,
            method: "POST",
            data: data,
            success: refreshModels
        });
    }

    function fillFormWithModelInfo(){

        var id = $(this).attr("data-id").val();
        var URL = "/cars/" + id;

        console.log(URL);

        $.ajax({
            url: URL,
            method: "GET",
            dataType: "json",
            success: function(models){
                
                var form = $("#edit-model-form");
                
                $.each(models, function(name, value){
                    var el = $('[name="'+name+'"]', form );
                
                    el.val(value);
                });

            }
        });

    }

    function filterCategory(){
        var category = $(this).val();

        if(category == "All"){
            var URL = "/cars";
        }else{
            var URL = "/cars/category/" + category;
        }

        $.ajax({
            url: URL,
            method: "GET",
            dataType: "json",
            success: showModels
        });
    }

});