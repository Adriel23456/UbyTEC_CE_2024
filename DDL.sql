---------------Funciones de creacion de la base de datos en general----------
GO
CREATE TABLE [Admin] (
    [Id] bigint NOT NULL,
    [Name] nvarchar(max) NOT NULL,
    [FirstSurname] nvarchar(max) NOT NULL,
    [SecondSurname] nvarchar(max) NOT NULL,
    [FullName] AS [Name] + ' ' + [FirstSurname] + ' ' + [SecondSurname] PERSISTED,
    [Province] nvarchar(max) NOT NULL,
    [Canton] nvarchar(max) NOT NULL,
    [District] nvarchar(max) NOT NULL,
    [Direction] AS [Province] + ', ' + [Canton] + ', ' + [District] PERSISTED,
    [UserId] nvarchar(450) NOT NULL,
    [Password] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Admin] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [BusinessManager] (
    [Email] nvarchar(450) NOT NULL,
    [Name] nvarchar(max) NOT NULL,
    [FirstSurname] nvarchar(max) NOT NULL,
    [SecondSurname] nvarchar(max) NOT NULL,
    [FullName] AS [Name] + ' ' + [FirstSurname] + ' ' + [SecondSurname] PERSISTED,
    [Province] nvarchar(max) NOT NULL,
    [Canton] nvarchar(max) NOT NULL,
    [District] nvarchar(max) NOT NULL,
    [Direction] AS [Province] + ', ' + [Canton] + ', ' + [District] PERSISTED,
    [UserId] nvarchar(450) NOT NULL,
    [Password] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_BusinessManager] PRIMARY KEY ([Email])
);
GO

CREATE TABLE [BusinessType] (
    [Identification] bigint NOT NULL IDENTITY,
    [Name] nvarchar(450) NOT NULL,
    CONSTRAINT [PK_BusinessType] PRIMARY KEY ([Identification])
);
GO

CREATE TABLE [Client] (
    [Id] bigint NOT NULL,
    [UserId] nvarchar(450) NOT NULL,
    [Name] nvarchar(max) NOT NULL,
    [FirstSurname] nvarchar(max) NOT NULL,
    [SecondSurname] nvarchar(max) NOT NULL,
    [FullName] AS [Name] + ' ' + [FirstSurname] + ' ' + [SecondSurname] PERSISTED,
    [Province] nvarchar(max) NOT NULL,
    [Canton] nvarchar(max) NOT NULL,
    [District] nvarchar(max) NOT NULL,
    [Direction] AS [Province] + ', ' + [Canton] + ', ' + [District] PERSISTED,
    [Password] nvarchar(max) NOT NULL,
    [Phone] bigint NOT NULL,
    [BirthDate] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Client] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [FoodDeliveryMan] (
    [UserId] nvarchar(450) NOT NULL,
    [Name] nvarchar(max) NOT NULL,
    [FirstSurname] nvarchar(max) NOT NULL,
    [SecondSurname] nvarchar(max) NOT NULL,
    [FullName] AS [Name] + ' ' + [FirstSurname] + ' ' + [SecondSurname] PERSISTED,
    [Province] nvarchar(max) NOT NULL,
    [Canton] nvarchar(max) NOT NULL,
    [District] nvarchar(max) NOT NULL,
    [Direction] AS [Province] + ', ' + [Canton] + ', ' + [District] PERSISTED,
    [Password] nvarchar(max) NOT NULL,
    [State] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_FoodDeliveryMan] PRIMARY KEY ([UserId])
);
GO

