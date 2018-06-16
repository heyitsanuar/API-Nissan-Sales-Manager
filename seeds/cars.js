var Models = [
    {
        modelo: String,
        descripcion: String,
        categoria: String,
        anio: Number,
        colores: {
            interior: [
                {
                    nombre: String,
                    codigo: String
                }
            ],
            exterior: [
                {
                    nombre: String,
                    codigo: String
                }
            ]
        },
        dimensiones: {
            largo: String,
            ancho: String,
            alto: String
        },
        variantes: [],
        photos: {
            bannerImageURL: String,
            imagesURL: [

            ]
        },
        imagenes: [String],
    }
];