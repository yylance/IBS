/* 
��д��Ա��XXX 
��д���ڣ�2014-04-16 
 
�����޸ģ��ޣ����ڣ� 
 
����˵�����û���ͼ ------Demo���á� 
ʹ�� URL��/Web/SysAdmin/UserList.html
where a.CompanyID=@CompanyID 
*/ 
SELECT u.*,ui.* FROM Sys_User u left join Sys_UserInfo ui on u.UserID=ui.UserInfoID