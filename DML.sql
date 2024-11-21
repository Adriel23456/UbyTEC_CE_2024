-- Insertar Admins
INSERT INTO [Admin] ([Id], [Name], [FirstSurname], [SecondSurname], [Province], [Canton], [District], [UserId], [Password])
VALUES 
(1001, 'Juan', 'García', 'Rodríguez', 'San José', 'Central', 'Carmen', 'juan.admin', 'pass123'),
(1002, 'María', 'López', 'Hernández', 'Alajuela', 'Central', 'Alajuela', 'maria.admin', 'pass124'),
(1003, 'Carlos', 'Martínez', 'Jiménez', 'Cartago', 'Central', 'Oriental', 'carlos.admin', 'pass125'),
(1004, 'Ana', 'Sánchez', 'González', 'Heredia', 'Central', 'Heredia', 'ana.admin', 'pass126'),
(1005, 'Pedro', 'Ramírez', 'Vargas', 'San José', 'Escazú', 'San Rafael', 'pedro.admin', 'pass127');

-- Insertar teléfonos para Admins
INSERT INTO [AdminPhone] ([Admin_id], [Phone])
VALUES
-- Teléfonos para Juan
(1001, 88881111),
(1001, 88882222),
(1001, 88883333),
-- Teléfonos para María
(1002, 88884444),
(1002, 88885555),
(1002, 88886666),
-- Teléfonos para Carlos
(1003, 88887777),
(1003, 88888888),
(1003, 88889999),
-- Teléfonos para Ana
(1004, 88890000),
(1004, 88891111),
(1004, 88892222),
-- Teléfonos para Pedro
(1005, 88893333),
(1005, 88894444),
(1005, 88895555);

-- Insertar FoodDeliveryMan
INSERT INTO [FoodDeliveryMan] ([UserId], [Name], [FirstSurname], [SecondSurname], [Province], [Canton], [District], [Password], [State])
VALUES
('EsperandoRepartidor', 'string', 'string', 'string', 'string', 'string', 'string', 'pAJgbJN89H9768gb585BV05', 'No disponible'),
('delivery1', 'Roberto', 'Fernández', 'Castro', 'San José', 'Central', 'Catedral', 'pass201', 'Disponible'),
('delivery2', 'Laura', 'Campos', 'Mora', 'Alajuela', 'San Ramón', 'Central', 'pass202', 'Disponible'),
('delivery3', 'Diego', 'Vargas', 'Solís', 'Cartago', 'La Unión', 'Tres Ríos', 'pass203', 'Disponible'),
('delivery4', 'Sofia', 'Rojas', 'Arguedas', 'Heredia', 'Santo Domingo', 'San Vicente', 'pass204', 'Disponible'),
('delivery5', 'Miguel', 'Castro', 'Quesada', 'San José', 'Desamparados', 'Central', 'pass205', 'No disponible');

-- Insertar teléfonos para FoodDeliveryMan
INSERT INTO [FoodDeliveryManPhone] ([FoodDeliveryMan_UserId], [Phone])
VALUES
-- Teléfonos para Roberto
('delivery1', 77771111),
('delivery1', 77772222),
('delivery1', 77773333),
-- Teléfonos para Laura
('delivery2', 77774444),
('delivery2', 77775555),
('delivery2', 77776666),
-- Teléfonos para Diego
('delivery3', 77777777),
('delivery3', 77778888),
('delivery3', 77779999),
-- Teléfonos para Sofia
('delivery4', 77780000),
('delivery4', 77781111),
('delivery4', 77782222),
-- Teléfonos para Miguel
('delivery5', 77783333),
('delivery5', 77784444),
('delivery5', 77785555);

-- Insertar Clients
INSERT INTO [Client] ([Id], [UserId], [Name], [FirstSurname], [SecondSurname], [Province], [Canton], [District], [Password], [Phone], [BirthDate])
VALUES
(2001, 'client1', 'Patricia', 'Méndez', 'Araya', 'San José', 'Montes de Oca', 'San Pedro', 'pass301', 66661111, '15-05-1990'),
(2002, 'client2', 'Fernando', 'Bonilla', 'Chaves', 'Alajuela', 'Atenas', 'Central', 'pass302', 66662222, '22-08-1988'),
(2003, 'client3', 'Carmen', 'Villalobos', 'Pérez', 'Cartago', 'Paraíso', 'Central', 'pass303', 66663333, '10-03-1995'),
(2004, 'client4', 'Andrés', 'Molina', 'Sáenz', 'Heredia', 'Belén', 'San Antonio', 'pass304', 66664444, '28-11-1992'),
(2005, 'client5', 'Lucía', 'Cordero', 'Mata', 'San José', 'Moravia', 'San Vicente', 'pass305', 66665555, '19-07-1993');

-- Insertar BusinessManager
INSERT INTO [BusinessManager] ([Email], [Name], [FirstSurname], [SecondSurname], [Province], [Canton], [District], [UserId], [Password])
VALUES
('manager1@email.com', 'Alberto', 'Herrera', 'Blanco', 'San José', 'Santa Ana', 'Pozos', 'alberto.manager', 'pass401'),
('manager2@email.com', 'Isabel', 'Madrigal', 'Varela', 'Alajuela', 'Grecia', 'Central', 'isabel.manager', 'pass402'),
('manager3@email.com', 'Ricardo', 'Guerrero', 'López', 'Cartago', 'El Guarco', 'Tejar', 'ricardo.manager', 'pass403'),
('manager4@email.com', 'Mónica', 'Navarro', 'Castro', 'Heredia', 'San Pablo', 'Rincón', 'monica.manager', 'pass404'),
('manager5@email.com', 'Gabriel', 'Porras', 'Rojas', 'San José', 'Tibás', 'Cinco Esquinas', 'gabriel.manager', 'pass405'),
('manager6@email.com', 'Carolina', 'Jiménez', 'Mora', 'San José', 'Curridabat', 'Granadilla', 'carolina.manager', 'pass406'),
('manager7@email.com', 'Eduardo', 'Solano', 'Vega', 'Cartago', 'Oreamuno', 'San Rafael', 'eduardo.manager', 'pass407');

