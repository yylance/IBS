SELECT o.*,i.NewPaperLabel,PaperCode,PaperWidth,OuterDiameter,InnerDiameter,InWeight,i.Length as InLength,SupplierID,StockHouseCode,InOutState FROM tPaperReStockInDetail o left join tPaperNewStockInDetail i on o.PaperLabel= i.NewPaperLabel