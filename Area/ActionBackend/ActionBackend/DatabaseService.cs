using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Intrinsics.Arm;
using System.Text;
using System.Threading.Tasks;

namespace ActionBackend
{
    public class DatabaseService
    {
        private MySqlConnection _connection;
        public DatabaseService(string dbName, string dbUser, string dbPass, int port)
        {
            while (!connectToDb())
            {
                Thread.Sleep(1000);
            }
        }

        public bool connectToDb()
        {
            // string connection = @"server=localhost;user=root;database=area;port=3306";
            string connection = @"server=db;user=Test;database=area;port=3306;password=#Test1234";
            _connection = new MySqlConnection(connection);
            try
            {
                _connection.Open();
                Console.WriteLine("Connection Open  !");
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Couldn't connect " + ex.Message);
                return false;
            }
        }

        public string getTftApiKey()
        {
            string apiKey = "";
            string query = "SELECT * FROM tft_api_key";
            MySqlCommand cmd = new MySqlCommand(query, _connection);
            MySqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                apiKey = reader.GetFieldValue<string>("api_key");
            }
            reader.Close();
            cmd.Dispose();
            return apiKey;
        }

        public List<IService> getAllServices()
        {
            List<IService> res = new List<IService>();
            string query = "SELECT * FROM service";
            MySqlCommand cmd = new MySqlCommand(query, _connection);
            MySqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                res.Add(new Service(
                    reader.GetFieldValue<int>("id"),
                    reader.IsDBNull("name") ? "" : reader.GetFieldValue<string>("name"),
                    reader.IsDBNull("action") ? "" : reader.GetFieldValue<string>("action"),
                    reader.IsDBNull("type") ? "" : reader.GetFieldValue<string>("type")
                ));
            }
            reader.Close();
            cmd.Dispose();
            return res;
        }

        public List<IArea> getAllAreas()
        {
            string query = "SELECT * FROM rules";
            MySqlCommand cmd = new MySqlCommand(query, _connection);
            MySqlDataReader reader = cmd.ExecuteReader();
            List<IArea> res = new List<IArea>();

            while (reader.Read())
            {
                res.Add(new Area(
                    reader.GetFieldValue<int>("id"),
                    reader.IsDBNull("title") ? "" : reader.GetFieldValue<string>("title"),
                    reader.IsDBNull("description") ? "" : reader.GetFieldValue<string>("description"),
                    reader.GetFieldValue<int>("user_id"),
                    reader.GetFieldValue<int>("trigger_id"),
                    reader.IsDBNull("triggerToken") ? "" : reader.GetFieldValue<string>("triggerToken"),
                    reader.GetFieldValue<int>("action_id"),
                    reader.IsDBNull("actionToken") ? "" : reader.GetFieldValue<string>("actionToken"),
                    reader.GetFieldValue<DateTime>("created_at")
                ));
            }
            reader.Close();
            cmd.Dispose();
            return res;
        }

        ~DatabaseService()
        {
            _connection.Close();
        }
    }
}
