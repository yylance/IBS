using Aries.Core;
using Aries.Core.Auth;
using Aries.Core.Config;
using Aries.Core.DB;
using Aries.Core.Extend;
using CYQ.Data;
using CYQ.Data.Table;
using CYQ.Data.Tool;
using System;
using System.Collections.Generic;
using System.Text;

namespace Aries.Controllers
{
    /// <summary>
    /// 默认请求地址
    /// </summary>
    public partial class DefaultController : Controller
    {
        protected override MDataRow GetOne()
        {
            switch (ObjName)
            {
                case "V_Test"://处理Demo中文本数据库
                    if (AppConfig.DB.DefaultDalType == DalType.Txt)
                    {
                        return Select(GridConfig.SelectType.Show).Rows[0];
                    }
                    break;
            }
            return base.GetOne();
        }
        protected override MDataTable Select(GridConfig.SelectType st)
        {
            switch (ObjName)
            {
                case "V_Test"://处理Demo中文本数据库
                    if (AppConfig.DB.DefaultDalType == DalType.Txt)
                    {
                        MDataTable dt = null;
                        using (MAction action = new MAction("Demo_TestA"))
                        {
                            dt = action.Select();
                        }
                        dt.JoinOnName = "ID";
                        MDataTable joinDt = dt.Join("Demo_TestB", "ID");
                        return joinDt.Select(PageIndex, PageSize, GetWhere() + GetOrderBy("ID"), GridConfig.GetSelectColumns(ObjName, st));
                    }
                    break;

            }
            return base.Select(st);
        }
        //protected override void BeforeInvoke(string methodName)
        //{
        //    //CYQ.Data 已具备自动缓存功能，所以可以简化掉一些手工的缓存机制。
        //    //switch (functionName.ToLower())
        //    //{
        //    //    case "add":
        //    //    case "delete":
        //    //    case "update":
        //    //        //清缓存
        //    //        switch (ObjName)
        //    //        {
        //    //            case "Sys_Action":
        //    //                SysMenu.ActionTable = null;
        //    //                break;
        //    //            case "Sys_Menu":
        //    //                SysMenu.MenuTable = null;
        //    //                break;
        //    //        }
        //    //        break;
        //    //}
        //}
        /// <summary>
        /// 执行无返回结果集的存储过程(带参)
        /// </summary>
        public void RunProcNoQueryWithpara()
        {
            bool result = false;
            string ProcName = ObjName;//存储过程名称
            int index = ObjName.IndexOf(".");//存储过程名称中存在'.'分隔符时，分隔符前表示数据库名，后面表示存储过程名
            if (index > -1) { ProcName = ObjName.Substring(index + 1).Trim(' '); };

            int paracount = Query<int>("paracnt");//获取存储过程参数个数

            string para0vlaue = Query<string>("para0_value");

            string outMsg = ProcName + "Run faile!";

            using (MProc proc = new MProc(ProcName, CrossDb.GetDBName(ObjName)))
            {
                //参数个数大于零时
                if (paracount > 0) {
                    for (int i = 0; i < paracount; i++) {
                        proc.Set(Query<string>("para" + i.ToString() + "_name"), Query<string>("para" + i.ToString() + "_value"));
                    }
                }

                try
                {
                    result = proc.ExeNonQuery() > -2;
                    jsonResult = JsonHelper.OutResult(result, ProcName + " Run OK !");
                }
                catch (Exception err)
                {
                    jsonResult = JsonHelper.OutResult(result, outMsg);
                    Log.WriteLogToTxt(err);
                }
            }
        }
        /// <summary>
        /// 执行无返回结果集的存储过程
        /// </summary>
        public void RunProcNonQuery()
        {
            bool result = false;
            string ProcName = ObjName;
            int index = ObjName.IndexOf(".");
            if (index > -1) { ProcName = ObjName.Substring(index+1).Trim(' '); };
            string outMsg = ProcName + "Run faile!";

            using (MProc proc = new MProc(ProcName, CrossDb.GetDBName(ObjName)))
            {
                try
                {
                    result = proc.ExeNonQuery() > -2;
                    jsonResult = JsonHelper.OutResult(result, ProcName + " Run OK !");
                }
                catch (Exception err)
                {
                    jsonResult = JsonHelper.OutResult(result, outMsg);
                    Log.WriteLogToTxt(err);
                }
            }
        }
        public void Login()
        {
            string outMsg;
            bool result = UserAuth.Login(Query<string>("uid"), Query<string>("pwd"), out outMsg);
            jsonResult = JsonHelper.OutResult(result, outMsg);
        }
        public void ChangePassword()
        {
            bool result = UserAuth.ChangePassword(Query<string>("pwd"));
            jsonResult = JsonHelper.OutResult(result, result ? LangConst.UpdateSuccess : LangConst.UpdateError);
        }
        public void GetUserInfo()
        {
            MDataRow row = UserAuth.User;
            row.Columns.Remove("Password");//移除密码。
            row.Columns.Remove("UserInfoID");//移除重复的主建值。
            jsonResult = row.ToJson(true);//转小写（兼容oracle）
        }
        /// <summary>
        /// 用户首页呈现的菜单数据
        /// </summary>
        public void GetUserMenu()
        {
            MDataTable dt = p.UserMenu;
            if (IsUseUISite)//格式化菜单数据。
            {
                string ui = AppConfig.GetApp("UI").Trim('/');
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    MDataRow row = dt.Rows[i];
                    string url = row.Get<string>(Sys_Menu.MenuUrl).TrimStart('/');
                    if (url != "#" && !url.ToLower().StartsWith(ui.ToLower() + "/"))
                    {
                        row.Set(Sys_Menu.MenuUrl, "/" + ui + "/" + url);
                    }
                }
            }
            jsonResult = dt.ToJson(false, false, true);
        }
    }
}
