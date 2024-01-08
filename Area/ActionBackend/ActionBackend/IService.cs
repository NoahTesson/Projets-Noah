using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActionBackend
{
    public interface IService
    {
        int id { get; set; }
        string name { get; set; }
        string action { get; set; }
        string type { get; set; }

        void show();
    }
}
