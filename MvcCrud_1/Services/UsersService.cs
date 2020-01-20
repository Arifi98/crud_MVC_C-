using MvcCrud_1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.IO;

namespace MvcCrud_1.Services
{
    
    public class UsersService
    {
        //Db Connection string
        string DBCon = ConfigurationManager.ConnectionStrings["DBCon"].ConnectionString;

        //View users list
        public List<UsersModel> All()
        {
            List<UsersModel> _UsersModel = new List<UsersModel>();

            using (SqlConnection conn = new SqlConnection(DBCon))

            {
                using (SqlCommand cmd = new SqlCommand("GetUsers", conn))//call Stored Procedure

                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        UsersModel _UserModel = new UsersModel();
                        _UserModel.UserID = int.Parse(reader["UserID"].ToString());
                        _UserModel.Firstname = reader["Firstname"].ToString();
                        _UserModel.Middlename = reader["Middlename"].ToString();
                        _UserModel.Surname = reader["Surname"].ToString();
                        _UserModel.Email = reader["Email"].ToString();

                        _UsersModel.Add(_UserModel);
                    }
                }
            }

            return _UsersModel;

        }

        //Save use to the database
        public int CreateUser(UsersModel entity)
        {
            using (SqlConnection conn = new SqlConnection(DBCon))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("SaveUser", conn);//call Stored Procedure
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Firstname", entity.Firstname);
                cmd.Parameters.AddWithValue("@Middlename", entity.Middlename);
                cmd.Parameters.AddWithValue("@Surname", entity.Surname);
                cmd.Parameters.AddWithValue("@Email", entity.Email);
                int rs = cmd.ExecuteNonQuery();

                return rs;

            }
        }

        //Update User Details
        public int UpdateUser(UsersModel entity)
        {
            using (SqlConnection conn = new SqlConnection(DBCon))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("EditUser", conn); //call Stored Procedure
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserID", entity.UserID);
                cmd.Parameters.AddWithValue("@Firstname", entity.Firstname);
                cmd.Parameters.AddWithValue("@Middlename", entity.Middlename);
                cmd.Parameters.AddWithValue("@Surname", entity.Surname);
                cmd.Parameters.AddWithValue("@Email", entity.Email);

                int rs = cmd.ExecuteNonQuery();

                return rs;

            }
        }

        //Delete User from the database
        public int DeleteUser(UsersModel entity)
        {
            using (SqlConnection conn = new SqlConnection(DBCon))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("DeleteUser", conn);//call Stored Procedure
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserID", entity.UserID);

                int rs = cmd.ExecuteNonQuery();

                return rs;

            }
        }
    }
}