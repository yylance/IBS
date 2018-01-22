{"ColumnName":"ExceInfoID","SqlType":"System.Guid","IsAutoIncrement":false,"IsCanNull":false,"MaxSize":36,"Scale":0,"IsPrimaryKey":true,"DefaultValue":[#GUID],"Description":"主键","TableName":"Config_ExcelInfo","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""},
{"ColumnName":"ExcelID","SqlType":"System.Guid","IsAutoIncrement":false,"IsCanNull":true,"MaxSize":36,"Scale":0,"IsPrimaryKey":false,"DefaultValue":"","Description":"外键ID","TableName":"Config_ExcelInfo","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""},
{"ColumnName":"ExcelName","SqlType":"System.String","IsAutoIncrement":false,"IsCanNull":true,"MaxSize":400,"Scale":0,"IsPrimaryKey":false,"DefaultValue":"","Description":"Excel列名","TableName":"Config_ExcelInfo","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""},
{"ColumnName":"TableName","SqlType":"System.String","IsAutoIncrement":false,"IsCanNull":true,"MaxSize":100,"Scale":0,"IsPrimaryKey":false,"DefaultValue":"","Description":"表名","TableName":"Config_ExcelInfo","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""},
{"ColumnName":"Field","SqlType":"System.String","IsAutoIncrement":false,"IsCanNull":true,"MaxSize":100,"Scale":0,"IsPrimaryKey":false,"DefaultValue":"","Description":"表字段名","TableName":"Config_ExcelInfo","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""},
{"ColumnName":"Formatter","SqlType":"System.String","IsAutoIncrement":false,"IsCanNull":true,"MaxSize":100,"Scale":0,"IsPrimaryKey":false,"DefaultValue":"","Description":"格式化","TableName":"Config_ExcelInfo","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""},
{"ColumnName":"IsUnique","SqlType":"System.Boolean","IsAutoIncrement":false,"IsCanNull":false,"MaxSize":1,"Scale":0,"IsPrimaryKey":false,"DefaultValue":"(0)","Description":"是否唯一","TableName":"Config_ExcelInfo","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""},
{"ColumnName":"IsForeignkey","SqlType":"System.Boolean","IsAutoIncrement":false,"IsCanNull":true,"MaxSize":1,"Scale":0,"IsPrimaryKey":false,"DefaultValue":"","Description":"是否外键","TableName":"Config_ExcelInfo","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""},
{"ColumnName":"ForeignTable","SqlType":"System.String","IsAutoIncrement":false,"IsCanNull":true,"MaxSize":100,"Scale":0,"IsPrimaryKey":false,"DefaultValue":"","Description":"外键对应的表名","TableName":"Config_ExcelInfo","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""},
{"ColumnName":"IsRequired","SqlType":"System.Boolean","IsAutoIncrement":false,"IsCanNull":true,"MaxSize":1,"Scale":0,"IsPrimaryKey":false,"DefaultValue":"(0)","Description":"是否必填","TableName":"Config_ExcelInfo","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""},
{"ColumnName":"CreateTime","SqlType":"System.DateTime","IsAutoIncrement":false,"IsCanNull":true,"MaxSize":23,"Scale":3,"IsPrimaryKey":false,"DefaultValue":[#GETDATE],"Description":"创建日期","TableName":"Config_ExcelInfo","IsUniqueKey":false,"IsForeignKey":false,"FKTableName":""}