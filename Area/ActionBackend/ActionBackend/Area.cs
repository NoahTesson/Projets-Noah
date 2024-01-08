using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActionBackend
{
    internal class Area: IArea
    {
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public int user_id { get; set; }
        public int trigger_id { get; set; }
        public string triggerToken { get; set; }
        public int action_id { get; set; }
        public string actionToken { get; set; }
        public DateTime created_at { get; set; }

        public Area(int id, string title, string description, int user_id, int trigger_id, string triggerToken, int action_id, string actionToken, DateTime created_at)
        {
            this.id = id;
            this.title = title;
            this.description = description;
            this.user_id = user_id;
            this.trigger_id = trigger_id;
            this.triggerToken = triggerToken;
            this.action_id = action_id;
            this.actionToken = actionToken;
            this.created_at = created_at;
        }

        public void show()
        {
            Console.WriteLine("id: {0}", id);
            Console.WriteLine("title: {0}", title);
            Console.WriteLine("description: {0}", description);
            Console.WriteLine("user ID: {0}", user_id);
            Console.WriteLine("Trigger ID: {0}", trigger_id);
            Console.WriteLine("Trigger Token: {0}", triggerToken);
            Console.WriteLine("Action ID: {0}", action_id);
            Console.WriteLine("Action Token: {0}", actionToken);
            Console.WriteLine("Created At: {0}\n", created_at.ToString());
        }
    }
}
