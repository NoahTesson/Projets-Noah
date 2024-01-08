using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActionBackend
{
    public interface IArea
    {
        int id { get; set;  }
        string title { get; set; }
        string description { get; set; }
        int user_id { get; set; }
        int trigger_id { get; set; }
        string triggerToken { get; set; }
        int action_id { get; set; }
        string actionToken { get; set; }
        DateTime created_at { get; set; }

        void show();
    }
}
