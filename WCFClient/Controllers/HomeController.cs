using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WCFClient.WCFService;

namespace WCFClient.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult WCFTest(FormCollection formCollection)
        {
            UserClient user = new UserClient();
            string username = formCollection["UserName"];
            string result = user.ShowName(username);
            ViewBag.Message = result;
            return View();
        }
    }
}