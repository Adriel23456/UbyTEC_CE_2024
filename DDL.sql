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

---------------Funciones para Eliminar TODO---------------
-- Eliminar Stored Procedures
GO
DECLARE @sql NVARCHAR(MAX) = '';
SELECT @sql += 'DROP PROCEDURE ' + QUOTENAME(SCHEMA_NAME(schema_id)) + '.' + QUOTENAME(name) + '; '
FROM sys.procedures;
IF LEN(@sql) > 0
    EXEC sp_executesql @sql;
GO

-- Eliminar Funciones
DECLARE @sql NVARCHAR(MAX) = '';
SELECT @sql += 'DROP FUNCTION ' + QUOTENAME(SCHEMA_NAME(schema_id)) + '.' + QUOTENAME(name) + '; '
FROM sys.objects
WHERE type_desc LIKE '%FUNCTION%';
IF LEN(@sql) > 0
    EXEC sp_executesql @sql;
GO

-- Eliminar Vistas
DECLARE @sql NVARCHAR(MAX) = '';
SELECT @sql += 'DROP VIEW ' + QUOTENAME(SCHEMA_NAME(schema_id)) + '.' + QUOTENAME(name) + '; '
FROM sys.views;
IF LEN(@sql) > 0
    EXEC sp_executesql @sql;
GO

-- Eliminar Triggers
DECLARE @sql NVARCHAR(MAX) = '';
SELECT @sql += 'DROP TRIGGER ' + QUOTENAME(SCHEMA_NAME(o.schema_id)) + '.' + QUOTENAME(t.name) + '; '
FROM sys.triggers t
INNER JOIN sys.objects o ON t.object_id = o.object_id
WHERE t.parent_class = 1; -- Solo triggers a nivel de tabla
IF LEN(@sql) > 0
    EXEC sp_executesql @sql;
GO

--Eliminacion de la tablas
Drop table BusinessAssociatePhone;
Drop table BusinessAssociate;
Drop table AdminPhone;
Drop table BusinessManagerPhone;
Drop table FoodDeliveryManPhone;
Drop table Admin;
Drop table BusinessManager;
Drop table FoodDeliveryMan;
Drop table Client;
Drop table BusinessType;
---------------Funciones para Eliminar TODO---------------


---------------Funciones para probar detalles---------------
Select * from Admin;
Select * from AdminPhone;
Select * from BusinessManager;
Select * from BusinessManagerPhone;
Select * from FoodDeliveryMan;
Select * from FoodDeliveryManPhone;
Select * from Client;
Select * from BusinessType;
Select * from BusinessAssociate;
Select * from BusinessAssociatePhone;
---------------Funciones para probar detalles---------------