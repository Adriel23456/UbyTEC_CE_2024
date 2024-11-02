---------------Funciones de creacion de la base de datos en general----------
GO
CREATE TABLE [Admin] (
    [Id] int NOT NULL,
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
    [Identification] int NOT NULL IDENTITY,
    [Name] nvarchar(450) NOT NULL,
    CONSTRAINT [PK_BusinessType] PRIMARY KEY ([Identification])
);
GO
CREATE TABLE [Client] (
    [Id] int NOT NULL,
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
    [Phone] int NOT NULL,
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
    [Admin_id] int NOT NULL,
    [Phone] int NOT NULL,
    CONSTRAINT [PK_AdminPhone] PRIMARY KEY ([Admin_id], [Phone]),
    CONSTRAINT [FK_AdminPhone_Admin_Admin_id] FOREIGN KEY ([Admin_id]) REFERENCES [Admin] ([Id]) ON DELETE CASCADE
);
GO
CREATE TABLE [BusinessManagerPhone] (
    [BusinessManager_Email] nvarchar(450) NOT NULL,
    [Phone] int NOT NULL,
    CONSTRAINT [PK_BusinessManagerPhone] PRIMARY KEY ([BusinessManager_Email], [Phone]),
    CONSTRAINT [FK_BusinessManagerPhone_BusinessManager_BusinessManager_Email] FOREIGN KEY ([BusinessManager_Email]) REFERENCES [BusinessManager] ([Email]) ON DELETE CASCADE
);
GO
CREATE TABLE [BusinessAssociate] (
    [Legal_Id] int NOT NULL,
    [Email] nvarchar(max) NOT NULL,
    [State] nvarchar(max) NOT NULL,
    [BusinessName] nvarchar(max) NOT NULL,
    [Direction] AS [Province] + ', ' + [Canton] + ', ' + [District] PERSISTED,
    [Province] nvarchar(max) NOT NULL,
    [Canton] nvarchar(max) NOT NULL,
    [District] nvarchar(max) NOT NULL,
    [SINPE] int NOT NULL,
    [RejectReason] nvarchar(max) NULL,
    [BusinessManager_Email] nvarchar(450) NOT NULL,
    [BusinessType_Identification] int NOT NULL,
    CONSTRAINT [PK_BusinessAssociate] PRIMARY KEY ([Legal_Id]),
    CONSTRAINT [FK_BusinessAssociate_BusinessManager_BusinessManager_Email] FOREIGN KEY ([BusinessManager_Email]) REFERENCES [BusinessManager] ([Email]) ON DELETE CASCADE,
    CONSTRAINT [FK_BusinessAssociate_BusinessType_BusinessType_Identification] FOREIGN KEY ([BusinessType_Identification]) REFERENCES [BusinessType] ([Identification]) ON DELETE CASCADE        
);
GO
CREATE TABLE [Cart] (
    [Code] int NOT NULL IDENTITY,
    [BusinessAssociate_Legal_Id] int NULL,
    [TotalProductsPrice] int NULL,
    [Client_Id] int NOT NULL,
    CONSTRAINT [PK_Cart] PRIMARY KEY ([Code]),
    CONSTRAINT [FK_Cart_Client_Client_Id] FOREIGN KEY ([Client_Id]) REFERENCES [Client] ([Id]) ON DELETE CASCADE
);
GO
CREATE TABLE [FoodDeliveryManPhone] (
    [FoodDeliveryMan_UserId] nvarchar(450) NOT NULL,
    [Phone] int NOT NULL,
    CONSTRAINT [PK_FoodDeliveryManPhone] PRIMARY KEY ([FoodDeliveryMan_UserId], [Phone]),
    CONSTRAINT [FK_FoodDeliveryManPhone_FoodDeliveryMan_FoodDeliveryMan_UserId] FOREIGN KEY ([FoodDeliveryMan_UserId]) REFERENCES [FoodDeliveryMan] ([UserId]) ON DELETE CASCADE
);
GO
CREATE TABLE [Order] (
    [Code] int NOT NULL IDENTITY,
    [State] nvarchar(max) NOT NULL,
    [TotalService] int NULL,
    [Direction] nvarchar(max) NULL,
    [Client_Id] int NOT NULL,
    [FoodDeliveryMan_UserId] nvarchar(450) NOT NULL,
    CONSTRAINT [PK_Order] PRIMARY KEY ([Code]),
    CONSTRAINT [FK_Order_Client_Client_Id] FOREIGN KEY ([Client_Id]) REFERENCES [Client] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_Order_FoodDeliveryMan_FoodDeliveryMan_UserId] FOREIGN KEY ([FoodDeliveryMan_UserId]) REFERENCES [FoodDeliveryMan] ([UserId]) ON DELETE CASCADE
);
GO
CREATE TABLE [BusinessAssociatePhone] (
    [BusinessAssociate_Legal_Id] int NOT NULL,
    [Phone] int NOT NULL,
    CONSTRAINT [PK_BusinessAssociatePhone] PRIMARY KEY ([BusinessAssociate_Legal_Id], [Phone]),
    CONSTRAINT [FK_BusinessAssociatePhone_BusinessAssociate_BusinessAssociate_Legal_Id] FOREIGN KEY ([BusinessAssociate_Legal_Id]) REFERENCES [BusinessAssociate] ([Legal_Id]) ON DELETE CASCADE 
);
GO
CREATE TABLE [Product] (
    [Code] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [Price] int NOT NULL,
    [Category] nvarchar(max) NOT NULL,
    [BusinessAssociate_Legal_Id] int NOT NULL,
    CONSTRAINT [PK_Product] PRIMARY KEY ([Code]),
    CONSTRAINT [FK_Product_BusinessAssociate_BusinessAssociate_Legal_Id] FOREIGN KEY ([BusinessAssociate_Legal_Id]) REFERENCES [BusinessAssociate] ([Legal_Id]) ON DELETE CASCADE
);
GO
CREATE TABLE [FeedBack] (
    [Id] int NOT NULL IDENTITY,
    [FeedBack_Business] nvarchar(max) NOT NULL,
    [BusinessGrade] float NOT NULL,
    [FeedBack_Order] nvarchar(max) NOT NULL,
    [OrderGrade] float NOT NULL,
    [FeedBack_DeliveryMan] nvarchar(max) NOT NULL,
    [DeliveryManGrade] float NOT NULL,
    [FoodDeliveryMan_UserId] nvarchar(450) NOT NULL,
    [Order_Code] int NOT NULL,
    [BusinessAssociate_Legal_Id] int NOT NULL,
    CONSTRAINT [PK_FeedBack] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_FeedBack_BusinessAssociate_BusinessAssociate_Legal_Id] FOREIGN KEY ([BusinessAssociate_Legal_Id]) REFERENCES [BusinessAssociate] ([Legal_Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_FeedBack_FoodDeliveryMan_FoodDeliveryMan_UserId] FOREIGN KEY ([FoodDeliveryMan_UserId]) REFERENCES [FoodDeliveryMan] ([UserId]) ON DELETE NO ACTION,
    CONSTRAINT [FK_FeedBack_Order_Order_Code] FOREIGN KEY ([Order_Code]) REFERENCES [Order] ([Code]) ON DELETE NO ACTION
);
GO
CREATE TABLE [ProofOfPayment] (
    [Code] int NOT NULL IDENTITY,
    [CreditCardName] nvarchar(max) NOT NULL,
    [LastDigitsCreditCard] int NOT NULL,
    [TotalPayment] int NULL,
    [Date] nvarchar(max) NOT NULL,
    [Time] nvarchar(max) NOT NULL,
    [ClientFullName] nvarchar(max) NULL,
    [ClientPhone] int NULL,
    [Order_Code] int NOT NULL,
    CONSTRAINT [PK_ProofOfPayment] PRIMARY KEY ([Code]),
    CONSTRAINT [FK_ProofOfPayment_Order_Order_Code] FOREIGN KEY ([Order_Code]) REFERENCES [Order] ([Code]) ON DELETE CASCADE
);
GO
CREATE TABLE [Cart_Product] (
    [Cart_Code] int NOT NULL,
    [Product_Code] int NOT NULL,
    [Amount] int NOT NULL,
    CONSTRAINT [PK_Cart_Product] PRIMARY KEY ([Cart_Code], [Product_Code]),
    CONSTRAINT [FK_Cart_Product_Cart_Cart_Code] FOREIGN KEY ([Cart_Code]) REFERENCES [Cart] ([Code]) ON DELETE CASCADE,
    CONSTRAINT [FK_Cart_Product_Product_Product_Code] FOREIGN KEY ([Product_Code]) REFERENCES [Product] ([Code]) ON DELETE CASCADE
);
GO
CREATE TABLE [Order_Product] (
    [Order_Code] int NOT NULL,
    [Product_Code] int NOT NULL,
    [Amount] int NOT NULL,
    CONSTRAINT [PK_Order_Product] PRIMARY KEY ([Order_Code], [Product_Code]),
    CONSTRAINT [FK_Order_Product_Order_Order_Code] FOREIGN KEY ([Order_Code]) REFERENCES [Order] ([Code]) ON DELETE CASCADE,
    CONSTRAINT [FK_Order_Product_Product_Product_Code] FOREIGN KEY ([Product_Code]) REFERENCES [Product] ([Code]) ON DELETE CASCADE
);
GO
CREATE TABLE [ProductPhoto] (
    [Product_Code] int NOT NULL,
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
CREATE PROCEDURE sp_GetAllAdmins
AS
BEGIN
    SELECT * FROM [Admin];
END;

GO
CREATE PROCEDURE sp_GetAdminById
    @Id INT
AS
BEGIN
    SELECT *
    FROM [Admin]
    WHERE [Id] = @Id;
END;

GO
CREATE PROCEDURE sp_CreateAdmin
    @Id INT,
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
CREATE PROCEDURE sp_UpdateAdmin
    @Id INT,
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
CREATE PROCEDURE sp_DeleteAdmin
    @Id INT
AS
BEGIN
    DELETE FROM [Admin]
    WHERE [Id] = @Id;
END;
---------------Funciones para Admin---------------

---------------Funciones para AdminPhone---------------
GO
CREATE PROCEDURE sp_GetAllAdminPhones
AS
BEGIN
    SELECT * FROM [AdminPhone];
END;

GO
CREATE PROCEDURE sp_GetAdminPhonesByAdminId
    @Admin_id INT
AS
BEGIN
    SELECT * FROM [AdminPhone]
    WHERE [Admin_id] = @Admin_id;
END;

GO
CREATE PROCEDURE sp_CreateAdminPhone
    @Admin_id INT,
    @Phone INT
AS
BEGIN
    INSERT INTO [AdminPhone] ([Admin_id], [Phone])
    VALUES (@Admin_id, @Phone);
END;

GO
CREATE PROCEDURE sp_UpdateAdminPhone
    @Admin_id INT,
    @OldPhone INT,
    @NewPhone INT
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
CREATE PROCEDURE sp_DeleteAdminPhone
    @Admin_id INT,
    @Phone INT
AS
BEGIN
    DELETE FROM [AdminPhone]
    WHERE [Admin_id] = @Admin_id AND [Phone] = @Phone;
END;
GO
---------------Funciones para AdminPhone---------------

---------------Funciones para BusinessManager---------------
GO
CREATE PROCEDURE sp_GetAllBusinessManagers
AS
BEGIN
    SELECT * FROM [BusinessManager];
END;
GO

CREATE PROCEDURE sp_GetBusinessManagerByEmail
    @Email NVARCHAR(MAX)
AS
BEGIN
    SELECT *
    FROM [BusinessManager]
    WHERE [Email] = @Email;
END;
GO

CREATE PROCEDURE sp_CreateBusinessManager
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

CREATE PROCEDURE sp_UpdateBusinessManager
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

CREATE PROCEDURE sp_DeleteBusinessManager
    @Email NVARCHAR(MAX)
AS
BEGIN
    DELETE FROM [BusinessManager]
    WHERE [Email] = @Email;
END;
GO
---------------Funciones para BusinessManager---------------

---------------Funciones para BusinessManagerPhone---------------
GO
CREATE PROCEDURE sp_GetAllBusinessManagerPhones
AS
BEGIN
    SELECT * FROM [BusinessManagerPhone];
END;
GO

CREATE PROCEDURE sp_GetBusinessManagerPhonesByEmail
    @BusinessManager_Email NVARCHAR(MAX)
AS
BEGIN
    SELECT * FROM [BusinessManagerPhone]
    WHERE [BusinessManager_Email] = @BusinessManager_Email;
END;
GO

CREATE PROCEDURE sp_CreateBusinessManagerPhone
    @BusinessManager_Email NVARCHAR(MAX),
    @Phone INT
AS
BEGIN
    INSERT INTO [BusinessManagerPhone] ([BusinessManager_Email], [Phone])
    VALUES (@BusinessManager_Email, @Phone);
END;
GO

CREATE PROCEDURE sp_UpdateBusinessManagerPhone
    @BusinessManager_Email NVARCHAR(MAX),
    @OldPhone INT,
    @NewPhone INT
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

CREATE PROCEDURE sp_DeleteBusinessManagerPhone
    @BusinessManager_Email NVARCHAR(MAX),
    @Phone INT
AS
BEGIN
    DELETE FROM [BusinessManagerPhone]
    WHERE [BusinessManager_Email] = @BusinessManager_Email AND [Phone] = @Phone;
END;
GO
---------------Funciones para BusinessManagerPhone---------------

---------------Funciones para FoodDeliveryMan---------------
GO
CREATE PROCEDURE sp_GetAllFoodDeliveryMen
AS
BEGIN
    SELECT * FROM [FoodDeliveryMan];
END;
GO

CREATE PROCEDURE sp_GetFoodDeliveryManByUserId
    @UserId NVARCHAR(MAX)
AS
BEGIN
    SELECT *
    FROM [FoodDeliveryMan]
    WHERE [UserId] = @UserId;
END;
GO

CREATE PROCEDURE sp_CreateFoodDeliveryMan
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

CREATE PROCEDURE sp_UpdateFoodDeliveryMan
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

CREATE PROCEDURE sp_DeleteFoodDeliveryMan
    @UserId NVARCHAR(MAX)
AS
BEGIN
    DELETE FROM [FoodDeliveryMan]
    WHERE [UserId] = @UserId;
END;
GO
---------------Funciones para FoodDeliveryMan---------------

---------------Funciones para FoodDeliveryManPhone---------------
GO
CREATE PROCEDURE sp_GetAllFoodDeliveryManPhones
AS
BEGIN
    SELECT * FROM [FoodDeliveryManPhone];
END;
GO

CREATE PROCEDURE sp_GetFoodDeliveryManPhonesByUserId
    @FoodDeliveryMan_UserId NVARCHAR(MAX)
AS
BEGIN
    SELECT * FROM [FoodDeliveryManPhone]
    WHERE [FoodDeliveryMan_UserId] = @FoodDeliveryMan_UserId;
END;
GO

CREATE PROCEDURE sp_CreateFoodDeliveryManPhone
    @FoodDeliveryMan_UserId NVARCHAR(MAX),
    @Phone INT
AS
BEGIN
    INSERT INTO [FoodDeliveryManPhone] ([FoodDeliveryMan_UserId], [Phone])
    VALUES (@FoodDeliveryMan_UserId, @Phone);
END;
GO

CREATE PROCEDURE sp_UpdateFoodDeliveryManPhone
    @FoodDeliveryMan_UserId NVARCHAR(MAX),
    @OldPhone INT,
    @NewPhone INT
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

CREATE PROCEDURE sp_DeleteFoodDeliveryManPhone
    @FoodDeliveryMan_UserId NVARCHAR(MAX),
    @Phone INT
AS
BEGIN
    DELETE FROM [FoodDeliveryManPhone]
    WHERE [FoodDeliveryMan_UserId] = @FoodDeliveryMan_UserId AND [Phone] = @Phone;
END;
GO
---------------Funciones para FoodDeliveryManPhone---------------

---------------Funciones para Client---------------
GO
CREATE PROCEDURE sp_GetAllClients
AS
BEGIN
    SELECT * FROM [Client];
END;
GO

CREATE PROCEDURE sp_GetClientById
    @Id INT
AS
BEGIN
    SELECT * FROM [Client]
    WHERE [Id] = @Id;
END;
GO

CREATE PROCEDURE sp_CreateClient
    @Id INT,
    @UserId NVARCHAR(450),
    @Name NVARCHAR(MAX),
    @FirstSurname NVARCHAR(MAX),
    @SecondSurname NVARCHAR(MAX),
    @Province NVARCHAR(MAX),
    @Canton NVARCHAR(MAX),
    @District NVARCHAR(MAX),
    @Password NVARCHAR(MAX),
    @Phone INT,
    @BirthDate NVARCHAR(10)
AS
BEGIN
    INSERT INTO [Client] ([Id], [UserId], [Name], [FirstSurname], [SecondSurname], [Province], [Canton], [District], [Password], [Phone], [BirthDate])
    VALUES (@Id, @UserId, @Name, @FirstSurname, @SecondSurname, @Province, @Canton, @District, @Password, @Phone, @BirthDate);
END;
GO

CREATE PROCEDURE sp_UpdateClient
    @Id INT,
    @UserId NVARCHAR(450),
    @Name NVARCHAR(MAX),
    @FirstSurname NVARCHAR(MAX),
    @SecondSurname NVARCHAR(MAX),
    @Province NVARCHAR(MAX),
    @Canton NVARCHAR(MAX),
    @District NVARCHAR(MAX),
    @Password NVARCHAR(MAX),
    @Phone INT,
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

CREATE PROCEDURE sp_DeleteClient
    @Id INT
AS
BEGIN
    DELETE FROM [Client]
    WHERE [Id] = @Id;
END;
GO
---------------Funciones para Client---------------

---------------Funciones para BusinessType---------------
GO
CREATE PROCEDURE sp_GetAllBusinessTypes
AS
BEGIN
    SELECT * FROM [BusinessType];
END;
GO

CREATE PROCEDURE sp_GetBusinessTypeById
    @Identification INT
AS
BEGIN
    SELECT * FROM [BusinessType]
    WHERE [Identification] = @Identification;
END;
GO

GO
CREATE PROCEDURE sp_CreateBusinessType
    @Name NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO [BusinessType] ([Name])
    VALUES (@Name);
END;
GO

CREATE PROCEDURE sp_UpdateBusinessType
    @Identification INT,
    @Name NVARCHAR(MAX)
AS
BEGIN
    UPDATE [BusinessType]
    SET [Name] = @Name
    WHERE [Identification] = @Identification;
END;
GO

CREATE PROCEDURE sp_DeleteBusinessType
    @Identification INT
AS
BEGIN
    DELETE FROM [BusinessType]
    WHERE [Identification] = @Identification;
END;
GO
---------------Funciones para BusinessType---------------

---------------Funciones para BusinessAssociate---------------
GO
CREATE PROCEDURE sp_GetAllBusinessAssociates
AS
BEGIN
    SELECT * FROM [BusinessAssociate];
END;
GO

CREATE PROCEDURE sp_GetBusinessAssociateById
    @Legal_Id INT
AS
BEGIN
    SELECT * FROM [BusinessAssociate]
    WHERE [Legal_Id] = @Legal_Id;
END;
GO

CREATE PROCEDURE sp_CreateBusinessAssociate
    @Legal_Id INT,
    @Email NVARCHAR(MAX),
    @State NVARCHAR(MAX),
    @BusinessName NVARCHAR(MAX),
    @Province NVARCHAR(MAX),
    @Canton NVARCHAR(MAX),
    @District NVARCHAR(MAX),
    @SINPE INT,
    @BusinessManager_Email NVARCHAR(MAX),
    @BusinessType_Identification INT
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

CREATE PROCEDURE sp_UpdateBusinessAssociate
    @Legal_Id INT,
    @Email NVARCHAR(MAX),
    @State NVARCHAR(MAX),
    @BusinessName NVARCHAR(MAX),
    @Province NVARCHAR(MAX),
    @Canton NVARCHAR(MAX),
    @District NVARCHAR(MAX),
    @SINPE INT,
    @RejectReason NVARCHAR(MAX) = NULL,
    @BusinessManager_Email NVARCHAR(MAX),
    @BusinessType_Identification INT
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

CREATE PROCEDURE sp_DeleteBusinessAssociate
    @Legal_Id INT
AS
BEGIN
    DELETE FROM [BusinessAssociate]
    WHERE [Legal_Id] = @Legal_Id;
END;
GO
---------------Funciones para BusinessAssociate---------------

---------------Funciones para BusinessAssociatePhone---------------
GO
CREATE PROCEDURE sp_GetAllBusinessAssociatePhones
AS
BEGIN
    SELECT * FROM [BusinessAssociatePhone];
END;
GO

CREATE PROCEDURE sp_GetBusinessAssociatePhonesByLegalId
    @BusinessAssociate_Legal_Id INT
AS
BEGIN
    SELECT * FROM [BusinessAssociatePhone]
    WHERE [BusinessAssociate_Legal_Id] = @BusinessAssociate_Legal_Id;
END;
GO

CREATE PROCEDURE sp_CreateBusinessAssociatePhone
    @BusinessAssociate_Legal_Id INT,
    @Phone INT
AS
BEGIN
    INSERT INTO [BusinessAssociatePhone] ([BusinessAssociate_Legal_Id], [Phone])
    VALUES (@BusinessAssociate_Legal_Id, @Phone);
END;
GO

CREATE PROCEDURE sp_UpdateBusinessAssociatePhone
    @BusinessAssociate_Legal_Id INT,
    @OldPhone INT,
    @NewPhone INT
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

CREATE PROCEDURE sp_DeleteBusinessAssociatePhone
    @BusinessAssociate_Legal_Id INT,
    @Phone INT
AS
BEGIN
    DELETE FROM [BusinessAssociatePhone]
    WHERE [BusinessAssociate_Legal_Id] = @BusinessAssociate_Legal_Id AND [Phone] = @Phone;
END;
GO
---------------Funciones para BusinessAssociatePhone---------------

---------------Funciones para Product---------------
GO
CREATE PROCEDURE sp_GetAllProducts
AS
BEGIN
    SELECT * FROM [Product];
END;
GO

CREATE PROCEDURE sp_GetProductByCode
    @Code INT
AS
BEGIN
    SELECT * FROM [Product]
    WHERE [Code] = @Code;
END;
GO

CREATE PROCEDURE sp_CreateProduct
    @Name NVARCHAR(MAX),
    @Price INT,
    @Category NVARCHAR(MAX),
    @BusinessAssociate_Legal_Id INT
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

CREATE PROCEDURE sp_UpdateProduct
    @Code INT,
    @Name NVARCHAR(MAX),
    @Price INT,
    @Category NVARCHAR(MAX),
    @BusinessAssociate_Legal_Id INT
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

CREATE PROCEDURE sp_DeleteProduct
    @Code INT
AS
BEGIN
    DELETE FROM [Product]
    WHERE [Code] = @Code;
END;
GO
---------------Funciones para Product---------------

---------------Funciones para ProductPhoto---------------
GO
CREATE PROCEDURE sp_GetAllProductPhotos
AS
BEGIN
    SELECT * FROM [ProductPhoto];
END;
GO

CREATE PROCEDURE sp_GetProductPhotosByProductCode
    @Product_Code INT
AS
BEGIN
    SELECT * FROM [ProductPhoto]
    WHERE [Product_Code] = @Product_Code;
END;
GO

CREATE PROCEDURE sp_CreateProductPhoto
    @Product_Code INT,
    @PhotoURL NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO [ProductPhoto] ([Product_Code], [PhotoURL])
    VALUES (@Product_Code, @PhotoURL);
END;
GO

CREATE PROCEDURE sp_UpdateProductPhoto
    @Product_Code INT,
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

CREATE PROCEDURE sp_DeleteProductPhoto
    @Product_Code INT,
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
CREATE PROCEDURE sp_GetAllCarts
AS
BEGIN
    SELECT * FROM [Cart];
END;
GO

CREATE PROCEDURE sp_GetCartByCode
    @Code INT
AS
BEGIN
    SELECT * FROM [Cart]
    WHERE [Code] = @Code;
END;
GO

CREATE PROCEDURE sp_CreateCart
    @Client_Id INT
AS
BEGIN
    INSERT INTO [Cart] ([Client_Id])
    VALUES (@Client_Id);
END;
GO

CREATE PROCEDURE sp_UpdateCart
    @Code INT,
    @Client_Id INT
AS
BEGIN
    UPDATE [Cart]
    SET [Client_Id] = @Client_Id
    WHERE [Code] = @Code;
END;
GO

CREATE PROCEDURE sp_DeleteCart
    @Code INT
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
CREATE PROCEDURE sp_GetAllCartProducts
AS
BEGIN
    SELECT * FROM [Cart_Product];
END;
GO

CREATE PROCEDURE sp_GetCartProductsByCartCode
    @Cart_Code INT
AS
BEGIN
    SELECT * FROM [Cart_Product]
    WHERE [Cart_Code] = @Cart_Code;
END;
GO

CREATE PROCEDURE sp_CreateCartProduct
    @Cart_Code INT,
    @Product_Code INT
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
    DECLARE @BusinessAssociate_Legal_Id INT;
    DECLARE @TotalProductsPrice INT;

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

CREATE PROCEDURE sp_UpdateCartProduct
    @Cart_Code INT,
    @Product_Code INT,
    @Amount INT
AS
BEGIN
    UPDATE [Cart_Product]
    SET [Amount] = @Amount
    WHERE [Cart_Code] = @Cart_Code AND [Product_Code] = @Product_Code;

    -- Update Cart's BusinessAssociate_Legal_Id and TotalProductsPrice
    DECLARE @BusinessAssociate_Legal_Id INT;
    DECLARE @TotalProductsPrice INT;

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

CREATE PROCEDURE sp_DeleteCartProduct
    @Cart_Code INT,
    @Product_Code INT
AS
BEGIN
    DELETE FROM [Cart_Product]
    WHERE [Cart_Code] = @Cart_Code AND [Product_Code] = @Product_Code;

    -- Update Cart's BusinessAssociate_Legal_Id and TotalProductsPrice
    DECLARE @BusinessAssociate_Legal_Id INT;
    DECLARE @TotalProductsPrice INT;

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
CREATE PROCEDURE sp_GetAllOrders
AS
BEGIN
    SELECT * FROM [Order];
END;
GO

CREATE PROCEDURE sp_GetOrderByCode
    @Code INT
AS
BEGIN
    SELECT * FROM [Order]
    WHERE [Code] = @Code;
END;
GO

CREATE PROCEDURE sp_CreateOrder
    @State NVARCHAR(MAX),
    @Client_Id INT,
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

CREATE PROCEDURE sp_UpdateOrder
    @Code INT,
    @State NVARCHAR(MAX),
    @Client_Id INT,
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

CREATE PROCEDURE sp_DeleteOrder
    @Code INT
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
CREATE PROCEDURE sp_GetAllOrderProducts
AS
BEGIN
    SELECT * FROM [Order_Product];
END;
GO

CREATE PROCEDURE sp_GetOrderProductsByOrderCode
    @Order_Code INT
AS
BEGIN
    SELECT * FROM [Order_Product]
    WHERE [Order_Code] = @Order_Code;
END;
GO

CREATE PROCEDURE sp_CreateOrderProduct
    @Order_Code INT,
    @Product_Code INT
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
    DECLARE @TotalPrice INT;
    DECLARE @TotalService INT;

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

CREATE PROCEDURE sp_UpdateOrderProduct
    @Order_Code INT,
    @Product_Code INT,
    @Amount INT
AS
BEGIN
    UPDATE [Order_Product]
    SET [Amount] = @Amount
    WHERE [Order_Code] = @Order_Code AND [Product_Code] = @Product_Code;

    -- Update Order's TotalService
    DECLARE @TotalPrice INT;
    DECLARE @TotalService INT;

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

CREATE PROCEDURE sp_DeleteOrderProduct
    @Order_Code INT,
    @Product_Code INT
AS
BEGIN
    DELETE FROM [Order_Product]
    WHERE [Order_Code] = @Order_Code AND [Product_Code] = @Product_Code;

    -- Update Order's TotalService
    DECLARE @TotalPrice INT;
    DECLARE @TotalService INT;

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
CREATE PROCEDURE sp_GetAllProofOfPayments
AS
BEGIN
    SELECT * FROM [ProofOfPayment];
END;
GO

CREATE PROCEDURE sp_GetProofOfPaymentByCode
    @Code INT
AS
BEGIN
    SELECT * FROM [ProofOfPayment]
    WHERE [Code] = @Code;
END;
GO

CREATE PROCEDURE sp_CreateProofOfPayment
    @CreditCardName NVARCHAR(MAX),
    @LastDigitsCreditCard INT,
    @Date NVARCHAR(MAX),
    @Time NVARCHAR(MAX),
    @Order_Code INT
AS
BEGIN
    DECLARE @TotalPayment INT;
    DECLARE @ClientFullName NVARCHAR(MAX);
    DECLARE @ClientPhone INT;

    -- Calculate TotalPayment
    DECLARE @TotalPrice INT;
    SELECT @TotalPrice = SUM(p.Price * op.Amount)
    FROM [Order_Product] op
    INNER JOIN [Product] p ON op.Product_Code = p.Code
    WHERE op.Order_Code = @Order_Code;

    -- Calculate TotalPayment as TotalPrice + 5% of TotalPrice
    SET @TotalPayment = @TotalPrice + ((@TotalPrice * 5) / 100);

    -- Get ClientFullName and ClientPhone from Order
    DECLARE @Client_Id INT;
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

CREATE PROCEDURE sp_UpdateProofOfPayment
    @Code INT,
    @CreditCardName NVARCHAR(MAX),
    @LastDigitsCreditCard INT,
    @Date NVARCHAR(MAX),
    @Time NVARCHAR(MAX),
    @Order_Code INT
AS
BEGIN
    DECLARE @TotalPayment INT;
    DECLARE @ClientFullName NVARCHAR(MAX);
    DECLARE @ClientPhone INT;

    -- Calculate TotalPayment
    DECLARE @TotalPrice INT;
    SELECT @TotalPrice = SUM(p.Price * op.Amount)
    FROM [Order_Product] op
    INNER JOIN [Product] p ON op.Product_Code = p.Code
    WHERE op.Order_Code = @Order_Code;

    -- Calculate TotalPayment as TotalPrice + 5% of TotalPrice
    SET @TotalPayment = @TotalPrice + ((@TotalPrice * 5) / 100);

    -- Get ClientFullName and ClientPhone from Order
    DECLARE @Client_Id INT;
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

CREATE PROCEDURE sp_DeleteProofOfPayment
    @Code INT
AS
BEGIN
    DELETE FROM [ProofOfPayment]
    WHERE [Code] = @Code;
END;
GO
---------------Funciones para ProofOfPayment---------------

---------------Funciones para FeedBack---------------
GO
CREATE PROCEDURE sp_GetAllFeedBacks
AS
BEGIN
    SELECT * FROM [FeedBack];
END;
GO

CREATE PROCEDURE sp_GetFeedBackById
    @Id INT
AS
BEGIN
    SELECT * FROM [FeedBack]
    WHERE [Id] = @Id;
END;
GO

CREATE PROCEDURE sp_CreateFeedBack
    @FeedBack_Business NVARCHAR(MAX),
    @BusinessGrade FLOAT,
    @FeedBack_Order NVARCHAR(MAX),
    @OrderGrade FLOAT,
    @FeedBack_DeliveryMan NVARCHAR(MAX),
    @DeliveryManGrade FLOAT,
    @FoodDeliveryMan_UserId NVARCHAR(450),
    @Order_Code INT,
    @BusinessAssociate_Legal_Id INT
AS
BEGIN
    INSERT INTO [FeedBack] ([FeedBack_Business], [BusinessGrade], [FeedBack_Order], [OrderGrade], [FeedBack_DeliveryMan], [DeliveryManGrade], [FoodDeliveryMan_UserId], [Order_Code], [BusinessAssociate_Legal_Id])
    VALUES (@FeedBack_Business, @BusinessGrade, @FeedBack_Order, @OrderGrade, @FeedBack_DeliveryMan, @DeliveryManGrade, @FoodDeliveryMan_UserId, @Order_Code, @BusinessAssociate_Legal_Id);
END;
GO

CREATE PROCEDURE sp_UpdateFeedBack
    @Id INT,
    @FeedBack_Business NVARCHAR(MAX),
    @BusinessGrade FLOAT,
    @FeedBack_Order NVARCHAR(MAX),
    @OrderGrade FLOAT,
    @FeedBack_DeliveryMan NVARCHAR(MAX),
    @DeliveryManGrade FLOAT,
    @FoodDeliveryMan_UserId NVARCHAR(450),
    @Order_Code INT,
    @BusinessAssociate_Legal_Id INT
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

CREATE PROCEDURE sp_DeleteFeedBack
    @Id INT
AS
BEGIN
    DELETE FROM [FeedBack]
    WHERE [Id] = @Id;
END;
GO
---------------Funciones para FeedBack---------------