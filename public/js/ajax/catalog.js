$(document).ready(function(){

    $(".car").on('click', loadModalInfo);
    $(".modal__thumbnail").on('click', changeImage);
    
    function changeImage(){
        var url = $(this).attr("src");

        $("#modal-image").attr("src", url);
    }

    function loadModalInfo(){
        
        var id = $(this).attr("data-id"),
            url = "/cars/" + id;

            console.log(url);

        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            success: function(model){

                var images = model.photos.imagesURL;
                var galleryImages = $(".modal__thumbnail");

                console.log(model);
                
                //Setting main current image
                $("#modal-image").attr("src", images[5]);

                //Setting images for each of the thumbs
                $.each(galleryImages, function(key, value) {
                    $(value).attr("src", images.pop());
                });

                //Modal info
                $("#modal-title").text(model.modelo);
                $("#modal-description").text(model.descripcion);
                $("#feature-traccion").text(model.variantes[0].caracteristicas.traccion);
                $("#feature-transmision").text(model.variantes[0].caracteristicas.transmision);
                $("#feature-potencia").text(model.variantes[0].caracteristicas.potencia);
                $("#feature-rendimiento").text(model.variantes[0].caracteristicas.rendimiento);
                
                var seeMoreUrl = $("#btn-see-more").attr("href") + id;
                
                $("#btn-see-more").attr("href", seeMoreUrl);

            }

        });
    }

});