using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActionBackend
{
    public class Service : IService
    {
        public int id { get; set;  }
        public string name { get; set; }
        public string action { get; set; }
        public string type { get; set; }

        public Service(int id, string name, string action, string type)
        {
            this.id = id;
            this.name = name;
            this.action = action;
            this.type = type;
        }

        public void show()
        {
            Console.WriteLine("id: {0}", id);
            Console.WriteLine("name: {0}", name);
            Console.WriteLine("action: {0}", action);
            Console.WriteLine("type: {0}\n", type);
        }
    }
}
