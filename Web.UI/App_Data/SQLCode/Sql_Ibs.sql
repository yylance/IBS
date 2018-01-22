--说明：本SQL文本仅为简化SQL语句存放使用，一行只能定义一条简单语句，复杂的请单独创建文件存放。
--说明：本SQL文本仅存储下拉框所使用的语句。
--说明：注意命名规范:C_模块名_业务名 and PCode in (@parent)
--说明：你的业务语句，请写在这个文件（不要写在Sql_Combobox.sql中，避免升级时被复盖）

V_SYS_UserList = SELECT u.*,ui.* FROM Sys_User u left join Sys_UserInfo ui on u.UserID=ui.UserInfoID
--V_PaperBoardInfoList_PaperCode=SELECT   ID, DC, SC1Core, SC1Line, SC2Core, SC2Line, SC3Core, SC3Line FROM tPaperBoardInfo a 已经在数据库中写了视图

