-- Eliminar todas las funciones
GO
DECLARE @FunctionSQL NVARCHAR(MAX) = ''
SELECT @FunctionSQL = @FunctionSQL + 
'DROP FUNCTION [' + SCHEMA_NAME(schema_id) + '].[' + name + '];' + CHAR(13)
FROM sys.objects
WHERE type_desc LIKE '%FUNCTION%';
IF LEN(@FunctionSQL) > 0
    EXEC sp_executesql @FunctionSQL;
GO

-- Eliminar todos los triggers
GO
DECLARE @TriggerSQL NVARCHAR(MAX) = ''
SELECT @TriggerSQL = @TriggerSQL + 
'DROP TRIGGER [' + SCHEMA_NAME(o.schema_id) + '].[' + t.name + '];' + CHAR(13)
FROM sys.triggers t
INNER JOIN sys.objects o ON t.parent_id = o.object_id
WHERE t.parent_class = 1; -- Solo triggers de tablas
IF LEN(@TriggerSQL) > 0
    EXEC sp_executesql @TriggerSQL;
GO

-- Eliminar todas las vistas
GO
DECLARE @ViewSQL NVARCHAR(MAX) = ''
SELECT @ViewSQL = @ViewSQL + 
'DROP VIEW [' + SCHEMA_NAME(schema_id) + '].[' + name + '];' + CHAR(13)
FROM sys.views 
WHERE name NOT IN ('database_firewall_rules')  -- Excluir vista del sistema
AND schema_id != 1;  -- Excluir esquema sys
IF LEN(@ViewSQL) > 0
   EXEC sp_executesql @ViewSQL;
GO

-- Eliminar todos los procedimientos almacenados
GO
DECLARE @ProcedureSQL NVARCHAR(MAX) = ''
SELECT @ProcedureSQL = @ProcedureSQL + 
'DROP PROCEDURE [' + SCHEMA_NAME(schema_id) + '].[' + name + '];' + CHAR(13)
FROM sys.procedures;
IF LEN(@ProcedureSQL) > 0
    EXEC sp_executesql @ProcedureSQL;
GO


-- Eliminar tablas en orden correcto considerando dependencias
GO
DECLARE @TableSQL NVARCHAR(MAX) = ''
;WITH RecursiveCTE AS (
    -- Tablas base (sin dependencias)
    SELECT  o.name AS TableName,
            SCHEMA_NAME(o.schema_id) AS SchemaName,
            0 AS Level
    FROM sys.objects o
    WHERE o.type = 'U'
    AND NOT EXISTS (
        SELECT 1 
        FROM sys.foreign_keys fk 
        WHERE fk.parent_object_id = o.object_id
    )

    UNION ALL

    -- Tablas recursivas con dependencias
    SELECT  o.name,
            SCHEMA_NAME(o.schema_id),
            r.Level + 1
    FROM sys.objects o
    INNER JOIN sys.foreign_keys fk ON fk.parent_object_id = o.object_id
    INNER JOIN RecursiveCTE r ON OBJECT_NAME(fk.referenced_object_id) = r.TableName
    WHERE o.type = 'U'
)
SELECT @TableSQL = @TableSQL +
'DROP TABLE [' + SchemaName + '].[' + TableName + '];' + CHAR(13)
FROM (
    SELECT DISTINCT TableName, SchemaName, Level
    FROM RecursiveCTE
) t
ORDER BY Level DESC;
IF LEN(@TableSQL) > 0
    EXEC sp_executesql @TableSQL;
GO