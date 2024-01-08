using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ActionBackend
{
    public class WorldTimeService
    {
        HttpClient client = new HttpClient();
        private Dictionary<string, string> _dateTime = new Dictionary<string, string>();
        private ReactionDispatcher dispatcher = new ReactionDispatcher();
        public WorldTimeService()
        {
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("User-Agent", "area HttpClient");
        }
        public async void sendReactionTimeChanged(string time, int userId, int reactionId, string reactionToken)
        {
            string message = String.Format("it is now: {0}",
                time
            );
            Console.WriteLine(message);
            dispatcher.dispatchReaction(reactionId, reactionToken, message, userId);
        }

        public async void checkTimeTrigger(string timeTrigger, int userId, int reactionId, string reactionToken)
        {
            try
            {
                DateTime.Parse(timeTrigger);
            } catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return;
            }
            string key = timeTrigger + "_" + userId.ToString();
            if (_dateTime.ContainsKey(key))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "http://worldtimeapi.org/api/timezone/Europe/Paris");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                string datetime = JsonSerializer.Deserialize<Dictionary<string, object>>(res)["datetime"].ToString();
                Console.WriteLine($"{DateTime.Parse(timeTrigger)} < {DateTime.Parse(datetime).AddHours(1)} && {DateTime.Parse(_dateTime[key]).AddHours(1)} < {DateTime.Parse(timeTrigger)}");
                if (DateTime.Parse(timeTrigger) < DateTime.Parse(datetime).AddHours(1) && DateTime.Parse(_dateTime[key]).AddHours(1) < DateTime.Parse(timeTrigger))
                    sendReactionTimeChanged(timeTrigger, userId, reactionId, reactionToken);
                _dateTime[key] = datetime;
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "http://worldtimeapi.org/api/timezone/Europe/Paris");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                string datetime = JsonSerializer.Deserialize<Dictionary<string, object>>(res)["datetime"].ToString();
                _dateTime[key] = datetime;
            }
        }
    }
}