-- Insertar teléfonos para BusinessManager
INSERT INTO [BusinessManagerPhone] ([BusinessManager_Email], [Phone])
VALUES
-- Teléfonos para Alberto
('manager1@email.com', 99991111),
('manager1@email.com', 99992222),
('manager1@email.com', 99993333),
-- Teléfonos para Isabel
('manager2@email.com', 99994444),
('manager2@email.com', 99995555),
('manager2@email.com', 99996666),
-- Teléfonos para Ricardo
('manager3@email.com', 99997777),
('manager3@email.com', 99998888),
('manager3@email.com', 99999999),
-- Teléfonos para Mónica
('manager4@email.com', 99990000),
('manager4@email.com', 99991111),
('manager4@email.com', 99992222),
-- Teléfonos para Gabriel
('manager5@email.com', 99993333),
('manager5@email.com', 99994444),
('manager5@email.com', 99995555),
-- Teléfonos para Carolina
('manager6@email.com', 99996666),
('manager6@email.com', 99996667),
('manager6@email.com', 99996668),
-- Teléfonos para Eduardo
('manager7@email.com', 99997777),
('manager7@email.com', 99997778),
('manager7@email.com', 99997779);

-- Insertar tipos de negocios
INSERT INTO [BusinessType] ([Name])
VALUES
('Restaurante'),
('Cafetería'),
('Panadería'),
('Heladería'),
('Comida Rápida');

-- Insertar negocios asociados
INSERT INTO [BusinessAssociate] ([Legal_Id], [Email], [State], [BusinessName], [Province], [Canton], [District], [SINPE], [RejectReason], [BusinessManager_Email], [BusinessType_Identification])
VALUES
-- Negocios Aceptados
(30101111, 'saborcasero@email.com', 'Aceptado', 'Sabor Casero', 'San José', 'Central', 'Merced', 88880001, NULL, 'manager1@email.com', 1),
(30102222, 'cafedelicia@email.com', 'Aceptado', 'Café Delicia', 'Alajuela', 'Central', 'Alajuela', 88880002, NULL, 'manager2@email.com', 2),
(30103333, 'panfresco@email.com', 'Aceptado', 'Pan Fresco', 'Cartago', 'Central', 'Oriental', 88880003, NULL, 'manager3@email.com', 3),
(30104444, 'heladosdulces@email.com', 'Aceptado', 'Helados Dulces', 'Heredia', 'Central', 'Heredia', 88880004, NULL, 'manager4@email.com', 4),
(30105555, 'burgerexpress@email.com', 'Aceptado', 'Burger Express', 'San José', 'Escazú', 'San Rafael', 88880005, NULL, 'manager5@email.com', 5),

-- Negocio En Espera
(30106666, 'pizzarapida@email.com', 'En espera', 'Pizza Rápida', 'San José', 'Desamparados', 'Central', 88880006, NULL, 'manager6@email.com', 5),

-- Negocio Rechazado
(30107777, 'tacoslocos@email.com', 'Rechazado', 'Tacos Locos', 'Cartago', 'La Unión', 'Tres Ríos', 88880007, 'No cumple con los requisitos sanitarios básicos', 'manager7@email.com', 1);

-- Insertar teléfonos para los negocios asociados
INSERT INTO [BusinessAssociatePhone] ([BusinessAssociate_Legal_Id], [Phone])
VALUES
-- Teléfonos Sabor Casero
(30101111, 22221111),
(30101111, 22221112),
-- Teléfonos Café Delicia
(30102222, 22222221),
(30102222, 22222222),
-- Teléfonos Pan Fresco
(30103333, 22223331),
(30103333, 22223332),
-- Teléfonos Helados Dulces
(30104444, 22224441),
(30104444, 22224442),
-- Teléfonos Burger Express
(30105555, 22225551),
(30105555, 22225552),
-- Teléfonos Pizza Rápida (En espera)
(30106666, 22226661),
(30106666, 22226662),
-- Teléfonos Tacos Locos (Rechazado)
(30107777, 22227771),
(30107777, 22227772);

-- Productos para Sabor Casero (Restaurante)
INSERT INTO [Product] ([Name], [Price], [Category], [BusinessAssociate_Legal_Id])
VALUES 
('Sopa de Pollo', 3500.00, 'Entrada', 30101111),
('Casado con Pollo', 5500.00, 'Plato principal', 30101111),
('Gallo Pinto', 2500.00, 'Plato principal', 30101111),
('Refresco Natural', 1200.00, 'Bebida', 30101111),
('Arroz con Leche', 1500.00, 'Postre', 30101111),
('Flan de Coco', 2000.00, 'Postre', 30101111),
('Porción Extra de Aguacate', 800.00, 'Extra', 30101111);

-- Productos para Café Delicia (Cafetería)
INSERT INTO [Product] ([Name], [Price], [Category], [BusinessAssociate_Legal_Id])
VALUES 
('Emparedado de Jamón y Queso', 2800.00, 'Entrada', 30102222),
('Café Americano', 1500.00, 'Bebida', 30102222),
('Cappuccino', 2000.00, 'Bebida', 30102222),
('Queque de Chocolate', 2500.00, 'Postre', 30102222),
('Galletas de Avena', 1000.00, 'Complemento', 30102222),
('Té Verde', 1200.00, 'Bebida', 30102222),
('Leche Extra', 500.00, 'Extra', 30102222);

-- Productos para Pan Fresco (Panadería)
INSERT INTO [Product] ([Name], [Price], [Category], [BusinessAssociate_Legal_Id])
VALUES 
('Pan Baguette', 1500.00, 'Plato principal', 30103333),
('Croissant', 1200.00, 'Complemento', 30103333),
('Pan Integral', 2000.00, 'Plato principal', 30103333),
('Queque de Vainilla', 2500.00, 'Postre', 30103333),
('Café con Leche', 1500.00, 'Bebida', 30103333),
('Empanada de Queso', 1000.00, 'Complemento', 30103333),
('Relleno Extra', 500.00, 'Extra', 30103333);

