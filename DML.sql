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
(2001, 'client1', 'Patricia', 'Méndez', 'Araya', 'San José', 'Montes de Oca', 'San Pedro', 'pass301', 66661111, '1990-05-15'),
(2002, 'client2', 'Fernando', 'Bonilla', 'Chaves', 'Alajuela', 'Atenas', 'Central', 'pass302', 66662222, '1988-08-22'),
(2003, 'client3', 'Carmen', 'Villalobos', 'Pérez', 'Cartago', 'Paraíso', 'Central', 'pass303', 66663333, '1995-03-10'),
(2004, 'client4', 'Andrés', 'Molina', 'Sáenz', 'Heredia', 'Belén', 'San Antonio', 'pass304', 66664444, '1992-11-28'),
(2005, 'client5', 'Lucía', 'Cordero', 'Mata', 'San José', 'Moravia', 'San Vicente', 'pass305', 66665555, '1993-07-19');

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
(1, 'https://especiasmontero.com/wp-content/uploads/2018/02/CaldoDePollo-1-500x500.jpg'),
(1, 'https://imag.bonviveur.com/sopa-de-pollo.jpg'),
(1, 'https://especiasmontero.com/wp-content/uploads/2018/02/CaldoDePollo-1.jpg'),
-- Casado con Pollo (Producto 2)
(2, 'https://media-cdn.tripadvisor.com/media/photo-s/19/d5/dd/52/casado-con-pollo.jpg'),
(2, 'https://media-cdn.tripadvisor.com/media/photo-s/1c/ca/b4/70/casado-con-pechuga-de.jpg'),
(2, 'https://alimentatedelobueno.com/storage/786/casado.png'),
-- Gallo Pinto (Producto 3)
(3, 'https://comedera.com/wp-content/uploads/sites/9/2022/10/Gallo-pinto-de-Costa-Rica-shutterstock_1148861354.jpg'),
(3, 'https://nutritionstudies.org/wp-content/uploads/2022/05/gallo-pinto-costa-rican-rice-and-beans.jpg'),
(3, 'https://laroussecocina.mx/wp-content/uploads/2020/09/gallo_pinto_-_Google_Search.png.webp'),
-- Refresco Natural (Producto 4)
(4, 'https://kaviapp.com/wp-content/uploads/2023/02/Jugo-natural.jpeg'),
(4, 'https://www.acquajet.com/wp-content/uploads/2022/03/pb-zumos-nat.jpg'),
(4, 'https://thumbs.dreamstime.com/b/refresco-natural-exquisito-jugo-de-naranja-con-madera-en-la-fotograf%C3%ADa-roca-para-los-amantes-del-c%C3%ADtrico-disfrute-placer-nuestro-279302592.jpg'),
-- Arroz con Leche (Producto 5)
(5, 'https://www.recetasnestlecam.com/sites/default/files/srh_recipes/667948856a0f2d2bc0112ed0a2d6a0f5.jpg'),
(5, 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/A4F055C9-D340-4F2A-9015-6A2659851E84/Derivates/5b9a24d1-7748-4bfe-ba63-fb3e5f722db0.jpg'),
(5, 'https://www.laylita.com/recetas/wp-content/uploads/2013/03/Receta-facil-del-arroz-con-leche.jpg'),
-- Flan de Coco (Producto 6)
(6, 'https://imag.bonviveur.com/flan-de-coco.jpg'),
(6, 'https://d1uz88p17r663j.cloudfront.net/original/2d7ffbf145a60b4cc5d158802c73496d_Flan.jpg'),
(6, 'https://7diasdesabor.com/wp-content/uploads/2022/11/flan-de-coco-web.jpg'),
-- Porción Extra de Aguacate (Producto 7)
(7, 'https://laposadadelarriero.com.co/wp-content/uploads/2021/08/Porcion-de-aguacate.jpg'),
(7, 'https://www.comebien.club/uploads/8/8/8/5/8885007/20201007-142317_orig.jpg'),
(7, 'https://s1.elespanol.com/2019/07/18/como/agua-aguacate-como_hacer_414720664_129236705_1706x1280.jpg'),

-- Fotos para los productos de Café Delicia
-- Emparedado (Producto 8)
(8, 'https://d1uz88p17r663j.cloudfront.net/original/b285f1ac27d92b79d5392a4755980d7b_55.png'),
(8, 'https://assets.unileversolutions.com/recipes-v2/238037.jpg'),
(8, 'https://d1uz88p17r663j.cloudfront.net/original/393426b5a68626ecec6de82f8197bf69_emparedado-de-tiras-de-res.jpg'),
-- Café Americano (Producto 9)
(9, 'https://www.somoselcafe.com.ar/img/novedades/47.jpg'),
(9, 'https://cdn.recetasderechupete.com/wp-content/uploads/2023/11/Cafe-americano-portada.jpg'),
(9, 'https://i.blogs.es/139e0f/cafe-americano2/450_1000.jpeg'),
-- Cappuccino (Producto 10)
(10, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Cappuccino_at_Sightglass_Coffee.jpg/800px-Cappuccino_at_Sightglass_Coffee.jpg'),
(10, 'https://dairyfarmersofcanada.ca/sites/default/files/image_file_browser/conso_recipe/2022/Capuccino.jpg'),
(10, 'https://cafefabrique.com/cdn/shop/articles/Cappuccino.jpg'),
-- Queque de Chocolate (Producto 11)
(11, 'https://perudelights.com/wp-content/uploads/2013/09/Chocolate-cake-12-1024x7682.jpg'),
(11, 'https://www.nacarina.com/wp-content/uploads/2018/08/blog_chocolate.jpg'),
(11, 'https://s1.ppllstatics.com/canarias7/www/multimedia/2024/03/13/foto%20final.jpg'),
-- Galletas de Avena (Producto 12)
(12, 'https://cdn0.recetasgratis.net/es/posts/3/0/3/galletas_de_avena_faciles_y_rapidas_67303_600_square.jpg'),
(12, 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4rZZqJb1yTazJlzUJ7pr6txQztfXMc9NrEHQem9kjmnUKXYquuUxwfJOK3XqFw8fd7ZJhGtFK3dLt1Y-9tJHyzrxW-tC24TdtS6FKF4CihyphenhyphenUzivwR7XAebd__p-98iCi3JvYtQZTaUcHv/s1600-rw/galletas-avena-facil.JPG'),
(12, 'https://mojo.generalmills.com/api/public/content/DghZOSz42kCwArruP2Z_IA_gmi_hi_res_jpeg.jpeg?v=82b033ff&t=16e3ce250f244648bef28c5949fb99ff'),
-- Té Verde (Producto 13)
(13, 'https://image.tuasaude.com/media/article/yp/dt/beneficios-del-te-verde_17350_l.jpg'),
(13, 'https://cdn.teamarket.co/wp-content/uploads/2019/10/como-preparar-te-verde-300x249.png'),
(13, 'https://s1.elespanol.com/2015/03/12/cocinillas/cocinillas_17508326_115880908_1706x1280.jpg'),
-- Leche Extra (Producto 14)
(14, 'https://walmartcr.vtexassets.com/arquivos/ids/723177/4310_01.jpg'),
(14, 'https://mercaditolalomahn.com/wp-content/uploads/2020/09/LECHE-EXTRA-CALCIO-DOS-PINOS-1-LT.png'),
(14, 'https://sula.hn/wp-content/uploads/2020/02/01-leche-uht-extra-calcio-descremada-light-sula-946ml.jpg'),

-- Fotos para los productos de Pan Fresco
-- Baguette (Producto 15)
(15, 'https://happyvegannie.com/wp-content/uploads/2023/06/IMG_0040_web_Thumbnail-Blog-1-500x375.jpg'),
(15, 'https://static01.nyt.com/images/2023/07/21/multimedia/21baguettesrex-hbkc/21baguettesrex-hbkc-superJumbo.jpg'),
(15, 'https://blog.elamasadero.com/wp-content/uploads/baguette_700.jpg'),
-- Croissant (Producto 16)
(16, 'https://imag.bonviveur.com/croissants.jpg'),
(16, 'https://img.hellofresh.com/f_auto,fl_lossy,h_640,q_auto,w_1200/hellofresh_s3/image/645af756cd93ab51c00178bc-15c2ff16.jpg'),
(16, 'https://es.cravingsjournal.com/wp-content/uploads/2021/04/croissants-4-1.jpg'),
-- Pan Integral (Producto 17)
(17, 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/f1ec1b78-4db1-45ac-9189-40619b7fad74/Derivates/2c238c6b-e380-486e-b9dc-39e41695a5ba.jpg'),
(17, 'https://mandolina.co/wp-content/uploads/2023/06/pan-integral-1200x720.png'),
(17, 'https://s1.elespanol.com/2023/06/14/cocinillas/recetas/771433771_233955143_1024x576.jpg'),
-- Queque de Vainilla (Producto 18)
(18, 'https://cdn0.recetasgratis.net/es/posts/0/8/3/queque_de_vainilla_tradicional_46380_600.jpg'),
(18, 'https://cdn.bolivia.com/gastronomia/2018/04/13/queque-de-vainilla-3579.jpg'),
(18, 'https://cocineroperu.com/wp-content/uploads/2015/12/queque-vainilla-1.jpg'),
-- Café con Leche (Producto 19)
(19, 'https://i.blogs.es/421374/cafe-con-leche2/1366_2000.jpg'),
(19, 'https://imag.bonviveur.com/cafe-con-leche.jpg'),
(19, 'https://www.splenda.com/wp-content/uploads/2023/02/cafe-au-lait-scaled.jpg'),
-- Empanada de Queso (Producto 20)
(20, 'https://i.blogs.es/eb58d2/empanadas-de-queso-2-/650_1200.jpg'),
(20, 'https://www.gourmet.cl/wp-content/uploads/2018/09/empf9-1.jpg-editada.jpg'),
(20, 'https://cdn.bolivia.com/gastronomia/2013/07/30/empanadas-de-queso-para-api-3245.jpg'),
-- Relleno Extra (Producto 21)
(21, 'https://img-global.cpcdn.com/recipes/1ba92ee1c531e819/680x482cq70/rellenos-para-empanadas-foto-principal.jpg'),
(21, 'https://i.ytimg.com/vi/meBXMOVSpXc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCMi43Gea2m9fl-TCAjIEJxlPtPRg'),
(21, 'https://www.cocinadominicana.com/wp-content/uploads/2021/08/relleno-chorizo-empanadas-ClaraGon1038.jpg'),

-- Fotos para los productos de Helados Dulces
-- Helado de Vainilla (Producto 22)
(22, 'https://www.gourmet.cl/wp-content/uploads/2016/09/Helado_Vainilla-web-553x458.jpg'),
(22, 'https://www.recetasnestle.com.do/sites/default/files/srh_recipes/62099096785a3c939a1a1eefb06bf358.jpg'),
(22, 'https://cdn0.recetasgratis.net/es/posts/5/4/0/helado_de_vainilla_casero_74045_orig.jpg'),
-- Banana Split (Producto 23)
(23, 'https://www.twopeasandtheirpod.com/wp-content/uploads/2021/07/banana-split-9-500x375.jpg'),
(23, 'https://bsstatic2.mrjack.es/wp-content/uploads/2020/06/banana-split-2.jpg'),
(23, 'https://sivarious.com/wp-content/uploads/2022/07/banana-split.jpg'),
-- Malteada de Fresa (Producto 23)
(24, 'https://sazonsula.com/wp-content/uploads/2022/07/receta-malteada-de-fresas-sazon-sula.jpg'),
(24, 'https://www.recetasnestle.com.co/sites/default/files/srh_recipes/23829ccf3c8af248298c5f91d95aa3ba.jpg'),
(24, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST7P5N3EpQCddBEr5D0QOy6lJ773WfBuFAig&s'),
-- Sundae de Chocolate (Producto 24)
(25, 'https://mcdonalds.es/api/cms/images/mcdonalds-es/ZkZaMSol0Zci9OJU_1080x943_Postres_Sundae_Chocolate-1-.png'),
(25, 'https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$sundae-chocolate.png'),
(25, 'https://www.shutterstock.com/shutterstock/photos/1204508716/display_1500/stock-photo-chocolate-sundae-ice-cream-with-chocolate-syrup-in-cup-on-white-background-ice-cream-1204508716.jpg'),
-- Waffle con Helado (Producto 25)
(26, 'https://tiendasmartbrands.com/cdn/shop/articles/Waffles_Belgas_con_Helado_Casero_de_Vainilla.jpg'),
(26, 'https://yayaya.com.ec/wp-content/uploads/2021/07/waffle-con-helado-y-salsa-de-chocolate-1.jpg'),
(26, 'https://cremhelado.com.co/wp-content/uploads/2023/05/waffles-con-helado.webp'),
-- Café Helado (Producto 26)
(27, 'https://imag.bonviveur.com/portada-cafe-helado.jpg'),
(27, 'https://www.recetaslider.cl/wp-content/uploads/2021/06/principal_5feb289d9adf7.jpg'),
(27, 'https://images.mrcook.app/recipe-image/01914c7f-5e21-7f47-96a9-3cfead557429'),
-- Topping Extra (Producto 27)
(28, 'https://t1.uc.ltmcdn.com/es/posts/6/4/5/los_mejores_toppings_para_helados_que_no_te_puedes_perder_este_verano_54546_orig.jpg'),
(28, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1auPcoO_Z9BH7xIh654UakUfbSJZAJk41tg&s'),

-- Fotos para los productos de Burger Express
-- Papas Fritas (Producto 29)
(29, 'https://www.infobae.com/new-resizer/LE2n7cFqRWg-ffWLFzBaYNNb5G8=/arc-anglerfish-arc2-prod-infobae/public/BR3663HJBBB67BQO4UYAYTAFHQ.png'),
(29, 'https://mejorconsalud.as.com/wp-content/uploads/2013/07/patatas-fritas-.jpg'),
(29, 'https://aceitesclover.com/wp-content/uploads/2021/04/Papas-fritas.jpg'),
-- Hamburguesa Clásica (Producto 30)
(30, 'https://assets.unileversolutions.com/recipes-v2/218401.jpg'),
(30, 'https://imag.bonviveur.com/hamburguesa-clasica.jpg'),
(30, 'https://resizer.glanacion.com/resizer/v2/hamburguesa-FHBQ5XJM55H2PFSAFSC6HHESVQ.jpg'),
-- Coca Cola (Producto 31)
(31, 'https://walmartcr.vtexassets.com/arquivos/ids/489222/Gaseosa-Coca-Cola-regular-3-L-2-26374.jpg'),
(31, 'https://walmartcr.vtexassets.com/arquivos/ids/489206/Gaseosa-Coca-Cola-Regular-Lata-354-ml-2-26337.jpg'),
(31, 'https://walmartcr.vtexassets.com/arquivos/ids/564589/Gaseosa-Coca-Cola-regular-355-ml-1-31801.jpg'),
-- Hamburguesa con Queso (Producto 32)
(32, 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/5b57547a8825f9fac531c7c39ab1e00e/Derivates/1536354e54be6f02ff4b3e9ede6e8e7ea487ab3d.jpg'),
(32, 'https://imag.bonviveur.com/cheeseburger.jpg'),
(32, 'https://cocina-casera.com/wp-content/uploads/2016/11/hamburguesa-queso-receta.jpg'),
-- Aros de Cebolla (Producto 33)
(33, 'https://cdn7.kiwilimon.com/recetaimagen/14018/6392.jpg'),
(33, 'https://www.mylatinatable.com/wp-content/uploads/2016/01/foto-heroe.jpg'),
(33, 'https://www.pequerecetas.com/wp-content/uploads/2013/05/aros-de-cebolla-receta.jpeg'),
-- Helado de Vainilla (Producto 34)
(34, 'https://www.gourmet.cl/wp-content/uploads/2016/09/Helado_Vainilla-web-553x458.jpg'),
(34, 'https://www.recetasnestle.com.do/sites/default/files/srh_recipes/62099096785a3c939a1a1eefb06bf358.jpg'),
(34, 'https://cdn0.recetasgratis.net/es/posts/5/4/0/helado_de_vainilla_casero_74045_orig.jpg'),
-- Queso Extra (Producto 35)
(35, 'https://oleofinos.com.mx/img/productos/olfilac-extra-1.jpg'),
(35, 'https://lorenzahamburguesas.com/wp-content/uploads/2022/07/queso-cheddar.jpg'),
(35, 'https://correos-marketplace.ams3.cdn.digitaloceanspaces.com/prod-new/uploads/correos-marketplace-shop/1/product/82915-csq3m0iv-queseria-artesanal-el-palancar-queso-curado-en-aceite-virgen-extra-ecologico-950-g-3.jpg');

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