CREATE TABLE [AdminPhone] (
    [Admin_id] bigint NOT NULL,
    [Phone] bigint NOT NULL,
    CONSTRAINT [PK_AdminPhone] PRIMARY KEY ([Admin_id], [Phone]),
    CONSTRAINT [FK_AdminPhone_Admin_Admin_id] FOREIGN KEY ([Admin_id]) REFERENCES [Admin] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [BusinessManagerPhone] (
    [BusinessManager_Email] nvarchar(450) NOT NULL,
    [Phone] bigint NOT NULL,
    CONSTRAINT [PK_BusinessManagerPhone] PRIMARY KEY ([BusinessManager_Email], [Phone]),
    CONSTRAINT [FK_BusinessManagerPhone_BusinessManager_BusinessManager_Email] FOREIGN KEY ([BusinessManager_Email]) REFERENCES [BusinessManager] ([Email]) ON DELETE CASCADE
);
GO

CREATE TABLE [BusinessAssociate] (
    [Legal_Id] bigint NOT NULL,
    [Email] nvarchar(max) NOT NULL,
    [State] nvarchar(max) NOT NULL,
    [BusinessName] nvarchar(max) NOT NULL,
    [Direction] AS [Province] + ', ' + [Canton] + ', ' + [District] PERSISTED,
    [Province] nvarchar(max) NOT NULL,
    [Canton] nvarchar(max) NOT NULL,
    [District] nvarchar(max) NOT NULL,
    [SINPE] bigint NOT NULL,
    [RejectReason] nvarchar(max) NULL,
    [BusinessManager_Email] nvarchar(450) NOT NULL,
    [BusinessType_Identification] bigint NOT NULL,
    CONSTRAINT [PK_BusinessAssociate] PRIMARY KEY ([Legal_Id]),
    CONSTRAINT [FK_BusinessAssociate_BusinessManager_BusinessManager_Email] FOREIGN KEY ([BusinessManager_Email]) REFERENCES [BusinessManager] ([Email]) ON DELETE CASCADE,
    CONSTRAINT [FK_BusinessAssociate_BusinessType_BusinessType_Identification] FOREIGN KEY ([BusinessType_Identification]) REFERENCES [BusinessType] ([Identification]) ON DELETE CASCADE
);
GO

CREATE TABLE [Cart] (
    [Code] bigint NOT NULL IDENTITY,
    [BusinessAssociate_Legal_Id] bigint NULL,
    [TotalProductsPrice] decimal(18,2) NULL,
    [Client_Id] bigint NOT NULL,
    CONSTRAINT [PK_Cart] PRIMARY KEY ([Code]),
    CONSTRAINT [FK_Cart_Client_Client_Id] FOREIGN KEY ([Client_Id]) REFERENCES [Client] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [FoodDeliveryManPhone] (
    [FoodDeliveryMan_UserId] nvarchar(450) NOT NULL,
    [Phone] bigint NOT NULL,
    CONSTRAINT [PK_FoodDeliveryManPhone] PRIMARY KEY ([FoodDeliveryMan_UserId], [Phone]),
    CONSTRAINT [FK_FoodDeliveryManPhone_FoodDeliveryMan_FoodDeliveryMan_UserId] FOREIGN KEY ([FoodDeliveryMan_UserId]) REFERENCES [FoodDeliveryMan] ([UserId]) ON DELETE CASCADE
);
GO

CREATE TABLE [Order] (
    [Code] bigint NOT NULL IDENTITY,
    [State] nvarchar(max) NOT NULL,
    [TotalService] decimal(18,2) NULL,
    [Direction] nvarchar(max) NULL,
    [Client_Id] bigint NOT NULL,
    [FoodDeliveryMan_UserId] nvarchar(450) NULL,
    CONSTRAINT [PK_Order] PRIMARY KEY ([Code]),
    CONSTRAINT [FK_Order_Client_Client_Id] FOREIGN KEY ([Client_Id]) REFERENCES [Client] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_Order_FoodDeliveryMan_FoodDeliveryMan_UserId] FOREIGN KEY ([FoodDeliveryMan_UserId]) REFERENCES [FoodDeliveryMan] ([UserId])
);
GO

CREATE TABLE [BusinessAssociatePhone] (
    [BusinessAssociate_Legal_Id] bigint NOT NULL,
    [Phone] bigint NOT NULL,
    CONSTRAINT [PK_BusinessAssociatePhone] PRIMARY KEY ([BusinessAssociate_Legal_Id], [Phone]),
    CONSTRAINT [FK_BusinessAssociatePhone_BusinessAssociate_BusinessAssociate_Legal_Id] FOREIGN KEY ([BusinessAssociate_Legal_Id]) REFERENCES [BusinessAssociate] ([Legal_Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [Product] (
    [Code] bigint NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [Price] decimal(18,2) NOT NULL,
    [Category] nvarchar(max) NOT NULL,
    [BusinessAssociate_Legal_Id] bigint NOT NULL,
    CONSTRAINT [PK_Product] PRIMARY KEY ([Code]),
    CONSTRAINT [FK_Product_BusinessAssociate_BusinessAssociate_Legal_Id] FOREIGN KEY ([BusinessAssociate_Legal_Id]) REFERENCES [BusinessAssociate] ([Legal_Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [FeedBack] (
    [Id] bigint NOT NULL IDENTITY,
    [FeedBack_Business] nvarchar(max) NOT NULL,
    [BusinessGrade] float NOT NULL,
    [FeedBack_Order] nvarchar(max) NOT NULL,
    [OrderGrade] float NOT NULL,
    [FeedBack_DeliveryMan] nvarchar(max) NOT NULL,
    [DeliveryManGrade] float NOT NULL,
    [FoodDeliveryMan_UserId] nvarchar(450) NOT NULL,
    [Order_Code] bigint NOT NULL,
    [BusinessAssociate_Legal_Id] bigint NOT NULL,
    CONSTRAINT [PK_FeedBack] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_FeedBack_BusinessAssociate_BusinessAssociate_Legal_Id] FOREIGN KEY ([BusinessAssociate_Legal_Id]) REFERENCES [BusinessAssociate] ([Legal_Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_FeedBack_FoodDeliveryMan_FoodDeliveryMan_UserId] FOREIGN KEY ([FoodDeliveryMan_UserId]) REFERENCES [FoodDeliveryMan] ([UserId]) ON DELETE NO ACTION,
    CONSTRAINT [FK_FeedBack_Order_Order_Code] FOREIGN KEY ([Order_Code]) REFERENCES [Order] ([Code]) ON DELETE NO ACTION
);
GO

CREATE TABLE [ProofOfPayment] (
    [Code] bigint NOT NULL IDENTITY,
    [CreditCardName] nvarchar(max) NOT NULL,
    [LastDigitsCreditCard] bigint NOT NULL,
    [TotalPayment] decimal(18,2) NULL,
    [Date] nvarchar(max) NOT NULL,
    [Time] nvarchar(max) NOT NULL,
    [ClientFullName] nvarchar(max) NULL,
    [ClientPhone] bigint NULL,
    [Order_Code] bigint NOT NULL,
    CONSTRAINT [PK_ProofOfPayment] PRIMARY KEY ([Code]),
    CONSTRAINT [FK_ProofOfPayment_Order_Order_Code] FOREIGN KEY ([Order_Code]) REFERENCES [Order] ([Code]) ON DELETE CASCADE
);
GO

CREATE TABLE [Cart_Product] (
    [Cart_Code] bigint NOT NULL,
    [Product_Code] bigint NOT NULL,
    [Amount] bigint NOT NULL,
    CONSTRAINT [PK_Cart_Product] PRIMARY KEY ([Cart_Code], [Product_Code]),
    CONSTRAINT [FK_Cart_Product_Cart_Cart_Code] FOREIGN KEY ([Cart_Code]) REFERENCES [Cart] ([Code]) ON DELETE CASCADE,
    CONSTRAINT [FK_Cart_Product_Product_Product_Code] FOREIGN KEY ([Product_Code]) REFERENCES [Product] ([Code]) ON DELETE CASCADE
);
GO

CREATE TABLE [Order_Product] (
    [Order_Code] bigint NOT NULL,
    [Product_Code] bigint NOT NULL,
    [Amount] bigint NOT NULL,
    CONSTRAINT [PK_Order_Product] PRIMARY KEY ([Order_Code], [Product_Code]),
    CONSTRAINT [FK_Order_Product_Order_Order_Code] FOREIGN KEY ([Order_Code]) REFERENCES [Order] ([Code]) ON DELETE CASCADE,
    CONSTRAINT [FK_Order_Product_Product_Product_Code] FOREIGN KEY ([Product_Code]) REFERENCES [Product] ([Code]) ON DELETE CASCADE
);
GO

CREATE TABLE [ProductPhoto] (
    [Product_Code] bigint NOT NULL,
    [PhotoURL] nvarchar(450) NOT NULL,
    CONSTRAINT [PK_ProductPhoto] PRIMARY KEY ([Product_Code], [PhotoURL]),
    CONSTRAINT [FK_ProductPhoto_Product_Product_Code] FOREIGN KEY ([Product_Code]) REFERENCES [Product] ([Code]) ON DELETE CASCADE
);
GO

CREATE UNIQUE INDEX [IX_Admin_UserId] ON [Admin] ([UserId]);
GO

CREATE UNIQUE INDEX [IX_BusinessAssociate_BusinessManager_Email] ON [BusinessAssociate] ([BusinessManager_Email]);
GO

CREATE INDEX [IX_BusinessAssociate_BusinessType_Identification] ON [BusinessAssociate] ([BusinessType_Identification]);
GO

CREATE UNIQUE INDEX [IX_BusinessManager_UserId] ON [BusinessManager] ([UserId]);
GO

CREATE UNIQUE INDEX [IX_BusinessType_Name] ON [BusinessType] ([Name]);
GO

CREATE INDEX [IX_Cart_Client_Id] ON [Cart] ([Client_Id]);
GO

CREATE INDEX [IX_Cart_Product_Product_Code] ON [Cart_Product] ([Product_Code]);
GO

CREATE UNIQUE INDEX [IX_Client_UserId] ON [Client] ([UserId]);
GO

CREATE INDEX [IX_FeedBack_BusinessAssociate_Legal_Id] ON [FeedBack] ([BusinessAssociate_Legal_Id]);
GO

CREATE INDEX [IX_FeedBack_FoodDeliveryMan_UserId] ON [FeedBack] ([FoodDeliveryMan_UserId]);
GO

CREATE UNIQUE INDEX [IX_FeedBack_Order_Code] ON [FeedBack] ([Order_Code]);
GO

CREATE INDEX [IX_Order_Client_Id] ON [Order] ([Client_Id]);
GO

CREATE INDEX [IX_Order_FoodDeliveryMan_UserId] ON [Order] ([FoodDeliveryMan_UserId]);
GO

CREATE INDEX [IX_Order_Product_Product_Code] ON [Order_Product] ([Product_Code]);
GO

CREATE INDEX [IX_Product_BusinessAssociate_Legal_Id] ON [Product] ([BusinessAssociate_Legal_Id]);
GO

CREATE UNIQUE INDEX [IX_ProofOfPayment_Order_Code] ON [ProofOfPayment] ([Order_Code]);
GO
---------------Funciones de creacion de la base de datos en general----------

---------------Funciones para Admin---------------
GO
CREATE or ALTER PROCEDURE sp_GetAllAdmins
AS
BEGIN
    SELECT * FROM [Admin];
END;

GO
CREATE or ALTER PROCEDURE sp_GetAdminById
    @Id BIGINT
AS
BEGIN
    SELECT *
    FROM [Admin]
    WHERE [Id] = @Id;
END;

GO
CREATE or ALTER PROCEDURE sp_CreateAdmin
    @Id BIGINT,
    @Name NVARCHAR(MAX),
    @FirstSurname NVARCHAR(MAX),
    @SecondSurname NVARCHAR(MAX),
    @Province NVARCHAR(MAX),
    @Canton NVARCHAR(MAX),
    @District NVARCHAR(MAX),
    @UserId NVARCHAR(450),
    @Password NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO [Admin] ([Id], [Name], [FirstSurname], [SecondSurname], [Province], [Canton], [District], [UserId], [Password])
    VALUES (@Id, @Name, @FirstSurname, @SecondSurname, @Province, @Canton, @District, @UserId, @Password);
END;

GO
CREATE or ALTER PROCEDURE sp_UpdateAdmin
    @Id BIGINT,
    @Name NVARCHAR(MAX),
    @FirstSurname NVARCHAR(MAX),
    @SecondSurname NVARCHAR(MAX),
    @Province NVARCHAR(MAX),
    @Canton NVARCHAR(MAX),
    @District NVARCHAR(MAX),
    @UserId NVARCHAR(450),
    @Password NVARCHAR(MAX)
AS
BEGIN
    UPDATE [Admin]
    SET [Name] = @Name,
        [FirstSurname] = @FirstSurname,
        [SecondSurname] = @SecondSurname,
        [Province] = @Province,
        [Canton] = @Canton,
        [District] = @District,
        [UserId] = @UserId,
        [Password] = @Password
    WHERE [Id] = @Id;
END;

GO
CREATE or ALTER PROCEDURE sp_DeleteAdmin
    @Id BIGINT
AS
BEGIN
    DELETE FROM [Admin]
    WHERE [Id] = @Id;
END;
GO
CREATE or ALTER PROCEDURE sp_AuthenticateAdmin
    @UserId NVARCHAR(450),
    @Password NVARCHAR(MAX)
AS
BEGIN
    SELECT *
    FROM [Admin]
    WHERE [UserId] = @UserId AND [Password] = @Password;
END;
---------------Funciones para Admin---------------

---------------Funciones para AdminPhone---------------
GO
CREATE or ALTER PROCEDURE sp_GetAllAdminPhones
AS
BEGIN
    SELECT * FROM [AdminPhone];
END;

GO
CREATE or ALTER PROCEDURE sp_GetAdminPhonesByAdminId
    @Admin_id BIGINT
AS
BEGIN
    SELECT * FROM [AdminPhone]
    WHERE [Admin_id] = @Admin_id;
END;

GO
CREATE or ALTER PROCEDURE sp_CreateAdminPhone
    @Admin_id BIGINT,
    @Phone BIGINT
AS
BEGIN
    INSERT INTO [AdminPhone] ([Admin_id], [Phone])
    VALUES (@Admin_id, @Phone);
END;

GO
CREATE or ALTER PROCEDURE sp_UpdateAdminPhone
    @Admin_id BIGINT,
    @OldPhone BIGINT,
    @NewPhone BIGINT
AS
BEGIN
    BEGIN TRANSACTION;
        DELETE FROM [AdminPhone]
        WHERE [Admin_id] = @Admin_id AND [Phone] = @OldPhone;

        INSERT INTO [AdminPhone] ([Admin_id], [Phone])
        VALUES (@Admin_id, @NewPhone);
    COMMIT TRANSACTION;
END;

GO
CREATE or ALTER PROCEDURE sp_DeleteAdminPhone
    @Admin_id BIGINT,
    @Phone BIGINT
AS
BEGIN
    DELETE FROM [AdminPhone]
    WHERE [Admin_id] = @Admin_id AND [Phone] = @Phone;
END;
GO
---------------Funciones para AdminPhone---------------

---------------Funciones para BusinessManager---------------
GO
CREATE or ALTER PROCEDURE sp_GetAllBusinessManagers
AS
BEGIN
    SELECT * FROM [BusinessManager];
END;
GO

CREATE or ALTER PROCEDURE sp_GetBusinessManagerByEmail
    @Email NVARCHAR(MAX)
AS
BEGIN
    SELECT *
    FROM [BusinessManager]
    WHERE [Email] = @Email;
END;
GO

CREATE or ALTER PROCEDURE sp_CreateBusinessManager
    @Email NVARCHAR(MAX),
    @Name NVARCHAR(MAX),
    @FirstSurname NVARCHAR(MAX),
    @SecondSurname NVARCHAR(MAX),
    @Province NVARCHAR(MAX),
    @Canton NVARCHAR(MAX),
    @District NVARCHAR(MAX),
    @UserId NVARCHAR(450),
    @Password NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO [BusinessManager] ([Email], [Name], [FirstSurname], [SecondSurname], [Province], [Canton], [District], [UserId], [Password])
    VALUES (@Email, @Name, @FirstSurname, @SecondSurname, @Province, @Canton, @District, @UserId, @Password);
END;
GO

CREATE or ALTER PROCEDURE sp_UpdateBusinessManager
    @Email NVARCHAR(MAX),
    @Name NVARCHAR(MAX),
    @FirstSurname NVARCHAR(MAX),
    @SecondSurname NVARCHAR(MAX),
    @Province NVARCHAR(MAX),
    @Canton NVARCHAR(MAX),
    @District NVARCHAR(MAX),
    @UserId NVARCHAR(450),
    @Password NVARCHAR(MAX)
AS
BEGIN
    UPDATE [BusinessManager]
    SET [Name] = @Name,
        [FirstSurname] = @FirstSurname,
        [SecondSurname] = @SecondSurname,
        [Province] = @Province,
        [Canton] = @Canton,
        [District] = @District,
        [UserId] = @UserId,
        [Password] = @Password
    WHERE [Email] = @Email;
END;
GO

CREATE or ALTER PROCEDURE sp_DeleteBusinessManager
    @Email NVARCHAR(MAX)
AS
BEGIN
    DELETE FROM [BusinessManager]
    WHERE [Email] = @Email;
END;
GO

CREATE or ALTER PROCEDURE sp_AuthenticateBusinessManager
    @Email NVARCHAR(MAX),
    @Password NVARCHAR(MAX)
AS
BEGIN
    SELECT *
    FROM [BusinessManager]
    WHERE [Email] = @Email AND [Password] = @Password;
END;
GO

CREATE or ALTER PROCEDURE sp_GetBusinessAssociateByManagerEmail
    @BusinessManager_Email NVARCHAR(MAX)
AS
BEGIN
    SELECT *
    FROM [BusinessAssociate]
    WHERE [BusinessManager_Email] = @BusinessManager_Email;
END;
GO
---------------Funciones para BusinessManager---------------

---------------Funciones para BusinessManagerPhone---------------
GO
CREATE or ALTER PROCEDURE sp_GetAllBusinessManagerPhones
AS
BEGIN
    SELECT * FROM [BusinessManagerPhone];
END;
GO

CREATE or ALTER PROCEDURE sp_GetBusinessManagerPhonesByEmail
    @BusinessManager_Email NVARCHAR(MAX)
AS
BEGIN
    SELECT * FROM [BusinessManagerPhone]
    WHERE [BusinessManager_Email] = @BusinessManager_Email;
END;
GO

CREATE or ALTER PROCEDURE sp_CreateBusinessManagerPhone
    @BusinessManager_Email NVARCHAR(MAX),
    @Phone BIGINT
AS
BEGIN
    INSERT INTO [BusinessManagerPhone] ([BusinessManager_Email], [Phone])
    VALUES (@BusinessManager_Email, @Phone);
END;
GO

CREATE or ALTER PROCEDURE sp_UpdateBusinessManagerPhone
    @BusinessManager_Email NVARCHAR(MAX),
    @OldPhone BIGINT,
    @NewPhone BIGINT
AS
BEGIN
    BEGIN TRANSACTION;
        DELETE FROM [BusinessManagerPhone]
        WHERE [BusinessManager_Email] = @BusinessManager_Email AND [Phone] = @OldPhone;

        INSERT INTO [BusinessManagerPhone] ([BusinessManager_Email], [Phone])
        VALUES (@BusinessManager_Email, @NewPhone);
    COMMIT TRANSACTION;
END;
GO

CREATE or ALTER PROCEDURE sp_DeleteBusinessManagerPhone
    @BusinessManager_Email NVARCHAR(MAX),
    @Phone BIGINT
AS
BEGIN
    DELETE FROM [BusinessManagerPhone]
    WHERE [BusinessManager_Email] = @BusinessManager_Email AND [Phone] = @Phone;
END;
GO
---------------Funciones para BusinessManagerPhone---------------

---------------Funciones para FoodDeliveryMan---------------
GO
CREATE or ALTER PROCEDURE sp_GetAllFoodDeliveryMen
AS
BEGIN
    SELECT * FROM [FoodDeliveryMan];
END;
GO

CREATE or ALTER PROCEDURE sp_GetFoodDeliveryManByUserId
    @UserId NVARCHAR(MAX)
AS
BEGIN
    SELECT *
    FROM [FoodDeliveryMan]
    WHERE [UserId] = @UserId;
END;
GO

CREATE or ALTER PROCEDURE sp_CreateFoodDeliveryMan
    @UserId NVARCHAR(MAX),
    @Name NVARCHAR(MAX),
    @FirstSurname NVARCHAR(MAX),
    @SecondSurname NVARCHAR(MAX),
    @Province NVARCHAR(MAX),
    @Canton NVARCHAR(MAX),
    @District NVARCHAR(MAX),
    @Password NVARCHAR(MAX),
    @State NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO [FoodDeliveryMan] ([UserId], [Name], [FirstSurname], [SecondSurname], [Province], [Canton], [District], [Password], [State])
    VALUES (@UserId, @Name, @FirstSurname, @SecondSurname, @Province, @Canton, @District, @Password, @State);
END;
GO

CREATE or ALTER PROCEDURE sp_UpdateFoodDeliveryMan
    @UserId NVARCHAR(MAX),
    @Name NVARCHAR(MAX),
    @FirstSurname NVARCHAR(MAX),
    @SecondSurname NVARCHAR(MAX),
    @Province NVARCHAR(MAX),
    @Canton NVARCHAR(MAX),
    @District NVARCHAR(MAX),
    @Password NVARCHAR(MAX),
    @State NVARCHAR(MAX)
AS
BEGIN
    UPDATE [FoodDeliveryMan]
    SET [Name] = @Name,
        [FirstSurname] = @FirstSurname,
        [SecondSurname] = @SecondSurname,
        [Province] = @Province,
        [Canton] = @Canton,
        [District] = @District,
        [Password] = @Password,
        [State] = @State
    WHERE [UserId] = @UserId;
END;
GO

CREATE or ALTER PROCEDURE sp_DeleteFoodDeliveryMan
    @UserId NVARCHAR(MAX)
AS
BEGIN
    DELETE FROM [FoodDeliveryMan]
    WHERE [UserId] = @UserId;
END;
GO

CREATE or ALTER PROCEDURE sp_AuthenticateFoodDeliveryMan
    @UserId NVARCHAR(MAX),
    @Password NVARCHAR(MAX)
AS
BEGIN
    SELECT *
    FROM [FoodDeliveryMan]
    WHERE [UserId] = @UserId AND [Password] = @Password;
END;
GO
---------------Funciones para FoodDeliveryMan---------------

---------------Funciones para FoodDeliveryManPhone---------------
GO
CREATE or ALTER PROCEDURE sp_GetAllFoodDeliveryManPhones
AS
BEGIN
    SELECT * FROM [FoodDeliveryManPhone];
END;
GO

CREATE or ALTER PROCEDURE sp_GetFoodDeliveryManPhonesByUserId
    @FoodDeliveryMan_UserId NVARCHAR(MAX)
AS
BEGIN
    SELECT * FROM [FoodDeliveryManPhone]
    WHERE [FoodDeliveryMan_UserId] = @FoodDeliveryMan_UserId;
END;
GO

CREATE or ALTER PROCEDURE sp_CreateFoodDeliveryManPhone
    @FoodDeliveryMan_UserId NVARCHAR(MAX),
    @Phone BIGINT
AS
BEGIN
    INSERT INTO [FoodDeliveryManPhone] ([FoodDeliveryMan_UserId], [Phone])
    VALUES (@FoodDeliveryMan_UserId, @Phone);
END;
GO

CREATE or ALTER PROCEDURE sp_UpdateFoodDeliveryManPhone
    @FoodDeliveryMan_UserId NVARCHAR(MAX),
    @OldPhone BIGINT,
    @NewPhone BIGINT
AS
BEGIN
    BEGIN TRANSACTION;
        DELETE FROM [FoodDeliveryManPhone]
        WHERE [FoodDeliveryMan_UserId] = @FoodDeliveryMan_UserId AND [Phone] = @OldPhone;

        INSERT INTO [FoodDeliveryManPhone] ([FoodDeliveryMan_UserId], [Phone])
        VALUES (@FoodDeliveryMan_UserId, @NewPhone);
    COMMIT TRANSACTION;
END;
GO

CREATE or ALTER PROCEDURE sp_DeleteFoodDeliveryManPhone
    @FoodDeliveryMan_UserId NVARCHAR(MAX),
    @Phone BIGINT
AS
BEGIN
    DELETE FROM [FoodDeliveryManPhone]
    WHERE [FoodDeliveryMan_UserId] = @FoodDeliveryMan_UserId AND [Phone] = @Phone;
END;
GO
---------------Funciones para FoodDeliveryManPhone---------------

---------------Funciones para Client---------------
GO
CREATE or ALTER PROCEDURE sp_GetAllClients
AS
BEGIN
    SELECT * FROM [Client];
END;
GO

CREATE or ALTER PROCEDURE sp_GetClientById
    @Id BIGINT
AS
BEGIN
    SELECT * FROM [Client]
    WHERE [Id] = @Id;
END;
GO

CREATE or ALTER PROCEDURE sp_CreateClient
    @Id BIGINT,
    @UserId NVARCHAR(450),
    @Name NVARCHAR(MAX),
    @FirstSurname NVARCHAR(MAX),
    @SecondSurname NVARCHAR(MAX),
    @Province NVARCHAR(MAX),
    @Canton NVARCHAR(MAX),
    @District NVARCHAR(MAX),
    @Password NVARCHAR(MAX),
    @Phone BIGINT,
    @BirthDate NVARCHAR(10)
AS
BEGIN
    INSERT INTO [Client] ([Id], [UserId], [Name], [FirstSurname], [SecondSurname], [Province], [Canton], [District], [Password], [Phone], [BirthDate])
    VALUES (@Id, @UserId, @Name, @FirstSurname, @SecondSurname, @Province, @Canton, @District, @Password, @Phone, @BirthDate);
END;
GO

CREATE or ALTER PROCEDURE sp_UpdateClient
    @Id BIGINT,
    @UserId NVARCHAR(450),
    @Name NVARCHAR(MAX),
    @FirstSurname NVARCHAR(MAX),
    @SecondSurname NVARCHAR(MAX),
    @Province NVARCHAR(MAX),
    @Canton NVARCHAR(MAX),
    @District NVARCHAR(MAX),
    @Password NVARCHAR(MAX),
    @Phone BIGINT,
    @BirthDate NVARCHAR(10)
AS
BEGIN
    UPDATE [Client]
    SET [UserId] = @UserId,
        [Name] = @Name,
        [FirstSurname] = @FirstSurname,
        [SecondSurname] = @SecondSurname,
        [Province] = @Province,
        [Canton] = @Canton,
        [District] = @District,
        [Password] = @Password,
        [Phone] = @Phone,
        [BirthDate] = @BirthDate
    WHERE [Id] = @Id;
END;
GO

CREATE or ALTER PROCEDURE sp_DeleteClient
    @Id BIGINT
AS
BEGIN
    DELETE FROM [Client]
    WHERE [Id] = @Id;
END;
GO

CREATE or ALTER PROCEDURE sp_AuthenticateClient
    @UserId NVARCHAR(450),
    @Password NVARCHAR(MAX)
AS
BEGIN
    SELECT *
    FROM [Client]
    WHERE [UserId] = @UserId AND [Password] = @Password;
END;
GO
---------------Funciones para Client---------------

---------------Funciones para BusinessType---------------
GO
CREATE or ALTER PROCEDURE sp_GetAllBusinessTypes
AS
BEGIN
    SELECT * FROM [BusinessType];
END;
GO

CREATE or ALTER PROCEDURE sp_GetBusinessTypeById
    @Identification BIGINT
AS
BEGIN
    SELECT * FROM [BusinessType]
    WHERE [Identification] = @Identification;
END;
GO

GO
CREATE or ALTER PROCEDURE sp_CreateBusinessType
    @Name NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO [BusinessType] ([Name])
    VALUES (@Name);
END;
GO

CREATE or ALTER PROCEDURE sp_UpdateBusinessType
    @Identification BIGINT,
    @Name NVARCHAR(MAX)
AS
BEGIN
    UPDATE [BusinessType]
    SET [Name] = @Name
    WHERE [Identification] = @Identification;
END;
GO

CREATE or ALTER PROCEDURE sp_DeleteBusinessType
    @Identification BIGINT
AS
BEGIN
    DELETE FROM [BusinessType]
    WHERE [Identification] = @Identification;
END;
GO
---------------Funciones para BusinessType---------------

---------------Funciones para BusinessAssociate---------------
GO
CREATE or ALTER PROCEDURE sp_GetAllBusinessAssociates
AS
BEGIN
    SELECT * FROM [BusinessAssociate];
END;
GO

CREATE or ALTER PROCEDURE sp_GetBusinessAssociateById
    @Legal_Id BIGINT
AS
BEGIN
    SELECT * FROM [BusinessAssociate]
    WHERE [Legal_Id] = @Legal_Id;
END;
GO

CREATE or ALTER PROCEDURE sp_CreateBusinessAssociate
    @Legal_Id BIGINT,
    @Email NVARCHAR(MAX),
    @State NVARCHAR(MAX),
    @BusinessName NVARCHAR(MAX),
    @Province NVARCHAR(MAX),
    @Canton NVARCHAR(MAX),
    @District NVARCHAR(MAX),
    @SINPE BIGINT,
    @BusinessManager_Email NVARCHAR(MAX),
    @BusinessType_Identification BIGINT
AS
BEGIN
    INSERT INTO [BusinessAssociate] (
        [Legal_Id], [Email], [State], [BusinessName],
        [Province], [Canton], [District], [SINPE],
        [BusinessManager_Email], [BusinessType_Identification]
    )
    VALUES (
        @Legal_Id, @Email, @State, @BusinessName,
        @Province, @Canton, @District, @SINPE,
        @BusinessManager_Email, @BusinessType_Identification
    );
END;
GO

CREATE or ALTER PROCEDURE sp_UpdateBusinessAssociate
    @Legal_Id BIGINT,
    @Email NVARCHAR(MAX),
    @State NVARCHAR(MAX),
    @BusinessName NVARCHAR(MAX),
    @Province NVARCHAR(MAX),
    @Canton NVARCHAR(MAX),
    @District NVARCHAR(MAX),
    @SINPE BIGINT,
    @RejectReason NVARCHAR(MAX) = NULL,
    @BusinessManager_Email NVARCHAR(MAX),
    @BusinessType_Identification BIGINT
AS
BEGIN
    UPDATE [BusinessAssociate]
    SET [Email] = @Email,
        [State] = @State,
        [BusinessName] = @BusinessName,
        [Province] = @Province,
        [Canton] = @Canton,
        [District] = @District,
        [SINPE] = @SINPE,
        [RejectReason] = @RejectReason,
        [BusinessManager_Email] = @BusinessManager_Email,
        [BusinessType_Identification] = @BusinessType_Identification
    WHERE [Legal_Id] = @Legal_Id;
END;
GO

CREATE or ALTER PROCEDURE sp_DeleteBusinessAssociate
    @Legal_Id BIGINT
AS
BEGIN
    DELETE FROM [BusinessAssociate]
    WHERE [Legal_Id] = @Legal_Id;
END;
GO
---------------Funciones para BusinessAssociate---------------

---------------Funciones para BusinessAssociatePhone---------------
GO
CREATE or ALTER PROCEDURE sp_GetAllBusinessAssociatePhones
AS
BEGIN
    SELECT * FROM [BusinessAssociatePhone];
END;
GO

CREATE or ALTER PROCEDURE sp_GetBusinessAssociatePhonesByLegalId
    @BusinessAssociate_Legal_Id BIGINT
AS
BEGIN
    SELECT * FROM [BusinessAssociatePhone]
    WHERE [BusinessAssociate_Legal_Id] = @BusinessAssociate_Legal_Id;
END;
GO

CREATE or ALTER PROCEDURE sp_CreateBusinessAssociatePhone
    @BusinessAssociate_Legal_Id BIGINT,
    @Phone BIGINT
AS
BEGIN
    INSERT INTO [BusinessAssociatePhone] ([BusinessAssociate_Legal_Id], [Phone])
    VALUES (@BusinessAssociate_Legal_Id, @Phone);
END;
GO

CREATE or ALTER PROCEDURE sp_UpdateBusinessAssociatePhone
    @BusinessAssociate_Legal_Id BIGINT,
    @OldPhone BIGINT,
    @NewPhone BIGINT
AS
BEGIN
    BEGIN TRANSACTION;
        DELETE FROM [BusinessAssociatePhone]
        WHERE [BusinessAssociate_Legal_Id] = @BusinessAssociate_Legal_Id AND [Phone] = @OldPhone;

        INSERT INTO [BusinessAssociatePhone] ([BusinessAssociate_Legal_Id], [Phone])
        VALUES (@BusinessAssociate_Legal_Id, @NewPhone);
    COMMIT TRANSACTION;
END;
GO

CREATE or ALTER PROCEDURE sp_DeleteBusinessAssociatePhone
    @BusinessAssociate_Legal_Id BIGINT,
    @Phone BIGINT
AS
BEGIN
    DELETE FROM [BusinessAssociatePhone]
    WHERE [BusinessAssociate_Legal_Id] = @BusinessAssociate_Legal_Id AND [Phone] = @Phone;
END;
GO
---------------Funciones para BusinessAssociatePhone---------------

---------------Funciones para Product---------------
GO
CREATE or ALTER PROCEDURE sp_GetAllProducts
AS
BEGIN
    SELECT * FROM [Product];
END;
GO

CREATE or ALTER PROCEDURE sp_GetProductByCode
    @Code BIGINT
AS
BEGIN
    SELECT * FROM [Product]
    WHERE [Code] = @Code;
END;
GO

CREATE or ALTER PROCEDURE sp_CreateProduct
    @Name NVARCHAR(MAX),
    @Price decimal(18,2),
    @Category NVARCHAR(MAX),
    @BusinessAssociate_Legal_Id BIGINT
AS
BEGIN
    INSERT INTO [Product] (
        [Name], [Price], [Category], [BusinessAssociate_Legal_Id]
    )
    VALUES (
        @Name, @Price, @Category, @BusinessAssociate_Legal_Id
    );
END;
GO

CREATE or ALTER PROCEDURE sp_UpdateProduct
    @Code BIGINT,
    @Name NVARCHAR(MAX),
    @Price decimal(18,2),
    @Category NVARCHAR(MAX),
    @BusinessAssociate_Legal_Id BIGINT
AS
BEGIN
    UPDATE [Product]
    SET [Name] = @Name,
        [Price] = @Price,
        [Category] = @Category,
        [BusinessAssociate_Legal_Id] = @BusinessAssociate_Legal_Id
    WHERE [Code] = @Code;
END;
GO

CREATE or ALTER PROCEDURE sp_DeleteProduct
    @Code BIGINT
AS
BEGIN
    DELETE FROM [Product]
    WHERE [Code] = @Code;
END;
GO
---------------Funciones para Product---------------

---------------Funciones para ProductPhoto---------------
GO
CREATE or ALTER PROCEDURE sp_GetAllProductPhotos
AS
BEGIN
    SELECT * FROM [ProductPhoto];
END;
GO

CREATE or ALTER PROCEDURE sp_GetProductPhotosByProductCode
    @Product_Code BIGINT
AS
BEGIN
    SELECT * FROM [ProductPhoto]
    WHERE [Product_Code] = @Product_Code;
END;
GO

CREATE or ALTER PROCEDURE sp_CreateProductPhoto
    @Product_Code BIGINT,
    @PhotoURL NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO [ProductPhoto] ([Product_Code], [PhotoURL])
    VALUES (@Product_Code, @PhotoURL);
END;
GO

CREATE or ALTER PROCEDURE sp_UpdateProductPhoto
    @Product_Code BIGINT,
    @OldPhotoURL NVARCHAR(MAX),
    @NewPhotoURL NVARCHAR(MAX)
AS
BEGIN
    BEGIN TRANSACTION;
        DELETE FROM [ProductPhoto]
        WHERE [Product_Code] = @Product_Code AND [PhotoURL] = @OldPhotoURL;

        INSERT INTO [ProductPhoto] ([Product_Code], [PhotoURL])
        VALUES (@Product_Code, @NewPhotoURL);
    COMMIT TRANSACTION;
END;
GO

CREATE or ALTER PROCEDURE sp_DeleteProductPhoto
    @Product_Code BIGINT,
    @PhotoURL NVARCHAR(MAX)
AS
BEGIN
    DELETE FROM [ProductPhoto]
    WHERE [Product_Code] = @Product_Code AND [PhotoURL] = @PhotoURL;
END;
GO
---------------Funciones para ProductPhoto---------------

---------------Funciones para Cart---------------
GO
CREATE or ALTER PROCEDURE sp_GetAllCarts
AS
BEGIN
    SELECT * FROM [Cart];
END;
GO

CREATE or ALTER PROCEDURE sp_GetCartByCode
    @Code BIGINT
AS
BEGIN
    SELECT * FROM [Cart]
    WHERE [Code] = @Code;
END;
GO

CREATE or ALTER PROCEDURE sp_CreateCart
    @Client_Id BIGINT
AS
BEGIN
    INSERT INTO [Cart] ([Client_Id])
    VALUES (@Client_Id);
END;
GO

CREATE or ALTER PROCEDURE sp_UpdateCart
    @Code BIGINT,
    @Client_Id BIGINT
AS
BEGIN
    UPDATE [Cart]
    SET [Client_Id] = @Client_Id
    WHERE [Code] = @Code;
END;
GO

CREATE or ALTER PROCEDURE sp_DeleteCart
    @Code BIGINT
AS
BEGIN
    -- Delete related Cart_Product entries
    DELETE FROM [Cart_Product]
    WHERE [Cart_Code] = @Code;

    -- Delete the Cart
    DELETE FROM [Cart]
    WHERE [Code] = @Code;
END;
GO
---------------Funciones para Cart---------------

---------------Funciones para Cart_Product---------------
GO
CREATE or ALTER PROCEDURE sp_GetAllCartProducts
AS
BEGIN
    SELECT * FROM [Cart_Product];
END;
GO

CREATE or ALTER PROCEDURE sp_GetCartProductsByCartCode
    @Cart_Code BIGINT
AS
BEGIN
    SELECT * FROM [Cart_Product]
    WHERE [Cart_Code] = @Cart_Code;
END;
GO

CREATE or ALTER PROCEDURE sp_CreateCartProduct
    @Cart_Code BIGINT,
    @Product_Code BIGINT
AS
BEGIN
    IF EXISTS (SELECT 1 FROM [Cart_Product] WHERE [Cart_Code] = @Cart_Code AND [Product_Code] = @Product_Code)
    BEGIN
        -- Increment the amount
        UPDATE [Cart_Product]
        SET [Amount] = [Amount] + 1
        WHERE [Cart_Code] = @Cart_Code AND [Product_Code] = @Product_Code;
    END
    ELSE
    BEGIN
        -- Insert new entry with Amount = 1
        INSERT INTO [Cart_Product] ([Cart_Code], [Product_Code], [Amount])
        VALUES (@Cart_Code, @Product_Code, 1);
    END

    -- Update Cart's BusinessAssociate_Legal_Id and TotalProductsPrice
    DECLARE @BusinessAssociate_Legal_Id BIGINT;
    DECLARE @TotalProductsPrice decimal(18,2);

    -- Get BusinessAssociate_Legal_Id from first Product in Cart
    SELECT TOP 1 @BusinessAssociate_Legal_Id = p.BusinessAssociate_Legal_Id
    FROM [Cart_Product] cp
    INNER JOIN [Product] p ON cp.Product_Code = p.Code
    WHERE cp.Cart_Code = @Cart_Code;

    -- Calculate TotalProductsPrice
    SELECT @TotalProductsPrice = SUM(p.Price * cp.Amount)
    FROM [Cart_Product] cp
    INNER JOIN [Product] p ON cp.Product_Code = p.Code
    WHERE cp.Cart_Code = @Cart_Code;

    -- Update the Cart
    UPDATE [Cart]
    SET [BusinessAssociate_Legal_Id] = @BusinessAssociate_Legal_Id,
        [TotalProductsPrice] = @TotalProductsPrice
    WHERE [Code] = @Cart_Code;
END;
GO

CREATE or ALTER PROCEDURE sp_UpdateCartProduct
    @Cart_Code BIGINT,
    @Product_Code BIGINT,
    @Amount BIGINT
AS
BEGIN
    UPDATE [Cart_Product]
    SET [Amount] = @Amount
    WHERE [Cart_Code] = @Cart_Code AND [Product_Code] = @Product_Code;

    -- Update Cart's BusinessAssociate_Legal_Id and TotalProductsPrice
    DECLARE @BusinessAssociate_Legal_Id BIGINT;
    DECLARE @TotalProductsPrice decimal(18,2);

    -- Get BusinessAssociate_Legal_Id from first Product in Cart
    SELECT TOP 1 @BusinessAssociate_Legal_Id = p.BusinessAssociate_Legal_Id
    FROM [Cart_Product] cp
    INNER JOIN [Product] p ON cp.Product_Code = p.Code
    WHERE cp.Cart_Code = @Cart_Code;

    -- Calculate TotalProductsPrice
    SELECT @TotalProductsPrice = SUM(p.Price * cp.Amount)
    FROM [Cart_Product] cp
    INNER JOIN [Product] p ON cp.Product_Code = p.Code
    WHERE cp.Cart_Code = @Cart_Code;

    -- Update the Cart
    UPDATE [Cart]
    SET [BusinessAssociate_Legal_Id] = @BusinessAssociate_Legal_Id,
        [TotalProductsPrice] = @TotalProductsPrice
    WHERE [Code] = @Cart_Code;
END;
GO

CREATE or ALTER PROCEDURE sp_DeleteCartProduct
    @Cart_Code BIGINT,
    @Product_Code BIGINT
AS
BEGIN
    DELETE FROM [Cart_Product]
    WHERE [Cart_Code] = @Cart_Code AND [Product_Code] = @Product_Code;

    -- Update Cart's BusinessAssociate_Legal_Id and TotalProductsPrice
    DECLARE @BusinessAssociate_Legal_Id BIGINT;
    DECLARE @TotalProductsPrice decimal(18,2);

    -- Check if there are remaining products in the cart
    IF EXISTS (SELECT 1 FROM [Cart_Product] WHERE [Cart_Code] = @Cart_Code)
    BEGIN
        -- Get BusinessAssociate_Legal_Id from first remaining Product
        SELECT TOP 1 @BusinessAssociate_Legal_Id = p.BusinessAssociate_Legal_Id
        FROM [Cart_Product] cp
        INNER JOIN [Product] p ON cp.Product_Code = p.Code
        WHERE cp.Cart_Code = @Cart_Code;

        -- Calculate TotalProductsPrice
        SELECT @TotalProductsPrice = SUM(p.Price * cp.Amount)
        FROM [Cart_Product] cp
        INNER JOIN [Product] p ON cp.Product_Code = p.Code
        WHERE cp.Cart_Code = @Cart_Code;
    END
    ELSE
    BEGIN
        -- No products left in cart
        SET @BusinessAssociate_Legal_Id = NULL;
        SET @TotalProductsPrice = NULL;
    END

    -- Update the Cart
    UPDATE [Cart]
    SET [BusinessAssociate_Legal_Id] = @BusinessAssociate_Legal_Id,
        [TotalProductsPrice] = @TotalProductsPrice
    WHERE [Code] = @Cart_Code;
END;
GO
---------------Funciones para Cart_Product---------------

---------------Funciones para Order---------------
GO
CREATE or ALTER PROCEDURE sp_GetAllOrders
AS
BEGIN
    SELECT * FROM [Order];
END;
GO

CREATE or ALTER PROCEDURE sp_GetOrderByCode
    @Code BIGINT
AS
BEGIN
    SELECT * FROM [Order]
    WHERE [Code] = @Code;
END;
GO

CREATE or ALTER PROCEDURE sp_CreateOrder
    @State NVARCHAR(MAX),
    @Client_Id BIGINT,
    @FoodDeliveryMan_UserId NVARCHAR(450)
AS
BEGIN
    DECLARE @Direction NVARCHAR(MAX);

    -- Get Direction from Client
    SELECT @Direction = [Direction]
    FROM [Client]
    WHERE [Id] = @Client_Id;

    INSERT INTO [Order] ([State], [Client_Id], [FoodDeliveryMan_UserId], [Direction])
    VALUES (@State, @Client_Id, @FoodDeliveryMan_UserId, @Direction);
END;
GO

CREATE or ALTER PROCEDURE sp_UpdateOrder
    @Code BIGINT,
    @State NVARCHAR(MAX),
    @Client_Id BIGINT,
    @FoodDeliveryMan_UserId NVARCHAR(450)
AS
BEGIN
    DECLARE @Direction NVARCHAR(MAX);

    -- Get Direction from Client
    SELECT @Direction = [Direction]
    FROM [Client]
    WHERE [Id] = @Client_Id;

    UPDATE [Order]
    SET [State] = @State,
        [Client_Id] = @Client_Id,
        [FoodDeliveryMan_UserId] = @FoodDeliveryMan_UserId,
        [Direction] = @Direction
    WHERE [Code] = @Code;
END;
GO

CREATE or ALTER PROCEDURE sp_DeleteOrder
    @Code BIGINT
AS
BEGIN
    -- Delete related Order_Product entries
    DELETE FROM [Order_Product]
    WHERE [Order_Code] = @Code;

    -- Delete the Order
    DELETE FROM [Order]
    WHERE [Code] = @Code;
END;
GO
---------------Funciones para Order---------------

---------------Funciones para Order_Product---------------
GO
CREATE or ALTER PROCEDURE sp_GetAllOrderProducts
AS
BEGIN
    SELECT * FROM [Order_Product];
END;
GO

CREATE or ALTER PROCEDURE sp_GetOrderProductsByOrderCode
    @Order_Code BIGINT
AS
BEGIN
    SELECT * FROM [Order_Product]
    WHERE [Order_Code] = @Order_Code;
END;
GO

CREATE or ALTER PROCEDURE sp_CreateOrderProduct
    @Order_Code BIGINT,
    @Product_Code BIGINT
AS
BEGIN
    IF EXISTS (SELECT 1 FROM [Order_Product] WHERE [Order_Code] = @Order_Code AND [Product_Code] = @Product_Code)
    BEGIN
        -- Increment the amount
        UPDATE [Order_Product]
        SET [Amount] = [Amount] + 1
        WHERE [Order_Code] = @Order_Code AND [Product_Code] = @Product_Code;
    END
    ELSE
    BEGIN
        -- Insert new entry with Amount = 1
        INSERT INTO [Order_Product] ([Order_Code], [Product_Code], [Amount])
        VALUES (@Order_Code, @Product_Code, 1);
    END

    -- Update Order's TotalService
    DECLARE @TotalPrice decimal(18,2);
    DECLARE @TotalService decimal(18,2);

    -- Calculate TotalPrice
    SELECT @TotalPrice = SUM(p.Price * op.Amount)
    FROM [Order_Product] op
    INNER JOIN [Product] p ON op.Product_Code = p.Code
    WHERE op.Order_Code = @Order_Code;

    -- Calculate TotalService as 5% of TotalPrice
    SET @TotalService = (@TotalPrice * 5) / 100;

    -- Update the Order
    UPDATE [Order]
    SET [TotalService] = @TotalService
    WHERE [Code] = @Order_Code;
END;
GO

CREATE or ALTER PROCEDURE sp_UpdateOrderProduct
    @Order_Code BIGINT,
    @Product_Code BIGINT,
    @Amount BIGINT
AS
BEGIN
    UPDATE [Order_Product]
    SET [Amount] = @Amount
    WHERE [Order_Code] = @Order_Code AND [Product_Code] = @Product_Code;

    -- Update Order's TotalService
    DECLARE @TotalPrice decimal(18,2);
    DECLARE @TotalService decimal(18,2);

    -- Calculate TotalPrice
    SELECT @TotalPrice = SUM(p.Price * op.Amount)
    FROM [Order_Product] op
    INNER JOIN [Product] p ON op.Product_Code = p.Code
    WHERE op.Order_Code = @Order_Code;

    -- Calculate TotalService as 5% of TotalPrice
    SET @TotalService = (@TotalPrice * 5) / 100;

    -- Update the Order
    UPDATE [Order]
    SET [TotalService] = @TotalService
    WHERE [Code] = @Order_Code;
END;
GO

CREATE or ALTER PROCEDURE sp_DeleteOrderProduct
    @Order_Code BIGINT,
    @Product_Code BIGINT
AS
BEGIN
    DELETE FROM [Order_Product]
    WHERE [Order_Code] = @Order_Code AND [Product_Code] = @Product_Code;

    -- Update Order's TotalService
    DECLARE @TotalPrice decimal(18,2);
    DECLARE @TotalService decimal(18,2);

    -- Check if there are remaining products in the order
    IF EXISTS (SELECT 1 FROM [Order_Product] WHERE [Order_Code] = @Order_Code)
    BEGIN
        -- Calculate TotalPrice
        SELECT @TotalPrice = SUM(p.Price * op.Amount)
        FROM [Order_Product] op
        INNER JOIN [Product] p ON op.Product_Code = p.Code
        WHERE op.Order_Code = @Order_Code;

        -- Calculate TotalService as 5% of TotalPrice
        SET @TotalService = (@TotalPrice * 5) / 100;
    END
    ELSE
    BEGIN
        -- No products left in order
        SET @TotalService = NULL;
    END

    -- Update the Order
    UPDATE [Order]
    SET [TotalService] = @TotalService
    WHERE [Code] = @Order_Code;
END;
GO
---------------Funciones para Order_Product---------------

---------------Funciones para ProofOfPayment---------------
GO
CREATE or ALTER PROCEDURE sp_GetAllProofOfPayments
AS
BEGIN
    SELECT * FROM [ProofOfPayment];
END;
GO

CREATE or ALTER PROCEDURE sp_GetProofOfPaymentByCode
    @Code BIGINT
AS
BEGIN
    SELECT * FROM [ProofOfPayment]
    WHERE [Code] = @Code;
END;
GO

CREATE or ALTER PROCEDURE sp_CreateProofOfPayment
    @CreditCardName NVARCHAR(MAX),
    @LastDigitsCreditCard BIGINT,
    @Date NVARCHAR(MAX),
    @Time NVARCHAR(MAX),
    @Order_Code BIGINT
AS
BEGIN
    DECLARE @TotalPayment decimal(18,2);
    DECLARE @ClientFullName NVARCHAR(MAX);
    DECLARE @ClientPhone BIGINT;

    -- Calculate TotalPayment
    DECLARE @TotalPrice decimal(18,2);
    SELECT @TotalPrice = SUM(p.Price * op.Amount)
    FROM [Order_Product] op
    INNER JOIN [Product] p ON op.Product_Code = p.Code
    WHERE op.Order_Code = @Order_Code;

    -- Calculate TotalPayment as TotalPrice + 5% of TotalPrice
    SET @TotalPayment = @TotalPrice + ((@TotalPrice * 5) / 100);

    -- Get ClientFullName and ClientPhone from Order
    DECLARE @Client_Id BIGINT;
    SELECT @Client_Id = [Client_Id]
    FROM [Order]
    WHERE [Code] = @Order_Code;

    SELECT @ClientFullName = [FullName], @ClientPhone = [Phone]
    FROM [Client]
    WHERE [Id] = @Client_Id;

    INSERT INTO [ProofOfPayment] ([CreditCardName], [LastDigitsCreditCard], [TotalPayment], [Date], [Time], [ClientFullName], [ClientPhone], [Order_Code])
    VALUES (@CreditCardName, @LastDigitsCreditCard, @TotalPayment, @Date, @Time, @ClientFullName, @ClientPhone, @Order_Code);
END;
GO

CREATE or ALTER PROCEDURE sp_UpdateProofOfPayment
    @Code BIGINT,
    @CreditCardName NVARCHAR(MAX),
    @LastDigitsCreditCard BIGINT,
    @Date NVARCHAR(MAX),
    @Time NVARCHAR(MAX),
    @Order_Code BIGINT
AS
BEGIN
    DECLARE @TotalPayment decimal(18,2);
    DECLARE @ClientFullName NVARCHAR(MAX);
    DECLARE @ClientPhone BIGINT;

    -- Calculate TotalPayment
    DECLARE @TotalPrice decimal(18,2);
    SELECT @TotalPrice = SUM(p.Price * op.Amount)
    FROM [Order_Product] op
    INNER JOIN [Product] p ON op.Product_Code = p.Code
    WHERE op.Order_Code = @Order_Code;

    -- Calculate TotalPayment as TotalPrice + 5% of TotalPrice
    SET @TotalPayment = @TotalPrice + ((@TotalPrice * 5) / 100);

    -- Get ClientFullName and ClientPhone from Order
    DECLARE @Client_Id BIGINT;
    SELECT @Client_Id = [Client_Id]
    FROM [Order]
    WHERE [Code] = @Order_Code;

    SELECT @ClientFullName = [FullName], @ClientPhone = [Phone]
    FROM [Client]
    WHERE [Id] = @Client_Id;

    UPDATE [ProofOfPayment]
    SET [CreditCardName] = @CreditCardName,
        [LastDigitsCreditCard] = @LastDigitsCreditCard,
        [TotalPayment] = @TotalPayment,
        [Date] = @Date,
        [Time] = @Time,
        [ClientFullName] = @ClientFullName,
        [ClientPhone] = @ClientPhone,
        [Order_Code] = @Order_Code
    WHERE [Code] = @Code;
END;
GO

CREATE or ALTER PROCEDURE sp_DeleteProofOfPayment
    @Code BIGINT
AS
BEGIN
    DELETE FROM [ProofOfPayment]
    WHERE [Code] = @Code;
END;
GO
---------------Funciones para ProofOfPayment---------------

---------------Funciones para FeedBack---------------
GO
CREATE or ALTER PROCEDURE sp_GetAllFeedBacks
AS
BEGIN
    SELECT * FROM [FeedBack];
END;
GO

CREATE or ALTER PROCEDURE sp_GetFeedBackById
    @Id BIGINT
AS
BEGIN
    SELECT * FROM [FeedBack]
    WHERE [Id] = @Id;
END;
GO

CREATE or ALTER PROCEDURE sp_CreateFeedBack
    @FeedBack_Business NVARCHAR(MAX),
    @BusinessGrade FLOAT,
    @FeedBack_Order NVARCHAR(MAX),
    @OrderGrade FLOAT,
    @FeedBack_DeliveryMan NVARCHAR(MAX),
    @DeliveryManGrade FLOAT,
    @FoodDeliveryMan_UserId NVARCHAR(450),
    @Order_Code BIGINT,
    @BusinessAssociate_Legal_Id BIGINT
AS
BEGIN
    INSERT INTO [FeedBack] ([FeedBack_Business], [BusinessGrade], [FeedBack_Order], [OrderGrade], [FeedBack_DeliveryMan], [DeliveryManGrade], [FoodDeliveryMan_UserId], [Order_Code], [BusinessAssociate_Legal_Id])
    VALUES (@FeedBack_Business, @BusinessGrade, @FeedBack_Order, @OrderGrade, @FeedBack_DeliveryMan, @DeliveryManGrade, @FoodDeliveryMan_UserId, @Order_Code, @BusinessAssociate_Legal_Id);
END;
GO

CREATE or ALTER PROCEDURE sp_UpdateFeedBack
    @Id BIGINT,
    @FeedBack_Business NVARCHAR(MAX),
    @BusinessGrade FLOAT,
    @FeedBack_Order NVARCHAR(MAX),
    @OrderGrade FLOAT,
    @FeedBack_DeliveryMan NVARCHAR(MAX),
    @DeliveryManGrade FLOAT,
    @FoodDeliveryMan_UserId NVARCHAR(450),
    @Order_Code BIGINT,
    @BusinessAssociate_Legal_Id BIGINT
AS
BEGIN
    UPDATE [FeedBack]
    SET [FeedBack_Business] = @FeedBack_Business,
        [BusinessGrade] = @BusinessGrade,
        [FeedBack_Order] = @FeedBack_Order,
        [OrderGrade] = @OrderGrade,
        [FeedBack_DeliveryMan] = @FeedBack_DeliveryMan,
        [DeliveryManGrade] = @DeliveryManGrade,
        [FoodDeliveryMan_UserId] = @FoodDeliveryMan_UserId,
        [Order_Code] = @Order_Code,
        [BusinessAssociate_Legal_Id] = @BusinessAssociate_Legal_Id
    WHERE [Id] = @Id;
END;
GO

CREATE or ALTER PROCEDURE sp_DeleteFeedBack
    @Id BIGINT
AS
BEGIN
    DELETE FROM [FeedBack]
    WHERE [Id] = @Id;
END;
GO
---------------Funciones para FeedBack---------------

---------------Funciones extras importantes---------------
CREATE OR ALTER FUNCTION dbo.ufn_GetAdminsByFilter(@Filter NVARCHAR(MAX))
RETURNS TABLE
AS
RETURN
(
    SELECT *
    FROM [Admin]
    WHERE @Filter IS NULL OR @Filter = '' OR [FullName] LIKE '%' + @Filter + '%'
);
GO

CREATE OR ALTER FUNCTION dbo.ufn_GetBusinessAssociatesByFilter(@Filter NVARCHAR(MAX))
RETURNS TABLE
AS
RETURN
(
    SELECT *
    FROM [BusinessAssociate]
    WHERE (@Filter IS NULL OR @Filter = '' OR [BusinessName] LIKE '%' + @Filter + '%')
      AND [State] IN ('En espera', 'Rechazado')
);
GO

CREATE OR ALTER FUNCTION dbo.ufn_GetBusinessManagersByFilter(@Filter NVARCHAR(MAX))
RETURNS TABLE
AS
RETURN
(
    SELECT *
    FROM [BusinessManager]
    WHERE @Filter IS NULL OR @Filter = '' OR [FullName] LIKE '%' + @Filter + '%'
);
GO

CREATE OR ALTER FUNCTION dbo.ufn_GetAcceptedBusinessAssociatesByFilter(@Filter NVARCHAR(MAX))
RETURNS TABLE
AS
RETURN
(
    SELECT *
    FROM [BusinessAssociate]
    WHERE (@Filter IS NULL OR @Filter = '' OR [BusinessName] LIKE '%' + @Filter + '%')
      AND [State] = 'Aceptado'
);
GO

CREATE OR ALTER FUNCTION dbo.ufn_GetClientsByFilter(@Filter NVARCHAR(MAX))
RETURNS TABLE
AS
RETURN
(
    SELECT *
    FROM [Client]
    WHERE @Filter IS NULL OR @Filter = '' OR [FullName] LIKE '%' + @Filter + '%'
);
GO

CREATE OR ALTER FUNCTION dbo.ufn_GetFoodDeliveryMenByFilter(@Filter NVARCHAR(MAX))
RETURNS TABLE
AS
RETURN
(
    SELECT *
    FROM [FoodDeliveryMan]
    WHERE @Filter IS NULL OR @Filter = '' OR [FullName] LIKE '%' + @Filter + '%'
);
GO

CREATE OR ALTER FUNCTION dbo.ufn_GetBusinessTypesByFilter(@Filter NVARCHAR(MAX))
RETURNS TABLE
AS
RETURN
(
    SELECT *
    FROM [BusinessType]
    WHERE @Filter IS NULL OR @Filter = '' OR [Name] LIKE '%' + @Filter + '%'
);
GO

CREATE OR ALTER FUNCTION dbo.ufn_GetOrdersByClientNameBusinessAndState(
    @BusinessAssociate_Legal_Id BIGINT,
    @Filter NVARCHAR(MAX)
)
RETURNS TABLE
AS
RETURN
(
    SELECT DISTINCT o.*
    FROM [Order] o
    INNER JOIN [Client] c ON o.Client_Id = c.Id
    INNER JOIN [Order_Product] op ON o.Code = op.Order_Code
    INNER JOIN [Product] p ON op.Product_Code = p.Code
    WHERE p.BusinessAssociate_Legal_Id = @BusinessAssociate_Legal_Id
      AND (@Filter IS NULL OR @Filter = '' OR c.FullName LIKE '%' + @Filter + '%')
      AND o.State = 'Listo para envio'
);
GO

CREATE OR ALTER FUNCTION dbo.ufn_GetOrdersByClientNameBusinessAndStateFilter(
    @BusinessAssociate_Legal_Id BIGINT,
    @ClientFilter NVARCHAR(MAX),
    @StateFilter NVARCHAR(MAX)
)
RETURNS TABLE
AS
RETURN
(
    SELECT DISTINCT o.*
    FROM [Order] o
    INNER JOIN [Client] c ON o.Client_Id = c.Id
    INNER JOIN [Order_Product] op ON o.Code = op.Order_Code
    INNER JOIN [Product] p ON op.Product_Code = p.Code
    WHERE p.BusinessAssociate_Legal_Id = @BusinessAssociate_Legal_Id
      AND (@ClientFilter IS NULL OR @ClientFilter = '' OR c.FullName LIKE '%' + @ClientFilter + '%')
      AND (@StateFilter IS NULL OR @StateFilter = '' OR o.State LIKE '%' + @StateFilter + '%')
);
GO


CREATE OR ALTER FUNCTION dbo.ufn_GetProductsByNameAndBusiness(
    @BusinessAssociate_Legal_Id BIGINT,
    @Filter NVARCHAR(MAX)
)
RETURNS TABLE
AS
RETURN
(
    SELECT *
    FROM [Product]
    WHERE [BusinessAssociate_Legal_Id] = @BusinessAssociate_Legal_Id
      AND (@Filter IS NULL OR @Filter = '' OR [Name] LIKE '%' + @Filter + '%')
);
GO

CREATE OR ALTER FUNCTION dbo.ufn_GetCartsByBusinessName(
    @Filter NVARCHAR(MAX)
)
RETURNS TABLE
AS
RETURN
(
    SELECT c.*
    FROM [Cart] c
    INNER JOIN [BusinessAssociate] ba ON c.BusinessAssociate_Legal_Id = ba.Legal_Id
    WHERE @Filter IS NULL OR @Filter = '' OR ba.BusinessName LIKE '%' + @Filter + '%'
);
GO

CREATE OR ALTER FUNCTION dbo.ufn_GetProductsByCartAndFilter(
    @Cart_Code BIGINT,
    @Filter NVARCHAR(MAX)
)
RETURNS TABLE
AS
RETURN
(
    SELECT p.*
    FROM [Product] p
    INNER JOIN [Cart_Product] cp ON p.Code = cp.Product_Code
    WHERE cp.Cart_Code = @Cart_Code
      AND (@Filter IS NULL OR @Filter = '' OR p.Name LIKE '%' + @Filter + '%')
);
GO

CREATE or ALTER FUNCTION dbo.ufn_GetLast10OrdersByClient(
    @Client_Id BIGINT
)
RETURNS TABLE
AS
RETURN
(
    SELECT TOP 10 o.*
    FROM [Order] o
    WHERE o.Client_Id = @Client_Id
    ORDER BY o.Code DESC
);
GO

CREATE OR ALTER FUNCTION dbo.ufn_GetOrdersByDateFilter(
    @DateFilter NVARCHAR(MAX)
)
RETURNS TABLE
AS
RETURN
(
    SELECT o.*
    FROM [Order] o
    INNER JOIN [ProofOfPayment] pop ON o.Code = pop.Order_Code
    WHERE @DateFilter IS NULL OR @DateFilter = '' OR pop.Date LIKE '%' + @DateFilter + '%'
);
GO
---------------Funciones extras importantes---------------

---------------Funciones principales importantes---------------
GO
CREATE or ALTER TRIGGER trg_PreventDeleteBusinessAssociateWithProducts
ON [BusinessAssociate]
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM [Product] p
        INNER JOIN deleted d ON p.BusinessAssociate_Legal_Id = d.Legal_Id
    )
    BEGIN
        RAISERROR ('Cannot delete BusinessAssociate because there are Products associated with it.', 16, 1);
        ROLLBACK TRANSACTION;
    END
END
GO

GO
CREATE or ALTER TRIGGER trg_PreventDeleteBusinessManagerWithBusinesses
ON [BusinessManager]
INSTEAD OF DELETE
AS
BEGIN
    -- Check if any businesses are associated with the business manager being deleted
    IF EXISTS (
        SELECT 1
        FROM [BusinessAssociate] ba
        INNER JOIN deleted d ON ba.BusinessManager_Email = d.Email
    )
    BEGIN
        RAISERROR ('Cannot delete BusinessManager because there are Businesses associated with it.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

    -- If no businesses are associated, proceed with deletion
    DELETE FROM [BusinessManager]
    WHERE Email IN (SELECT Email FROM deleted);
END

GO
CREATE or ALTER TRIGGER trg_ValidateProductPrice
ON [Product]
INSTEAD OF INSERT
AS
BEGIN
    INSERT INTO [Product] (Name, Price, Category, BusinessAssociate_Legal_Id)
    SELECT
        Name,
        CASE WHEN Price < 0 THEN 0 ELSE Price END AS Price,
        Category,
        BusinessAssociate_Legal_Id
    FROM inserted;
END
GO

CREATE OR ALTER VIEW vw_ConsolidatedSalesReport AS
SELECT
    c.Id AS ClientId,
    c.FullName AS ClientName,
    ba.BusinessName AS Affiliate,
    CAST(COUNT(DISTINCT o.Code) AS BIGINT) AS Purchases, -- Cast COUNT to BIGINT
    fd.FullName AS Conductor,
    SUM(op.Amount * p.Price) AS TotalAmount,
    (SUM(op.Amount * p.Price) * 5) / 100 AS ServiceAmount
FROM
    [Order] o
INNER JOIN
    [Client] c ON o.Client_Id = c.Id
INNER JOIN
    [Order_Product] op ON o.Code = op.Order_Code
INNER JOIN
    [Product] p ON op.Product_Code = p.Code
INNER JOIN
    [BusinessAssociate] ba ON p.BusinessAssociate_Legal_Id = ba.Legal_Id
INNER JOIN
    [FoodDeliveryMan] fd ON o.FoodDeliveryMan_UserId = fd.UserId
WHERE
    o.State = 'Finalizado'
GROUP BY
    c.Id,
    c.FullName,
    ba.BusinessName,
    fd.FullName;
GO

CREATE OR ALTER VIEW vw_SalesReportByAffiliate AS
SELECT
    ba.BusinessName AS Affiliate,
    CAST(COUNT(DISTINCT o.Code) AS BIGINT) AS Purchases, -- Cast COUNT to BIGINT
    SUM(op.Amount * p.Price) AS TotalAmount,
    (SUM(op.Amount * p.Price) * 5) / 100 AS ServiceAmount
FROM
    [Order] o
INNER JOIN
    [Order_Product] op ON o.Code = op.Order_Code
INNER JOIN
    [Product] p ON op.Product_Code = p.Code
INNER JOIN
    [BusinessAssociate] ba ON p.BusinessAssociate_Legal_Id = ba.Legal_Id
WHERE
    o.State = 'Finalizado'
GROUP BY
    ba.BusinessName
GO

CREATE OR ALTER VIEW vw_TopSellingProducts AS
SELECT
    p.Name AS ProductName,
    ba.BusinessName AS Affiliate,
    CAST(SUM(op.Amount) AS DECIMAL(18,2)) AS TotalSold, -- Cast SUM(op.Amount) to DECIMAL
    CAST(SUM(op.Amount * p.Price) AS DECIMAL(18,2)) AS TotalRevenue -- Ensure SUM is DECIMAL
FROM
    [Order] o
INNER JOIN
    [Order_Product] op ON o.Code = op.Order_Code
INNER JOIN
    [Product] p ON op.Product_Code = p.Code
INNER JOIN
    [BusinessAssociate] ba ON p.BusinessAssociate_Legal_Id = ba.Legal_Id
WHERE
    o.State = 'Finalizado'
GROUP BY
    p.Name,
    ba.BusinessName
GO

GO
CREATE OR ALTER PROCEDURE dbo.sp_GetBusinessesByFilterAndClientLocation
    @Client_Id BIGINT,
    @Filter NVARCHAR(MAX)
AS
BEGIN
    SELECT ba.*, 
        CASE
            WHEN ba.Province = cl.Province AND ba.Canton = cl.Canton AND ba.District = cl.District THEN 1
            WHEN ba.Canton = cl.Canton AND ba.District = cl.District THEN 2
            WHEN ba.Canton = cl.Canton THEN 3
            WHEN ba.Province = cl.Province THEN 4
            ELSE 5
        END AS ProximityOrder
    FROM [BusinessAssociate] ba
    CROSS JOIN (SELECT Province, Canton, District FROM [Client] WHERE Id = @Client_Id) cl
    WHERE (@Filter IS NULL OR @Filter = '' OR ba.BusinessName LIKE '%' + @Filter + '%')
      AND ba.State = 'Aceptado'
    ORDER BY ProximityOrder, ba.BusinessName;
END;
GO

GO
CREATE OR ALTER PROCEDURE sp_AssignOrderToDeliveryMan
    @OrderCode BIGINT
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the Order exists and is in state 'Listo para envio'
    IF NOT EXISTS (SELECT 1 FROM [Order] WHERE [Code] = @OrderCode AND [State] = 'Listo para envio')
    BEGIN
        RAISERROR('Order not found or not in "Listo para envio" state.', 16, 1);
        RETURN;
    END

    -- Get the Client_Id associated with the Order
    DECLARE @ClientId BIGINT;
    SELECT @ClientId = [Client_Id]
    FROM [Order]
    WHERE [Code] = @OrderCode;

    -- Get Client's address details
    DECLARE @ClientProvince NVARCHAR(MAX),
            @ClientCanton NVARCHAR(MAX),
            @ClientDistrict NVARCHAR(MAX),
            @ClientDirection NVARCHAR(MAX);

    SELECT @ClientProvince = [Province],
           @ClientCanton = [Canton],
           @ClientDistrict = [District],
           @ClientDirection = [Direction]
    FROM [Client]
    WHERE [Id] = @ClientId;

    -- Find available FoodDeliveryMan ordered by proximity
    DECLARE @FoodDeliveryManUserId NVARCHAR(450);

    SELECT TOP 1 @FoodDeliveryManUserId = fdm.[UserId]
    FROM [FoodDeliveryMan] fdm
    WHERE fdm.[State] = 'Disponible'
    ORDER BY
        CASE
            WHEN fdm.[Direction] = @ClientDirection THEN 1
            WHEN fdm.[District] = @ClientDistrict THEN 2
            WHEN fdm.[Canton] = @ClientCanton THEN 3
            WHEN fdm.[Province] = @ClientProvince THEN 4
            ELSE 5
        END,
        fdm.[UserId]; -- Secondary ordering to ensure deterministic selection

    -- If no FoodDeliveryMan is available, raise an error
    IF @FoodDeliveryManUserId IS NULL
    BEGIN
        RAISERROR('No FoodDeliveryMan available.', 16, 1);
        RETURN;
    END

    -- Update the Order's FoodDeliveryMan_UserId and State
    UPDATE [Order]
    SET [FoodDeliveryMan_UserId] = @FoodDeliveryManUserId,
        [State] = 'En camino'
    WHERE [Code] = @OrderCode;

    -- Update the FoodDeliveryMan's State to 'No disponible'
    UPDATE [FoodDeliveryMan]
    SET [State] = 'No disponible'
    WHERE [UserId] = @FoodDeliveryManUserId;
END
GO

GO
CREATE OR ALTER PROCEDURE sp_ReceiveOrderByClient
    @OrderCode BIGINT
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the Order exists
    IF NOT EXISTS (SELECT 1 FROM [Order] WHERE [Code] = @OrderCode)
    BEGIN
        RAISERROR('Order not found.', 16, 1);
        RETURN;
    END

    -- Get the FoodDeliveryMan_UserId associated with the Order
    DECLARE @FoodDeliveryManUserId NVARCHAR(450);
    SELECT @FoodDeliveryManUserId = [FoodDeliveryMan_UserId]
    FROM [Order]
    WHERE [Code] = @OrderCode;

    -- Update the Order's State to 'Finalizado'
    UPDATE [Order]
    SET [State] = 'Finalizado'
    WHERE [Code] = @OrderCode;

    -- Update the FoodDeliveryMan's State to 'Disponible'
    UPDATE [FoodDeliveryMan]
    SET [State] = 'Disponible'
    WHERE [UserId] = @FoodDeliveryManUserId;
END
GO
---------------Funciones principales importantes---------------