-- Productos para Helados Dulces (Heladería)
INSERT INTO [Product] ([Name], [Price], [Category], [BusinessAssociate_Legal_Id])
VALUES 
('Helado de Vainilla', 2000.00, 'Postre', 30104444),
('Banana Split', 3500.00, 'Postre', 30104444),
('Malteada de Fresa', 2500.00, 'Bebida', 30104444),
('Sundae de Chocolate', 3000.00, 'Postre', 30104444),
('Waffle con Helado', 3800.00, 'Postre', 30104444),
('Café Helado', 2200.00, 'Bebida', 30104444),
('Topping Extra', 500.00, 'Extra', 30104444);

-- Productos para Burger Express (Comida Rápida)
INSERT INTO [Product] ([Name], [Price], [Category], [BusinessAssociate_Legal_Id])
VALUES 
('Papas Fritas', 1500.00, 'Entrada', 30105555),
('Hamburguesa Clásica', 3500.00, 'Plato principal', 30105555),
('Coca Cola', 1200.00, 'Bebida', 30105555),
('Hamburguesa con Queso', 4000.00, 'Plato principal', 30105555),
('Aros de Cebolla', 2000.00, 'Complemento', 30105555),
('Helado de Vainilla', 1000.00, 'Postre', 30105555),
('Queso Extra', 500.00, 'Extra', 30105555);

