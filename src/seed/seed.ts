    // prisma/seed.ts
    import { PrismaClient } from '@prisma/client';

    const prisma = new PrismaClient();

    async function main() {
      // Create user records
    await prisma.menues.createMany({
        data: 
        [
            {
                Description: "Pagina principal",
                Name: "Inicio",
                HasSubMenu: false,
                Url: "/",
                Position: 0,
                CreatedDate: new Date(),
            },
            {
                Description: "Para mostrar las ofertas",
                Name: "Oferta",
                HasSubMenu: false,
                Url: "products/offer",
                Position: 2,
                CreatedDate: new Date(),                
            },
            {
                Description: "Para mostrar los Beneficios",
                Name: "Beneficios",
                HasSubMenu: false,
                Url: "products/benefit",
                Position: 3,
                CreatedDate: new Date(),                
            },
            {
                Description: "Para mostrar nuestras marcas",
                Name: "Nuestra Marca",
                HasSubMenu: false,
                Url: "products/brand",
                Position: 4,
                CreatedDate: new Date(),                
            },
            {
                Description: "Para contactar",
                Name: "Contacto",
                HasSubMenu: false,
                Url: "products/Contact",
                Position: 7,
                CreatedDate: new Date(),                
            },
            {
                Description: "Para asignar menu a usuario",
                Name: "Asignar menu",
                HasSubMenu: false,
                Url: "products/assignmenu",
                Position: 6,
                CreatedDate: new Date(),                
            },
            
        ],
    });

    await prisma.menues.create({
        data: {
            Description: "Todos las categorias",
            Name: "Categoria",
            HasSubMenu: true,
            Url: "category",
            Position: 1,
            CreatedDate: new Date(),
            SubMenu: {
                create: [
                    {
                        Description: "Todo relacionada al deporte",
                        Name: "Deportes",
                        Url: "products/sport",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionada al juguete",
                        Name: "Juguetes",
                        Url: "products/game",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Dpto de electronica",
                        Name: "Electrónica",
                        Url: "products/electronic",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionada con hogar",
                        Name: "hogar",
                        Url: "products/furniture",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Dpto de moda",
                        Name: "moda",
                        Url: "products/mode",
                        CreatedDate: new Date(),
                    }
                ]
            },
            
        },
        
    });
    
    await prisma.menues.create({
        data: {
            Description: "Gestionar todos los ABM",
            Name: "ABM",
            HasSubMenu: true,
            Url: " ",
            Position: 5,
            CreatedDate: new Date(),
            SubMenu: {
                create: [
                    {
                        Description: "Todo relacionada al producto",
                        Name: "ABM Productos",
                        Url: "products/ProductActions",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionada al usuario",
                        Name: "ABM Usuarios",
                        Url: "products/UserActions",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionada a las categorias",
                        Name: "ABM Categorias",
                        Url: "products/categoryactions",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionada con tipo de pago",
                        Name: "ABM tipo de pago",
                        Url: "products/paymenttypeactions",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionada con presentaciones",
                        Name: "ABM Presentaciones",
                        Url: "products/presentationactions",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionada con proveedores",
                        Name: "ABM Provedores",
                        Url: "products/suplierActions",
                        CreatedDate: new Date(),
                    }
                ]
            },
            
        },
        
    });

    await prisma.roles.createMany({
    data: [
        {
            Name: "Admin",
            Description: "Administrador del sistema",
            CreatedDate: new Date(),
        },
        {
            Name: "Usuario",
            Description: "Usuario para realiza compra desde el sistema",
            CreatedDate: new Date(),
        },
        {
            Name: "Empleado",
            Description: "Usuario vendedor del sistema",
            CreatedDate: new Date(),
        },
        {
            Name: "Proveedor",
            Description: "Usuario proveedor del sistema",
            CreatedDate: new Date(),
        },
        {
            Name: "Logistica",
            Description: "Usuario encargado de la logistica del sistema",
            CreatedDate: new Date(),
        },
        {
            Name: "Marketing",
            Description: "Usuario encargado de marketing del sistema",
            CreatedDate: new Date(),
        },
        {
            Name: "Soporte",
            Description: "Usuario encargado de soporte del sistema",
            CreatedDate: new Date(),
        },
        {
            Name: "Finanzas",
            Description: "Usuario encargado de finanzas del sistema",
            CreatedDate: new Date(),
            State:2
        },
        {
            Name: "RRHH",
            Description: "Usuario encargado de recursos humanos del sistema",
            CreatedDate: new Date(),
            State:2
        },
        {
            Name: "Compras",
            Description: "Usuario encargado de compras del sistema",
            CreatedDate: new Date(),
        },
        {
            Name: "Ventas",
            Description: "Usuario encargado de ventas del sistema",
            CreatedDate: new Date(),
        },
        {
            Name: "Desarrollador",
            Description: "Usuario encargado del desarrollo del sistema",
            CreatedDate: new Date(),
            State:2
        },
        {
            Name: "Analista",
            Description: "Usuario encargado del analisis del sistema",
            CreatedDate: new Date(),
            State:2
        },
        {
            Name: "Diseñador",
            Description: "Usuario encargado del diseño del sistema",    
            CreatedDate: new Date(),
            State:2
        },
        {
            Name: "Tester",
            Description: "Usuario encargado de las pruebas del sistema",
            CreatedDate: new Date(),
            State:2
        },
        {
            Name: "Administrador de base de datos",
            Description: "Usuario encargado de la administración de la base de datos del sistema",
            CreatedDate: new Date(),
            State:2
        },
        {
            Name: "Administrador de red",
            Description: "Usuario encargado de la administración de la red del sistema",
            CreatedDate: new Date(),
            State:2
        },
        {
            Name: "Administrador de seguridad",
            Description: "Usuario encargado de la seguridad del sistema",
            CreatedDate: new Date(),
            State:2
        },
        {
            Name: "Administrador de sistemas",
            Description: "Usuario encargado de la administración de los sistemas del sistema",
            CreatedDate: new Date(),
            State:2
        },
        {
            Name: "Administrador de proyectos",
            Description: "Usuario encargado de la administración de los proyectos del sistema",
            CreatedDate: new Date(),
            State:2
        },
        {
            Name: "Administrador de calidad",
            Description: "Usuario encargado de la administración de la calidad del sistema",
            CreatedDate: new Date(),
            State:2
        },
        {
            Name: "Administrador de servicios",
            Description: "Usuario encargado de la administración de los servicios del sistema",
            CreatedDate: new Date(),
            State:2
        },
        {
            Name: "Administrador de infraestructura",
            Description: "Usuario encargado de la administración de la infraestructura del sistema",
            CreatedDate: new Date(),
            State:2
        },
        {
            Name: "Administrador de operaciones",
            Description: "Usuario encargado de la administración de las operaciones del sistema",
            CreatedDate: new Date(),
            State:2
        }
    ],
    });

    await prisma.categories.create({
        data: {
            Description: "Contiene todo lo relaciondo con electronica",
            Name: "Electrónica",
            CreatedDate: new Date(),
            SubCategory: {
                create: [
                    {
                        Description: "Todo relacionado con celular",
                        Name: "Celulares",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionado con compu y accesorios",
                        Name: "Computadoras y accesorios",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionado con tableta",
                        Name: "Tablets",
                        CreatedDate: new Date(),
                    }
                ]
            },
            
        },
        
    });

    await prisma.categories.create({
        data: {
            Description: "Contiene todo lo relaciondo con la ferretería",
            Name: "Ferretería",
            CreatedDate: new Date(),
            SubCategory: {
                create: [
                    {
                        Description: "Todo relacionado con Plomería",
                        Name: "Plomería",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionado con Albañilería",
                        Name: "Albañilería",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionado con Carpintería",
                        Name: "Carpintería",
                        CreatedDate: new Date(),
                    }
                ]
            },
            
        },
        
    });

    await prisma.categories.create({
        data: {
            Description: "Contiene todo lo relaciondo con la Ropa y Accesorios",
            Name: "Ropa y Accesorios",
            CreatedDate: new Date(),
            SubCategory: {
                create: [
                    {
                        Description: "Todo relacionado con Camisetas",
                        Name: "Camisetas",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionado con Pantalones",
                        Name: "Pantalones",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionado con Zapatos",
                        Name: "Zapatos ",
                        CreatedDate: new Date(),
                    }
                ]
            },
            
        },
        
    });

    await prisma.categories.create({
        data: {
            Description: "Contiene todo lo relaciondo con Hogar y cocina",
            Name: "Hogar y cocina",
            CreatedDate: new Date(),
            SubCategory: {
                create: [
                    {
                        Description: "Todo relacionado con Utensilios de cocina",
                        Name: "Utensilios de cocina",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionado con Muebles",
                        Name: "Muebles",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionado con Decoración",
                        Name: "Decoración ",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionado con Limpieza",
                        Name: "Limpieza ",
                        CreatedDate: new Date(),
                    }
                ]
            },
            
        },
        
    });

    await prisma.categories.create({
        data: {
            Description: "Contiene todo lo relaciondo con Deportes y aire libre",
            Name: "Deportes y aire libre",
            CreatedDate: new Date(),
            SubCategory: {
                create: [
                    {
                        Description: "Todo relacionado con Ropa deportiva",
                        Name: "Ropa deportiva",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionado con Equipamiento de gimnasio",
                        Name: "Equipamiento de gimnasio",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionado con Accesorios de camping",
                        Name: "Accesorios de camping ",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionado con Herramientas de jardín",
                        Name: "Herramientas de jardín ",
                        CreatedDate: new Date(),
                    }
                ]
            },
            
        },
        
    });

    await prisma.categories.create({
        data: {
            Description: "Contiene todo lo relaciondo con Ropa",
            Name: "Ropa",
            CreatedDate: new Date(),
            SubCategory: {
                create: [
                    {
                        Description: "Todo relacionado con Ropa de hombre",
                        Name: "Ropa de hombre",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionado con Ropa de mujer",
                        Name: "Ropa de mujer",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionado con Ropa infantil",
                        Name: "Ropa infantil",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionado con Calzado",
                        Name: "Calzado",
                        CreatedDate: new Date(),
                    },
                    {
                        Description: "Todo relacionado con Accesorios",
                        Name: "Accesorios",
                        CreatedDate: new Date(),
                    }
                ]
            },
            
        },
        
    });
    await prisma.presentations.createMany({
    data: 
    [
        {
            Description: "Incluye el diseño del empaque (caja, botella, envase) que protege el producto y atrae al cliente.",
            Name: "Embalaje",
            CreatedDate: new Date(),
        },
        {
            Description: "Se especifica el producto en unidades como kilogramos (kg), litros, unidades, etc., para definir la cantidad.",
            Name: "Unidades de medida",
            CreatedDate: new Date(),                
        },
        {
            Description: "El producto exhibido en tiendas, stands, o en muestrarios, debe ser atractivo y organizado.",
            Name: "Presentación física",
            CreatedDate: new Date(),                
        },
        {
            Description: "Catálogos, descripciones en línea, videos y presentaciones interactivas son cada vez más importantes. ",
            Name: "Presentación digital",
            CreatedDate: new Date(),                
        }
        
    ],
    });

    }

main()
    .catch((e) => {
    process.exit(1);
    })
    .finally(async () => {
    await prisma.$disconnect();
    });