
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


---------------Funciones para Eliminar TODO---------------
Drop table __EFMigrationsHistory;
Drop table AdminPhone;
Drop table Admin;

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
---------------Funciones para Eliminar TODO---------------

---------------Funciones para probar detalles---------------
Select * from Admin;
---------------Funciones para probar detalles---------------