-- Fotos para los productos de Sabor Casero
INSERT INTO [ProductPhoto] ([Product_Code], [PhotoURL])
VALUES
-- Sopa de Pollo (Producto 1)
(1, 'https***3A***2F***2Fespeciasmontero***2Ecom***2Fwp-content***2Fuploads***2F2018***2F02***2FCaldoDePollo-1-500x500***2Ejpg'),
(1, 'https***3A***2F***2Fimag***2Ebonviveur***2Ecom***2Fsopa-de-pollo***2Ejpg'),
(1, 'https***3A***2F***2Fespeciasmontero***2Ecom***2Fwp-content***2Fuploads***2F2018***2F02***2FCaldoDePollo-1***2Ejpg'),
-- Casado con Pollo (Producto 2)
(2, 'https***3A***2F***2Fmedia-cdn.tripadvisor***2Ecom***2Fmedia***2Fphoto-s***2F19***2Fd5***2Fdd***2F52***2Fcasado-con-pollo***2Ejpg'),
(2, 'https***3A***2F***2Fmedia-cdn.tripadvisor***2Ecom***2Fmedia***2Fphoto-s***2F1c***2Fca***2Fb4***2F70***2Fcasado-con-pechuga-de***2Ejpg'),
(2, 'https***3A***2F***2Fmedia-cdn.tripadvisor***2Ecom***2Fmedia***2Fphoto-s***2F05***2F2f***2Fbf***2F4e***2Fcasado-with-pollo***2Ejpg'),
-- Gallo Pinto (Producto 3)
(3, 'https***3A***2F***2Fcomedera***2Ecom***2Fwp-content***2Fuploads***2Fsites***2F9***2F2022***2F10***2FGallo-pinto-de-Costa-Rica-shutterstock_1148861354***2Ejpg'),
(3, 'https***3A***2F***2Fnutritionstudies***2Eorg***2Fwp-content***2Fuploads***2F2022***2F05***2Fgallo-pinto-costa-rican-rice-and-beans***2Ejpg'),
(3, 'https***3A***2F***2Fwww***2Eexpogourmetmagazine***2Ecom***2Fuploads***2Ffotos_noticias***2F2023***2F06***2Fw800px_27770-217858-recetas-del-mundo-costa-rica-gallo-pinto***2Ejpg'),
-- Refresco Natural (Producto 4)
(4, 'https***3A***2F***2Fkaviapp***2Ecom***2Fwp-content***2Fuploads***2F2023***2F02***2FJugo-natural***2Ejpeg'),
-- Arroz con Leche (Producto 5)
(5, 'https***3A***2F***2Fwww***2Erecetasnestlecam***2Ecom***2Fsites***2Fdefault***2Ffiles***2Fsrh_recipes***2F667948856a0f2d2bc0112ed0a2d6a0f5***2Ejpg'),
(5, 'https***3A***2F***2Fwww***2Elaylita***2Ecom***2Frecetas***2Fwp-content***2Fuploads***2F2013***2F03***2FReceta-facil-del-arroz-con-leche***2Ejpg'),
-- Flan de Coco (Producto 6)
(6, 'https***3A***2F***2Fimag***2Ebonviveur***2Ecom***2Fflan-de-coco***2Ejpg'),
(6, 'https***3A***2F***2Fd1uz88p17r663j***2Ecloudfront***2Enet***2Foriginal***2F2d7ffbf145a60b4cc5d158802c73496d_Flan***2Ejpg'),
(6, 'https***3A***2F***2F7diasdesabor***2Ecom***2Fwp-content***2Fuploads***2F2022***2F11***2Fflan-de-coco-web***2Ejpg'),
-- Porción Extra de Aguacate (Producto 7)
(7, 'https***3A***2F***2Fwww***2Ecomebien***2Eclub***2Fuploads***2F8***2F8***2F8***2F5***2F8885007***2F20201007-142317_orig***2Ejpg'),
-- Fotos para los productos de Café Delicia
-- Emparedado (Producto 8)
(8, 'https***3A***2F***2Fbuenprovecho***2Ehn***2Fwp-content***2Fuploads***2F2019***2F01***2FiStock-24-1***2Ejpg'),
(8, 'https***3A***2F***2Fassets***2Eunileversolutions***2Ecom***2Frecipes-v2***2F238037***2Ejpg'),
(8, 'https***3A***2F***2Fd1uz88p17r663j***2Ecloudfront***2Enet***2Foriginal***2F393426b5a68626ecec6de82f8197bf69_emparedado-de-tiras-de-res***2Ejpg'),
-- Café Americano (Producto 9)
(9, 'https***3A***2F***2Fcdn***2Erecetasderechupete***2Ecom***2Fwp-content***2Fuploads***2F2023***2F11***2FCafe-americano-portada***2Ejpg'),
(9, 'https***3A***2F***2Fi***2Eblogs***2Ees***2F139e0f***2Fcafe-americano2***2F450_1000***2Ejpeg'),
-- Cappuccino (Producto 10)
(10, 'https***3A***2F***2Fupload***2Ewikimedia***2Eorg***2Fwikipedia***2Fcommons***2Fthumb***2Fc***2Fc8***2FCappuccino_at_Sightglass_Coffee***2Ejpg***2F800px-Cappuccino_at_Sightglass_Coffee***2Ejpg'),
(10, 'https***3A***2F***2Fdairyfarmersofcanada***2Eca***2Fsites***2Fdefault***2Ffiles***2Fimage_file_browser***2Fconso_recipe***2F2022***2FCapuccino***2Ejpg'),
-- Queque de Chocolate (Producto 11)
(11, 'https***3A***2F***2Fperudelights***2Ecom***2Fwp-content***2Fuploads***2F2013***2F09***2FChocolate-cake-12-1024x7682***2Ejpg'),
(11, 'https***3A***2F***2Fwww***2Enacarina***2Ecom***2Fwp-content***2Fuploads***2F2018***2F08***2Fblog_chocolate***2Ejpg'),
-- Galletas de Avena (Producto 12)
(12, 'https***3A***2F***2Fcdn0***2Erecetasgratis***2Enet***2Fes***2Fposts***2F3***2F0***2F3***2Fgalletas_de_avena_faciles_y_rapidas_67303_600_square***2Ejpg'),
(12, 'https***3A***2F***2Fmojo***2Egeneralmills***2Ecom***2Fapi***2Fpublic***2Fcontent***2FDghZOSz42kCwArruP2Z_IA_gmi_hi_res_jpeg***2Ejpeg'),
-- Té Verde (Producto 13)
(13, 'https***3A***2F***2Fs1***2Eelespanol***2Ecom***2F2015***2F03***2F12***2Fcocinillas***2Fcocinillas_17508326_115880908_1706x1280***2Ejpg'),
-- Leche Extra (Producto 14)
(14, 'https***3A***2F***2Fwalmartcr***2Evtexassets***2Ecom***2Farquivos***2Fids***2F723177***2F4310_01***2Ejpg'),
(14, 'https***3A***2F***2Fsula***2Ehn***2Fwp-content***2Fuploads***2F2020***2F02***2F01-leche-uht-extra-calcio-descremada-light-sula-946ml***2Ejpg'),
-- Fotos para los productos de Pan Fresco
-- Baguette (Producto 15)
(15, 'https***3A***2F***2Fhappyvegannie***2Ecom***2Fwp-content***2Fuploads***2F2023***2F06***2FIMG_0040_web_Thumbnail-Blog-1-500x375***2Ejpg'),
(15, 'https***3A***2F***2Fstatic01***2Enyt***2Ecom***2Fimages***2F2023***2F07***2F21***2Fmultimedia***2F21baguettesrex-hbkc***2F21baguettesrex-hbkc-superJumbo***2Ejpg'),
(15, 'https***3A***2F***2Fblog***2Eelamasadero***2Ecom***2Fwp-content***2Fuploads***2Fbaguette_700***2Ejpg'),
-- Croissant (Producto 16)
(16, 'https***3A***2F***2Fimag***2Ebonviveur***2Ecom***2Fcroissants***2Ejpg'),
(16, 'https***3A***2F***2Fimg***2Ehellofresh***2Ecom***2Ff_auto***2Cfl_lossy***2Ch_640***2Cq_auto***2Cw_1200***2Fhellofresh_s3***2Fimage***2F645af756cd93ab51c00178bc-15c2ff16***2Ejpg'),
(16, 'https***3A***2F***2Fes***2Ecravingsjournal***2Ecom***2Fwp-content***2Fuploads***2F2021***2F04***2Fcroissants-4-1***2Ejpg'),
-- Pan Integral (Producto 17)
(17, 'https***3A***2F***2Fassets***2Etmecosys***2Ecom***2Fimage***2Fupload***2Ft_web767x639***2Fimg***2Frecipe***2Fras***2FAssets***2Ff1ec1b78-4db1-45ac-9189-40619b7fad74***2FDerivates***2F2c238c6b-e380-486e-b9dc-39e41695a5ba***2Ejpg'),
(17, 'https***3A***2F***2Fcomedera***2Ecom***2Fwp-content***2Fuploads***2Fsites***2F9***2F2022***2F02***2Fpan-de-salvado_shutterstock_49768897***2Ejpg'),
(17, 'https***3A***2F***2Fs1***2Eelespanol***2Ecom***2F2023***2F06***2F14***2Fcocinillas***2Frecetas***2F771433771_233955143_1024x576***2Ejpg'),
-- Queque de Vainilla (Producto 18)
(18, 'https***3A***2F***2Fcdn0***2Erecetasgratis***2Enet***2Fes***2Fposts***2F0***2F8***2F3***2Fqueque_de_vainilla_tradicional_46380_600***2Ejpg'),
(18, 'https***3A***2F***2Fcdn***2Ebolivia***2Ecom***2Fgastronomia***2F2018***2F04***2F13***2Fqueque-de-vainilla-3579***2Ejpg'),
(18, 'https***3A***2F***2Fcocineroperu***2Ecom***2Fwp-content***2Fuploads***2F2015***2F12***2Fqueque-vainilla-1***2Ejpg'),
-- Café con Leche (Producto 19)
(19, 'https***3A***2F***2Fimag***2Ebonviveur***2Ecom***2Fcafe-con-leche***2Ejpg'),
(19, 'https***3A***2F***2Fwww***2Esplenda***2Ecom***2Fwp-content***2Fuploads***2F2023***2F02***2Fcafe-au-lait-scaled***2Ejpg'),
-- Empanada de Queso (Producto 20)
(20, 'https***3A***2F***2Fwww***2Egourmet***2Ecl***2Fwp-content***2Fuploads***2F2018***2F09***2Fempf9-1***2Ejpg-editada***2Ejpg'),
(20, 'https***3A***2F***2Fcdn***2Ebolivia***2Ecom***2Fgastronomia***2F2013***2F07***2F30***2Fempanadas-de-queso-para-api-3245***2Ejpg'),
-- Relleno Extra (Producto 21)
(21, 'https***3A***2F***2Fimg-global***2Ecpcdn***2Ecom***2Frecipes***2F1ba92ee1c531e819***2F680x482cq70***2Frellenos-para-empanadas-foto-principal***2Ejpg'),
(21, 'https***3A***2F***2Fi***2Eytimg***2Ecom***2Fvi***2FmeBXMOVSpXc***2Fhq720***2Ejpg'),
-- Fotos para los productos de Helados Dulces
-- Helado de Vainilla (Producto 22)
(22, 'https***3A***2F***2Fwww***2Egourmet***2Ecl***2Fwp-content***2Fuploads***2F2016***2F09***2FHelado_Vainilla-web-553x458***2Ejpg'),
(22, 'https***3A***2F***2Fwww***2Erecetasnestle***2Ecom***2Edo***2Fsites***2Fdefault***2Ffiles***2Fsrh_recipes***2F62099096785a3c939a1a1eefb06bf358***2Ejpg'),
(22, 'https***3A***2F***2Fcdn0***2Erecetasgratis***2Enet***2Fes***2Fposts***2F5***2F4***2F0***2Fhelado_de_vainilla_casero_74045_orig***2Ejpg'),
-- Banana Split (Producto 23)
(23, 'https***3A***2F***2Fwww***2Etwopeasandtheirpod***2Ecom***2Fwp-content***2Fuploads***2F2021***2F07***2Fbanana-split-9-500x375***2Ejpg'),
(23, 'https***3A***2F***2Fbsstatic2***2Emrjack***2Ees***2Fwp-content***2Fuploads***2F2020***2F06***2Fbanana-split-2***2Ejpg'),
(23, 'https***3A***2F***2Fsivarious***2Ecom***2Fwp-content***2Fuploads***2F2022***2F07***2Fbanana-split***2Ejpg'),
-- Malteada de Fresa (Producto 24)
(24, 'https***3A***2F***2Fsazonsula***2Ecom***2Fwp-content***2Fuploads***2F2022***2F07***2Freceta-malteada-de-fresas-sazon-sula***2Ejpg'),
-- Sundae de Chocolate (Producto 25)
(25, 'https***3A***2F***2Fwww***2Edeliaonline***2Ecom***2Fsites***2Fdefault***2Ffiles***2Fquick_media***2Fchocolate-hot-chocolate-fudge-sundae***2Ejpg'),
(25, 'https***3A***2F***2Fwww***2Eshutterstock***2Ecom***2Fshutterstock***2Fphotos***2F1204508716***2Fdisplay_1500***2Fstock-photo-chocolate-sundae-ice-cream-with-chocolate-syrup-in-cup-on-white-background-ice-cream-1204508716***2Ejpg'),
-- Waffle con Helado (Producto 26)
(26, 'https***3A***2F***2Ftiendasmartbrands***2Ecom***2Fcdn***2Fshop***2Farticles***2FWaffles_Belgas_con_Helado_Casero_de_Vainilla***2Ejpg'),
(26, 'https***3A***2F***2Fst***2Edepositphotos***2Ecom***2F1003272***2F4045***2Fi***2F450***2Fdepositphotos_40459209-stock-photo-belgium-waffles***2Ejpg'),
-- Café Helado (Producto 27)
(27, 'https***3A***2F***2Fimag***2Ebonviveur***2Ecom***2Fportada-cafe-helado***2Ejpg'),
(27, 'https***3A***2F***2Fwww***2Erecetaslider***2Ecl***2Fwp-content***2Fuploads***2F2021***2F06***2Fprincipal_5feb289d9adf7***2Ejpg'),
(27, 'https***3A***2F***2Fsukur***2Ees***2Fwp-content***2Fuploads***2F2023***2F11***2FBE-ICED-COFFEE-1370x550***2Ejpg'),
-- Topping Extra (Producto 28)
(28, 'https***3A***2F***2Ft1***2Euc***2Eltmcdn***2Ecom***2Fes***2Fposts***2F6***2F4***2F5***2Flos_mejores_toppings_para_helados_que_no_te_puedes_perder_este_verano_54546_orig***2Ejpg'),
-- Fotos para los productos de Burger Express
-- Papas Fritas (Producto 29)
(29, 'https***3A***2F***2Ftucarnetdemanipuladordealimentos***2Ecom***2Fwp-content***2Fuploads***2FPatatas-fritas-Papas-fritas-Chips-French-Fries***2Ejpg'),
(29, 'https***3A***2F***2Faceitesclover***2Ecom***2Fwp-content***2Fuploads***2F2021***2F04***2FPapas-fritas***2Ejpg'),
-- Hamburguesa Clásica (Producto 30)
(30, 'https***3A***2F***2Fassets***2Eunileversolutions***2Ecom***2Frecipes-v2***2F218401***2Ejpg'),
(30, 'https***3A***2F***2Fimag***2Ebonviveur***2Ecom***2Fhamburguesa-clasica***2Ejpg'),
-- Coca Cola (Producto 31)
(31, 'https***3A***2F***2Fwalmartcr***2Evtexassets***2Ecom***2Farquivos***2Fids***2F489222***2F4310_01***2Ejpg'),
(31, 'https***3A***2F***2Fwalmartcr***2Evtexassets***2Ecom***2Farquivos***2Fids***2F489206***2FGaseosa-Coca-Cola-Regular-Lata-354-ml-2-26337***2Ejpg'),
(31, 'https***3A***2F***2Fwalmartcr***2Evtexassets***2Ecom***2Farquivos***2Fids***2F564589***2FGaseosa-Coca-Cola-regular-355-ml-1-31801***2Ejpg'),
-- Hamburguesa con Queso (Producto 32)
(32, 'https***3A***2F***2Fassets***2Etmecosys***2Ecom***2Fimage***2Fupload***2Ft_web767x639***2Fimg***2Frecipe***2Fras***2FAssets***2F5b57547a8825f9fac531c7c39ab1e00e***2FDerivates***2F1536354e54be6f02ff4b3e9ede6e8e7ea487ab3d***2Ejpg'),
(32, 'https***3A***2F***2Fimag***2Ebonviveur***2Ecom***2Fcheeseburger***2Ejpg'),
(32, 'https***3A***2F***2Fcocina-casera***2Ecom***2Fwp-content***2Fuploads***2F2016***2F11***2Fhamburguesa-queso-receta***2Ejpg'),
-- Aros de Cebolla (Producto 33)
(33, 'https***3A***2F***2Fcdn7***2Ekiwilimon***2Ecom***2Frecetaimagen***2F14018***2F6392***2Ejpg'),
(33, 'https***3A***2F***2Fwww***2Emylatinatable***2Ecom***2Fwp-content***2Fuploads***2F2016***2F01***2Ffoto-heroe***2Ejpg'),
(33, 'https***3A***2F***2Fwww***2Epequerecetas***2Ecom***2Fwp-content***2Fuploads***2F2013***2F05***2Faros-de-cebolla-receta***2Ejpeg'),
-- Helado de Vainilla (Producto 34)
(34, 'https***3A***2F***2Fwww***2Egourmet***2Ecl***2Fwp-content***2Fuploads***2F2016***2F09***2FHelado_Vainilla-web-553x458***2Ejpg'),
(34, 'https***3A***2F***2Fwww***2Erecetasnestle***2Ecom***2Edo***2Fsites***2Fdefault***2Ffiles***2Fsrh_recipes***2F62099096785a3c939a1a1eefb06bf358***2Ejpg'),
(34, 'https***3A***2F***2Fcdn0***2Erecetasgratis***2Enet***2Fes***2Fposts***2F5***2F4***2F0***2Fhelado_de_vainilla_casero_74045_orig***2Ejpg'),
-- Queso Extra (Producto 35)
(35, 'https***3A***2F***2Florenzahamburguesas***2Ecom***2Fwp-content***2Fuploads***2F2022***2F07***2Fqueso-cheddar***2Ejpg');

