using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ActionBackend
{
    public class CoinbaseService
    {
        HttpClient client = new HttpClient();
        private Dictionary<string, double> _bitcoinValues = new Dictionary<string, double>();
        private Dictionary<string, double> _ethValues = new Dictionary<string, double>();
        private ReactionDispatcher dispatcher = new ReactionDispatcher();
        public CoinbaseService()
        {
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("User-Agent", "area HttpClient");
        }
        public async void sendReactionBitcoinOverLimit(double btcValue, double limit, int userId, int reactionId, string reactionToken)
        {
            string message = String.Format("Bitcoin price just went {0} the '{1}' limit, current value: '{2}'",
                btcValue < limit ? "under" : "over",
                limit,
                btcValue
            );
            Console.WriteLine(message);
            dispatcher.dispatchReaction(reactionId, reactionToken, message, userId);
        }

        public async void sendReactionEtheriumOverLimit(double btcValue, double limit, int userId, int reactionId, string reactionToken)
        {
            string message = String.Format("Etherium price just went {0} the '{1}' limit, current value: '{2}'",
                btcValue < limit ? "under" : "over",
                limit,
                btcValue
            );
            Console.WriteLine(message);
            dispatcher.dispatchReaction(reactionId, reactionToken, message, userId);
        }

        public async void checkBitcoinOverLimit(string limit, int userId, int reactionId, string reactionToken)
        {
            string key = limit + "_" + userId.ToString();
            if (_bitcoinValues.ContainsKey(key))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                double btcValue = Convert.ToDouble(JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["bitcoin"]))["eur"].ToString());
                if ((_bitcoinValues[key] < Convert.ToDouble(limit) && btcValue >= Convert.ToDouble(limit)) || (_bitcoinValues[key] > Convert.ToDouble(limit) && btcValue <= Convert.ToDouble(limit)))
                    sendReactionBitcoinOverLimit(btcValue, Convert.ToDouble(limit), userId, reactionId, reactionToken);
                _bitcoinValues[key] = btcValue;
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                _bitcoinValues[key] = Convert.ToDouble(JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["bitcoin"]))["eur"].ToString());
            }
        }
        public async void checkEthOverLimit(string limit, int userId, int reactionId, string reactionToken)
        {
            string key = limit + "_" + userId.ToString();
            if (_ethValues.ContainsKey(key))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                double btcValue = Convert.ToDouble(JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["ethereum"]))["eur"].ToString());
                if ((_ethValues[key] < Convert.ToDouble(limit) && btcValue >= Convert.ToDouble(limit)) || (_ethValues[key] > Convert.ToDouble(limit) && btcValue <= Convert.ToDouble(limit)))
                    sendReactionEtheriumOverLimit(btcValue, Convert.ToDouble(limit), userId, reactionId, reactionToken);
                _ethValues[key] = btcValue;
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                _ethValues[key] = Convert.ToDouble(JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["ethereum"]))["eur"].ToString());
            }
        }
    }
}
