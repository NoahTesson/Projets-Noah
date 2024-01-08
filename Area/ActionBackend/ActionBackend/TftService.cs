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
    public class TftService
    {
        HttpClient client = new HttpClient();
        private Dictionary<string, string> _lastPlayerGames = new Dictionary<string, string>();
        string apiKey = "";
        private ReactionDispatcher dispatcher = new ReactionDispatcher();
        public TftService(string _apiKey)
        {
            apiKey = _apiKey;
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("User-Agent", "area HttpClient");
            client.DefaultRequestHeaders.TryAddWithoutValidation("X-Riot-Token", apiKey);
            Console.WriteLine(apiKey);
        }

        public async void sendReactionPlayerFinishedGame(string playerUsername, int userId, int reactionId, string reactionToken)
        {
            string message = String.Format("Player {0} just finished a TFT game.",
                playerUsername
            );
            Console.WriteLine(message);
            dispatcher.dispatchReaction(reactionId, reactionToken, message, userId);
        }
        public async void checkPlayerJustFinishedGame(string userName, int userId, int reactionId, string reactionToken)
        {
            if (_lastPlayerGames.ContainsKey(userName))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-name/" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                string puuid = JsonSerializer.Deserialize<Dictionary<string, object>>(res)["puuid"].ToString();

                HttpRequestMessage requestMessage1 = new HttpRequestMessage(HttpMethod.Get, $"https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/{HttpUtility.UrlEncode(puuid)}/ids?start=0&count=1");
                HttpResponseMessage response1 = await client.SendAsync(requestMessage1);
                if (!response.IsSuccessStatusCode)
                    return;
                string res1 = await response1.Content.ReadAsStringAsync();
                string lastGame = JsonSerializer.Deserialize<List<string>>(res1).FirstOrDefault();
                if (lastGame != _lastPlayerGames[userName])
                    sendReactionPlayerFinishedGame(userName, userId, reactionId, reactionToken);
                _lastPlayerGames[userName] = lastGame;
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-name/" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                string puuid = JsonSerializer.Deserialize<Dictionary<string, object>>(res)["puuid"].ToString();

                HttpRequestMessage requestMessage1 = new HttpRequestMessage(HttpMethod.Get, $"https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/{HttpUtility.UrlEncode(puuid)}/ids?start=0&count=1");
                HttpResponseMessage response1 = await client.SendAsync(requestMessage1);
                if (!response.IsSuccessStatusCode)
                    return;
                string res1 = await response1.Content.ReadAsStringAsync();
                string lastGame = JsonSerializer.Deserialize<List<string>>(res1).FirstOrDefault();
                _lastPlayerGames[userName] = lastGame;
            }
        }
    }
}