-- Crear Carritos usando sp_CreateCart
EXEC sp_CreateCart @Client_Id = 2001;  -- Patricia
EXEC sp_CreateCart @Client_Id = 2001;  -- Patricia segundo carrito
EXEC sp_CreateCart @Client_Id = 2002;  -- Fernando
EXEC sp_CreateCart @Client_Id = 2002;  -- Fernando segundo carrito
EXEC sp_CreateCart @Client_Id = 2003;  -- Carmen
EXEC sp_CreateCart @Client_Id = 2003;  -- Carmen segundo carrito
EXEC sp_CreateCart @Client_Id = 2004;  -- Andrés
EXEC sp_CreateCart @Client_Id = 2004;  -- Andrés segundo carrito
EXEC sp_CreateCart @Client_Id = 2005;  -- Lucía
EXEC sp_CreateCart @Client_Id = 2005;  -- Lucía segundo carrito

-- Agregar productos a los carritos usando sp_CreateCartProduct
-- Carrito 1 - Patricia (Sabor Casero)
EXEC sp_CreateCartProduct @Cart_Code = 1, @Product_Code = 1;  -- Sopa de Pollo
EXEC sp_CreateCartProduct @Cart_Code = 1, @Product_Code = 2;  -- Casado con Pollo
EXEC sp_CreateCartProduct @Cart_Code = 1, @Product_Code = 4;  -- Refresco Natural

