--˵��:��SQL�ı���Ϊ��SQL�����ʹ�ã�һ��ֻ�ܶ���һ������䣬���ӵ��뵥�������ļ���š�
--��ͼ��䣨MAction���ã���SQL��䣨MProc����)�ο������淶
--ʾ����
--��ͼ��䣺	V_SYS_Users= select * from Users 
--SQL��䣺	S_SYS_Users= select * from Users  

--V_SYS_UserInfoTest = SELECT u.*,r.RenZhengZhuanYe FROM System_Users u LEFT JOIN dbo.HZ_RenYuanXinXi r ON r.LoginID=u.LoginID
--V_PB_WorkOrder = SELECT * FROM dbo.PB_WorkOrder WHERE SendUser =:?UserID
--V_PB_WorkOrder = SELECT * FROM dbo.PB_WorkOrder WHERE SendUser = 3830




