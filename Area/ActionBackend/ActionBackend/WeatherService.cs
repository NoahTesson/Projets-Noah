using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;

namespace ActionBackend
{
    public class WeatherService
    {
        HttpClient client = new HttpClient();
        private Dictionary<string, double> _locationTemperature = new Dictionary<string, double>();
        private Dictionary<string, string> _locationConditions = new Dictionary<string, string>();
        private ReactionDispatcher dispatcher = new ReactionDispatcher();
        public WeatherService()
        {
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("User-Agent", "area HttpClient");
        }

        public async void sendReactionWeatherTemperatureChanged(double temperature, string location, int userId, int reactionId, string reactionToken)
        {
            string message = String.Format("{0} temperature is now: {1}",
                location,
                temperature
            );
            Console.WriteLine(message);
            dispatcher.dispatchReaction(reactionId, reactionToken, message, userId);
        }

        public async void sendReactionWeatherConditionsChanged(string conditions, string location, int userId, int reactionId, string reactionToken)
        {
            string message = String.Format("{0} Conditions are now: {1}",
                location,
                conditions
            );
            Console.WriteLine(message);
            dispatcher.dispatchReaction(reactionId, reactionToken, message, userId);
        }

        public async void checkWeatherTemperatureChange(string location, int userId, int reactionId, string reactionToken)
        {
            string key = location + "_" + userId.ToString();
            if (_locationTemperature.ContainsKey(key))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + HttpUtility.UrlEncode(location) + "?unitGroup=metric&include=current&key=Z2NWPEBKM7P949NPUP9TRWBPJ&contentType=json");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                double temperature = Convert.ToDouble(JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["currentConditions"]))["temp"].ToString());

                if (temperature != _locationTemperature[key])
                    sendReactionWeatherTemperatureChanged(temperature, JsonSerializer.Deserialize<Dictionary<string, object>>(res)["resolvedAddress"].ToString(), userId, reactionId, reactionToken);
                _locationTemperature[key] = temperature;
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + HttpUtility.UrlEncode(location) + "?unitGroup=metric&include=current&key=Z2NWPEBKM7P949NPUP9TRWBPJ&contentType=json");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                _locationTemperature[key] = Convert.ToDouble(JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["currentConditions"]))["temp"].ToString());
            }
        }

        public async void checkWeatherConditionsChange(string location, int userId, int reactionId, string reactionToken)
        {
            string key = location + "_" + userId.ToString();
            if (_locationConditions.ContainsKey(key))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + HttpUtility.UrlEncode(location) + "?unitGroup=metric&include=current&key=Z2NWPEBKM7P949NPUP9TRWBPJ&contentType=json");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                string conditions = JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["currentConditions"]))["conditions"].ToString();

                Console.WriteLine(conditions);
                if (conditions != _locationConditions[key])
                    sendReactionWeatherConditionsChanged(conditions, JsonSerializer.Deserialize<Dictionary<string, object>>(res)["resolvedAddress"].ToString(), userId, reactionId, reactionToken);
                _locationConditions[key] = conditions;
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + HttpUtility.UrlEncode(location) + "?unitGroup=metric&include=current&key=Z2NWPEBKM7P949NPUP9TRWBPJ&contentType=json");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                _locationConditions[key] = JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["currentConditions"]))["conditions"].ToString();
            }
        }
    }
}
