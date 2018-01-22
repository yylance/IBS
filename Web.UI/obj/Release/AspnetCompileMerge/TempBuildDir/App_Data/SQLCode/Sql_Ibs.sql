--说明：本SQL文本仅为简化SQL语句存放使用，一行只能定义一条简单语句，复杂的请单独创建文件存放。
--说明：本SQL文本仅存储下拉框所使用的语句。
--说明：注意命名规范:C_模块名_业务名 and PCode in (@parent)
--说明：你的业务语句，请写在这个文件（不要写在Sql_Combobox.sql中，避免升级时被复盖）

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

--C_StockHouse_Code = SELECT ID AS value,StockHouseCode AS text FROM tStockHouse

C_StockHouse_Code = SELECT StockHouseCode AS value,StockHouseCode+(Select StockHouseType from tStockHouseType WHERE ID = tStockHouse.Type)AS text FROM tStockHouse

C_StockHouse_Type =  SELECT ID AS value,StockHouseType AS text FROM tStockHouseType
C_StockInOutType_Name = SELECT Code AS value,Code+'('+Name+')' AS text FROM tStockInOutType
C_StockInType_Name = SELECT Code AS value,Code+'('+Name+')' AS text FROM tStockInOutType WHERE tStockInOutType.Type ='I'
C_StockOutType_Name = SELECT Code AS value,Code+'('+Name+')' AS text FROM tStockInOutType WHERE tStockInOutType.Type ='O'
C_StockReInType_Name = SELECT Code AS value,Code+'('+Name+')' AS text FROM tStockInOutType WHERE tStockInOutType.Type ='RI'

V_Supplier =  SELECT a.ID,CompanyCode,Phonetic FROM tSupplier a

V_IBS_PaperStockIn = SELECT i.ID,StockInOutCode,StockInOutType,RecordTime,RecordPeople,FromDepartment,FromPeople,Memo,t.Type FROM tPaperStockInOut i left join tStockInOutType t on i.StockInOutType= t.Code WHERE t.Type='I'
V_IBS_PaperStockOut = SELECT o.ID,StockInOutCode,StockInOutType,RecordTime,RecordPeople,ToDepartment,ToPeople,Memo,t.Type FROM tPaperStockInOut o left join tStockInOutType t on o.StockInOutType= t.Code WHERE t.Type='O'
V_IBS_PaperReStockIn = SELECT o.ID,StockInOutCode,StockInOutType,RecordTime,RecordPeople,ToDepartment,ToPeople,Memo,t.Type FROM tPaperStockInOut o left join tStockInOutType t on o.StockInOutType= t.Code WHERE t.Type='RI'

V_IBS_PaperNewStockInDetail = SELECT i.* FROM tPaperNewStockInDetail i
V_IBS_PaperStockOutDetail = SELECT o.*,i.NewPaperLabel,PaperCode,PaperWidth,OuterDiameter,InnerDiameter,InWeight,i.Length as InLength,SupplierID,StockHouseCode,InOutState FROM tPaperStockOutDetail o left join tPaperNewStockInDetail i on o.PaperLabel= i.NewPaperLabel
V_IBS_PaperReStockInDetail = SELECT o.*,i.NewPaperLabel,PaperCode,PaperWidth,OuterDiameter,InnerDiameter,InWeight,i.Length as InLength,SupplierID,StockHouseCode,InOutState FROM tPaperReStockInDetail o left join tPaperNewStockInDetail i on o.PaperLabel= i.NewPaperLabel

V_IBS_PaperInStock= SELECT i.* FROM tPaperNewStockInDetail i
V_IBS_BoardOrderTotalList = SELECT a.* ,b.CustomOrderCode,b.CustomID FROM tPaperBoardOrderDetail a left join tPaperBoardOrder b on a.OrderID=b.ID
V_IBS_PaperTotalList = SELECT a.* FROM tPaperNewStockInDetail a

V_PaperBoardOrder_List = SELECT a.* ,b.CompanyCode,CompanyName,Phonetic FROM tPaperBoardOrder a left join tCustom b on a.CustomID=b.ID
V_SYS_UserList = SELECT u.*,ui.* FROM Sys_User u left join Sys_UserInfo ui on u.UserID=ui.UserInfoID
--V_PaperBoardInfoList_PaperCode=SELECT   ID, DC, SC1Core, SC1Line, SC2Core, SC2Line, SC3Core, SC3Line FROM tPaperBoardInfo a 已经在数据库中写了视图

C_DCS_CustomList=SELECT fID as value, Name as text from Customs 
C_DCS_LineTypes=SELECT fID as value, Name as text from LineTypes
C_DCS_UserList=SELECT fID as value, Name as text from users