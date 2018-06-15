$(document).ready(function(){

    refreshAgencies();
    fillSelectStates();

    $("#btn-add-agency").on('click', loadModalInfo);

    function loadModalInfo(){
        
        var id = $(this).attr("data-id"),
            url = "/cars/" + id;

        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            success: function(models){

                 $("#modal-gallery").

                 $("#modal-info").
            }

        });
    }

});