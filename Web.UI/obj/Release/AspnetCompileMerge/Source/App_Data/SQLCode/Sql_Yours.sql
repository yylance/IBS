--说明：本SQL文本仅为简化SQL语句存放使用，一行只能定义一条简单语句，复杂的请单独创建文件存放。
--说明：本SQL文本仅存储下拉框所使用的语句。
--说明：注意命名规范:C_模块名_业务名 and PCode in (@parent)
--说明：你的业务语句，请写在这个文件（不要写在Sql_Combobox.sql中，避免升级时被复盖）
C_Paper_Type =	SELECT ID AS value,Name AS text FROM tPaperType
C_Paper_Code =  SELECT ID AS value,PaperCode AS text FROM tPaperInfo
C_Supplier_Name = SELECT ID AS value,CompanyName AS text FROM tSupplier
C_StockHouse_Code = SELECT ID AS value,StockHouseCode AS text FROM tStockHouse
C_StockHouse_Type =  SELECT ID AS value,StockHouseType AS text FROM tStockHouseType
