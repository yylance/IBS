--说明:本SQL文本仅为简化SQL语句存放使用，一行只能定义一条简单语句，复杂的请单独创建文件存放。
--视图语句（MAction调用）和SQL语句（MProc调用)参考命名规范
--示例：
--视图语句：	V_SYS_Users= select * from Users 
--SQL语句：	S_SYS_Users= select * from Users  
C_My_Info = select id as value,name as text from tmyinfo
C_Paper_Type =	SELECT ID AS value,Name AS text FROM tPaperType

C_Paper_ID2Code =  SELECT ID AS value,PaperCode AS text FROM tPaperInfo
C_Paper_Code2Code =  SELECT PaperCode AS value,PaperCode AS text FROM tPaperInfo
C_Paper_Code2Description =  SELECT PaperCode AS value, PaperCode+'('+(Select Name from tPaperType WHERE ID = tPaperInfo.PaperType)+convert(varchar(10),PaperUnitWeight)+'g)' AS text FROM tPaperInfo  



C_Board_ID2Code =  SELECT ID AS value,Code AS text FROM tPaperBoardInfo
C_FlutesFormulas_FormulaCode = SELECT ID AS value,FormulaCode AS text FROM tFlutesFormulas
C_Supplier_Name = SELECT ID AS value,CompanyName AS text FROM tSupplier
C_Supplier_ID2Description = SELECT ID AS value,Phonetic+'('+CompanyCode+')' AS text FROM tSupplier

C_Custom_ID2Name = SELECT ID AS value,CompanyName AS text FROM tCustom
C_Custom_ID2Phonetic = SELECT ID AS value,Phonetic AS text FROM tCustom
C_Custom_ID2Code = SELECT ID AS value,CompanyCode AS text FROM tCustom
C_Custom_Name2Code = SELECT CompanyName AS value,CompanyCode AS text FROM tCustom
C_Custom_Code2Code = SELECT CompanyCode AS value,CompanyCode AS text FROM tCustom
C_Custom_Phonetic2Phonetic = SELECT Phonetic AS value,Phonetic AS text FROM tCustom
C_StockHouse_Code = SELECT StockHouseCode AS value,StockHouseCode+(Select StockHouseType from tStockHouseType WHERE ID = tStockHouse.Type)AS text FROM tStockHouse

C_StockHouse_Type =  SELECT ID AS value,StockHouseType AS text FROM tStockHouseType
C_StockInOutType_Name = SELECT Code AS value,Code+'('+Name+')' AS text FROM tStockInOutType
C_StockInType_Name = SELECT Code AS value,Code+'('+Name+')' AS text FROM tStockInOutType WHERE Type ='I'
C_StockOutType_Name = SELECT Code AS value,Code+'('+Name+')' AS text FROM tStockInOutType WHERE Type ='O'
C_StockReInType_Name = SELECT Code AS value,Code+'('+Name+')' AS text FROM tStockInOutType WHERE Type ='RI'

C_DCS_CustomList=SELECT fID as value, Name as text from Customs 
C_DCS_LineTypes=SELECT fID as value, Name as text from LineTypes
C_DCS_UserList=SELECT fID as value, Name as text from users