-- Carrito 2 - Patricia (Café Delicia)
EXEC sp_CreateCartProduct @Cart_Code = 2, @Product_Code = 8;   -- Emparedado
EXEC sp_CreateCartProduct @Cart_Code = 2, @Product_Code = 9;   -- Café Americano
EXEC sp_CreateCartProduct @Cart_Code = 2, @Product_Code = 9;   -- Café Americano (segundo)

-- Carrito 3 - Fernando (Pan Fresco)
EXEC sp_CreateCartProduct @Cart_Code = 3, @Product_Code = 15;  -- Pan Baguette
EXEC sp_CreateCartProduct @Cart_Code = 3, @Product_Code = 15;  -- Pan Baguette (segundo)
EXEC sp_CreateCartProduct @Cart_Code = 3, @Product_Code = 16;  -- Croissant
EXEC sp_CreateCartProduct @Cart_Code = 3, @Product_Code = 16;  -- Croissant (segundo)

-- Carrito 4 - Fernando (Helados Dulces)
EXEC sp_CreateCartProduct @Cart_Code = 4, @Product_Code = 22;  -- Helado de Vainilla
EXEC sp_CreateCartProduct @Cart_Code = 4, @Product_Code = 22;  -- Helado de Vainilla (segundo)
EXEC sp_CreateCartProduct @Cart_Code = 4, @Product_Code = 23;  -- Banana Split

-- Carrito 5 - Carmen (Burger Express)
EXEC sp_CreateCartProduct @Cart_Code = 5, @Product_Code = 29;  -- Papas Fritas
EXEC sp_CreateCartProduct @Cart_Code = 5, @Product_Code = 30;  -- Hamburguesa Clásica
EXEC sp_CreateCartProduct @Cart_Code = 5, @Product_Code = 31;  -- Coca Cola

-- Carrito 6 - Carmen (Sabor Casero)
EXEC sp_CreateCartProduct @Cart_Code = 6, @Product_Code = 1;   -- Sopa de Pollo
EXEC sp_CreateCartProduct @Cart_Code = 6, @Product_Code = 2;   -- Casado con Pollo
EXEC sp_CreateCartProduct @Cart_Code = 6, @Product_Code = 5;   -- Arroz con Leche

