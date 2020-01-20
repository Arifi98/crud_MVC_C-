using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcCrud_1.Models;
using MvcCrud_1.Services;


namespace MvcCrud_1.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        UsersService db = new UsersService();
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(db.All(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Get(int id)
        {
            var User = db.All().Find(x => x.UserID.Equals(id));
            return Json(User, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CreateUser(UsersModel entity)
        {
            var rs = db.CreateUser(entity);
            return Json(new { msg = rs }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateUser(UsersModel entity)
        {
            var rs = db.UpdateUser(entity);
            return Json(new { msg = rs }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteUser(UsersModel entity)
        {
            var rs = db.DeleteUser(entity);
            return Json(new { msg = rs }, JsonRequestBehavior.AllowGet);
        }
    }
}