{"ColumnName":"MenuID","SqlType":"System.Guid","IsAutoIncrement":false,"IsCanNull":false,"MaxSize":36,"Scale":0,"IsPrimaryKey":true,"DefaultValue":[#GUID],"Description":"菜单标识","TableName":"Sys_Menu","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""},
{"ColumnName":"ParentMenuID","SqlType":"System.Guid","IsAutoIncrement":false,"IsCanNull":true,"MaxSize":36,"Scale":0,"IsPrimaryKey":false,"DefaultValue":"","Description":"上级ID","TableName":"Sys_Menu","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""},
{"ColumnName":"MenuName","SqlType":"System.String","IsAutoIncrement":false,"IsCanNull":false,"MaxSize":100,"Scale":0,"IsPrimaryKey":false,"DefaultValue":"","Description":"菜单名称","TableName":"Sys_Menu","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""},
{"ColumnName":"MenuUrl","SqlType":"System.String","IsAutoIncrement":false,"IsCanNull":false,"MaxSize":200,"Scale":0,"IsPrimaryKey":false,"DefaultValue":"","Description":"菜单地址","TableName":"Sys_Menu","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""},
{"ColumnName":"MenuLevel","SqlType":"System.Int32","IsAutoIncrement":false,"IsCanNull":true,"MaxSize":10,"Scale":0,"IsPrimaryKey":false,"DefaultValue":"","Description":"菜单层级","TableName":"Sys_Menu","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""},
{"ColumnName":"SortOrder","SqlType":"System.Int32","IsAutoIncrement":false,"IsCanNull":false,"MaxSize":10,"Scale":0,"IsPrimaryKey":false,"DefaultValue":"","Description":"排序号","TableName":"Sys_Menu","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""},
{"ColumnName":"MenuIcon","SqlType":"System.String","IsAutoIncrement":false,"IsCanNull":true,"MaxSize":500,"Scale":0,"IsPrimaryKey":false,"DefaultValue":"","Description":"菜单图标路径（未用到）","TableName":"Sys_Menu","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""},
{"ColumnName":"BigMenuIcon","SqlType":"System.String","IsAutoIncrement":false,"IsCanNull":true,"MaxSize":500,"Scale":0,"IsPrimaryKey":false,"DefaultValue":"","Description":"常用菜单图标（未用到）","TableName":"Sys_Menu","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""},
{"ColumnName":"IsShortcut","SqlType":"System.Boolean","IsAutoIncrement":false,"IsCanNull":true,"MaxSize":1,"Scale":0,"IsPrimaryKey":false,"DefaultValue":"","Description":"快捷键（未用到）","TableName":"Sys_Menu","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""},
{"ColumnName":"IsShow","SqlType":"System.Int32","IsAutoIncrement":false,"IsCanNull":true,"MaxSize":10,"Scale":0,"IsPrimaryKey":false,"DefaultValue":"(1)","Description":"是否显示","TableName":"Sys_Menu","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""},
{"ColumnName":"ActionIDs","SqlType":"System.String","IsAutoIncrement":false,"IsCanNull":true,"MaxSize":500,"Scale":0,"IsPrimaryKey":false,"DefaultValue":"","Description":"菜果的功能ID（以逗号分隔）","TableName":"Sys_Menu","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""}