-- Carrito 7 - Andrés (Café Delicia)
EXEC sp_CreateCartProduct @Cart_Code = 7, @Product_Code = 8;   -- Emparedado
EXEC sp_CreateCartProduct @Cart_Code = 7, @Product_Code = 10;  -- Cappuccino
EXEC sp_CreateCartProduct @Cart_Code = 7, @Product_Code = 11;  -- Queque de Chocolate

-- Carrito 8 - Andrés (Pan Fresco)
EXEC sp_CreateCartProduct @Cart_Code = 8, @Product_Code = 15;  -- Pan Baguette
EXEC sp_CreateCartProduct @Cart_Code = 8, @Product_Code = 17;  -- Pan Integral
EXEC sp_CreateCartProduct @Cart_Code = 8, @Product_Code = 19;  -- Café con Leche

-- Carrito 9 - Lucía (Helados Dulces)
EXEC sp_CreateCartProduct @Cart_Code = 9, @Product_Code = 23;  -- Banana Split
EXEC sp_CreateCartProduct @Cart_Code = 9, @Product_Code = 24;  -- Malteada de Fresa
EXEC sp_CreateCartProduct @Cart_Code = 9, @Product_Code = 25;  -- Sundae de Chocolate

-- Carrito 10 - Lucía (Burger Express)
EXEC sp_CreateCartProduct @Cart_Code = 10, @Product_Code = 30; -- Hamburguesa Clásica
EXEC sp_CreateCartProduct @Cart_Code = 10, @Product_Code = 31; -- Coca Cola
EXEC sp_CreateCartProduct @Cart_Code = 10, @Product_Code = 33; -- Aros de Cebolla

-- Crear Órdenes usando sp_CreateOrder
EXEC sp_CreateOrder @State = 'Finalizado', @Client_Id = 2001, @FoodDeliveryMan_UserId = 'delivery1';
EXEC sp_CreateOrder @State = 'En camino', @Client_Id = 2001, @FoodDeliveryMan_UserId = 'delivery3';
EXEC sp_CreateOrder @State = 'Preparando', @Client_Id = 2002, @FoodDeliveryMan_UserId = 'delivery4';
EXEC sp_CreateOrder @State = 'Listo para envio', @Client_Id = 2002, @FoodDeliveryMan_UserId = 'delivery1';
EXEC sp_CreateOrder @State = 'Finalizado', @Client_Id = 2003, @FoodDeliveryMan_UserId = 'delivery3';
EXEC sp_CreateOrder @State = 'Cancelado', @Client_Id = 2003, @FoodDeliveryMan_UserId = NULL;
EXEC sp_CreateOrder @State = 'En camino', @Client_Id = 2004, @FoodDeliveryMan_UserId = 'delivery4';
EXEC sp_CreateOrder @State = 'Preparando', @Client_Id = 2004, @FoodDeliveryMan_UserId = 'delivery1';
EXEC sp_CreateOrder @State = 'Finalizado', @Client_Id = 2005, @FoodDeliveryMan_UserId = 'delivery3';
EXEC sp_CreateOrder @State = 'Listo para envio', @Client_Id = 2005, @FoodDeliveryMan_UserId = 'delivery4';

-- Agregar productos a las órdenes usando sp_CreateOrderProduct
-- Orden 1 - Patricia (Sabor Casero)
EXEC sp_CreateOrderProduct @Order_Code = 1, @Product_Code = 1;  -- Sopa de Pollo
EXEC sp_CreateOrderProduct @Order_Code = 1, @Product_Code = 2;  -- Casado con Pollo
EXEC sp_CreateOrderProduct @Order_Code = 1, @Product_Code = 4;  -- Refresco Natural

-- Orden 2 - Patricia (Café Delicia)
EXEC sp_CreateOrderProduct @Order_Code = 2, @Product_Code = 8;   -- Emparedado
EXEC sp_CreateOrderProduct @Order_Code = 2, @Product_Code = 9;   -- Café Americano (x2)
EXEC sp_CreateOrderProduct @Order_Code = 2, @Product_Code = 9;

-- Orden 3 - Fernando (Pan Fresco)
EXEC sp_CreateOrderProduct @Order_Code = 3, @Product_Code = 15;  -- Pan Baguette (x2)
EXEC sp_CreateOrderProduct @Order_Code = 3, @Product_Code = 15;
EXEC sp_CreateOrderProduct @Order_Code = 3, @Product_Code = 16;  -- Croissant (x2)
EXEC sp_CreateOrderProduct @Order_Code = 3, @Product_Code = 16;

-- Orden 4 - Fernando (Helados Dulces)
EXEC sp_CreateOrderProduct @Order_Code = 4, @Product_Code = 22;  -- Helado de Vainilla (x2)
EXEC sp_CreateOrderProduct @Order_Code = 4, @Product_Code = 22;  
EXEC sp_CreateOrderProduct @Order_Code = 4, @Product_Code = 23;  -- Banana Split

-- Orden 5 - Carmen (Burger Express)
EXEC sp_CreateOrderProduct @Order_Code = 5, @Product_Code = 29; -- Papas Fritas
EXEC sp_CreateOrderProduct @Order_Code = 5, @Product_Code = 30; -- Hamburguesa Clásica
EXEC sp_CreateOrderProduct @Order_Code = 5, @Product_Code = 31; -- Coca Cola

-- Orden 6 - Carmen (Sabor Casero)
EXEC sp_CreateOrderProduct @Order_Code = 6, @Product_Code = 1;  -- Sopa de Pollo
EXEC sp_CreateOrderProduct @Order_Code = 6, @Product_Code = 2;  -- Casado con Pollo
EXEC sp_CreateOrderProduct @Order_Code = 6, @Product_Code = 5;  -- Arroz con Leche

-- Orden 7 - Andrés (Café Delicia)
EXEC sp_CreateOrderProduct @Order_Code = 7, @Product_Code = 8;  -- Emparedado
EXEC sp_CreateOrderProduct @Order_Code = 7, @Product_Code = 10; -- Cappuccino
EXEC sp_CreateOrderProduct @Order_Code = 7, @Product_Code = 11; -- Queque de Chocolate

-- Orden 8 - Andrés (Pan Fresco)
EXEC sp_CreateOrderProduct @Order_Code = 8, @Product_Code = 15; -- Pan Baguette
EXEC sp_CreateOrderProduct @Order_Code = 8, @Product_Code = 17; -- Pan Integral
EXEC sp_CreateOrderProduct @Order_Code = 8, @Product_Code = 19; -- Café con Leche

-- Orden 9 - Lucía (Helados Dulces)
EXEC sp_CreateOrderProduct @Order_Code = 9, @Product_Code = 23; -- Banana Split
EXEC sp_CreateOrderProduct @Order_Code = 9, @Product_Code = 24; -- Malteada de Fresa
EXEC sp_CreateOrderProduct @Order_Code = 9, @Product_Code = 25; -- Sundae de Chocolate

-- Orden 10 - Lucía (Burger Express)
EXEC sp_CreateOrderProduct @Order_Code = 10, @Product_Code = 30; -- Hamburguesa Clásica
EXEC sp_CreateOrderProduct @Order_Code = 10, @Product_Code = 31; -- Coca Cola
EXEC sp_CreateOrderProduct @Order_Code = 10, @Product_Code = 33; -- Aros de Cebolla

-- Crear ProofOfPayment para todas las órdenes
-- Orden 1 - Patricia (Finalizado)
EXEC sp_CreateProofOfPayment 
    @CreditCardName = 'PATRICIA MENDEZ A',
    @LastDigitsCreditCard = 1234,
    @Date = '14-03-2024',
    @Time = '12:30',
    @Order_Code = 1;

-- Orden 2 - Patricia (En camino)
EXEC sp_CreateProofOfPayment 
    @CreditCardName = 'PATRICIA MENDEZ A',
    @LastDigitsCreditCard = 1234,
    @Date = '15-03-2024',
    @Time = '13:45',
    @Order_Code = 2;

-- Orden 3 - Fernando (Preparando)
EXEC sp_CreateProofOfPayment 
    @CreditCardName = 'FERNANDO BONILLA CH',
    @LastDigitsCreditCard = 5678,
    @Date = '16-03-2024',
    @Time = '14:15',
    @Order_Code = 3;

-- Orden 4 - Fernando (Listo para envió)
EXEC sp_CreateProofOfPayment 
    @CreditCardName = 'FERNANDO BONILLA CH',
    @LastDigitsCreditCard = 5678,
    @Date = '17-03-2024',
    @Time = '15:00',
    @Order_Code = 4;

-- Orden 5 - Carmen (Finalizado)
EXEC sp_CreateProofOfPayment 
    @CreditCardName = 'CARMEN VILLALOBOS P',
    @LastDigitsCreditCard = 9012,
    @Date = '18-03-2024',
    @Time = '15:30',
    @Order_Code = 5;

-- Orden 6 - Carmen (Cancelado)
EXEC sp_CreateProofOfPayment 
    @CreditCardName = 'CARMEN VILLALOBOS P',
    @LastDigitsCreditCard = 9012,
    @Date = '19-03-2024',
    @Time = '16:00',
    @Order_Code = 6;

-- Orden 7 - Andrés (En camino)
EXEC sp_CreateProofOfPayment 
    @CreditCardName = 'ANDRES MOLINA S',
    @LastDigitsCreditCard = 3456,
    @Date = '20-03-2024',
    @Time = '16:30',
    @Order_Code = 7;

-- Orden 8 - Andrés (Preparando)
EXEC sp_CreateProofOfPayment 
    @CreditCardName = 'ANDRES MOLINA S',
    @LastDigitsCreditCard = 3456,
    @Date = '21-03-2024',
    @Time = '17:00',
    @Order_Code = 8;

-- Orden 9 - Lucía (Finalizado)
EXEC sp_CreateProofOfPayment 
    @CreditCardName = 'LUCIA CORDERO M',
    @LastDigitsCreditCard = 7890,
    @Date = '22-03-2024',
    @Time = '17:30',
    @Order_Code = 9;

-- Orden 10 - Lucía (Listo para envió)
EXEC sp_CreateProofOfPayment 
    @CreditCardName = 'LUCIA CORDERO M',
    @LastDigitsCreditCard = 7890,
    @Date = '23-03-2024',
    @Time = '18:00',
    @Order_Code = 10;

-- Crear FeedBack para órdenes finalizadas
-- Orden 1 - Patricia (Sabor Casero)
EXEC sp_CreateFeedBack 
    @FeedBack_Business = 'Excelente servicio y comida deliciosa',
    @BusinessGrade = 4.8,
    @FeedBack_Order = 'La orden llegó caliente y bien presentada',
    @OrderGrade = 5.0,
    @FeedBack_DeliveryMan = 'Muy amable y puntual',
    @DeliveryManGrade = 4.9,
    @FoodDeliveryMan_UserId = 'delivery1',
    @Order_Code = 1,
    @BusinessAssociate_Legal_Id = 30101111;

-- Orden 5 - Carmen (Burger Express)
EXEC sp_CreateFeedBack 
    @FeedBack_Business = 'Buena hamburguesa, papas un poco frías',
    @BusinessGrade = 4.0,
    @FeedBack_Order = 'Entrega rápida',
    @OrderGrade = 4.5,
    @FeedBack_DeliveryMan = 'Servicio eficiente',
    @DeliveryManGrade = 4.7,
    @FoodDeliveryMan_UserId = 'delivery3',
    @Order_Code = 5,
    @BusinessAssociate_Legal_Id = 30105555;

-- Orden 9 - Lucía (Helados Dulces)
EXEC sp_CreateFeedBack 
    @FeedBack_Business = 'Los helados llegaron en perfecto estado',
    @BusinessGrade = 4.9,
    @FeedBack_Order = 'Todo correcto con el pedido',
    @OrderGrade = 4.8,
    @FeedBack_DeliveryMan = 'Excelente actitud del repartidor',
    @DeliveryManGrade = 5.0,
    @FoodDeliveryMan_UserId = 'delivery3',
    @Order_Code = 9,
    @BusinessAssociate_Legal_Id = 30104444;