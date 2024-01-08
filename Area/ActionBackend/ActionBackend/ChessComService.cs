using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Text.Json;
using System.Web;

namespace ActionBackend
{
    public class ChessComService
    {
        HttpClient client = new HttpClient();
        private Dictionary<string, List<Dictionary<string, object>>> _playerGames = new Dictionary<string, List<Dictionary<string, object>>>();
        private ReactionDispatcher dispatcher = new ReactionDispatcher();
        public ChessComService()
        {
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("User-Agent", "area HttpClient");
        }

        public async void sendReactionPlayerFinishedGame(Dictionary<string, object> finishedGame, int userId, int reactionId, string reactionToken)
        {
            Dictionary<string, object> ?white = JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(finishedGame["white"]));
            Dictionary<string, object> ?black = JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(finishedGame["black"]));
            string message = String.Format("Player {0} {1} against Player {2} at Chess",
                white?["username"].ToString(),
                white?["result"].ToString() == "win" ? "won" : "lost",
                black?["username"].ToString()
            );
            Console.WriteLine(message);
            dispatcher.dispatchReaction(reactionId, reactionToken, message, userId);
        }

        public async void checkPlayerJustFinishedGame(string playerUsername, int userId, int reactionId, string reactionToken)
        {
            if (_playerGames.ContainsKey(playerUsername))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.chess.com/pub/player/" + HttpUtility.UrlEncode(playerUsername) + "/games/archives");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                List<string> allDateGames = JsonSerializer.Deserialize<Dictionary<string, List<string>>>(res)["archives"];
                HttpRequestMessage requestMessage1 = new HttpRequestMessage(HttpMethod.Get, allDateGames.LastOrDefault());
                HttpResponseMessage response1 = await client.SendAsync(requestMessage1);
                if (!response1.IsSuccessStatusCode)
                    return;
                List<Dictionary<string, object>>? newPlayerGames = JsonSerializer.Deserialize<Dictionary<string, List<Dictionary<string, object>>>>(await response1.Content.ReadAsStringAsync())["games"];
                if (newPlayerGames?.LastOrDefault()["url"].ToString() != _playerGames[playerUsername].LastOrDefault()["url"].ToString())
                    sendReactionPlayerFinishedGame(newPlayerGames?.LastOrDefault(), userId, reactionId, reactionToken);
                _playerGames[playerUsername] = newPlayerGames != null ? newPlayerGames : _playerGames[playerUsername];
            } else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.chess.com/pub/player/" + HttpUtility.UrlEncode(playerUsername) + "/games/archives");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                List<string> allDateGames = JsonSerializer.Deserialize<Dictionary<string, List<string>>>(res)["archives"];
                HttpRequestMessage requestMessage1 = new HttpRequestMessage(HttpMethod.Get, allDateGames.LastOrDefault());
                HttpResponseMessage response1 = await client.SendAsync(requestMessage1);
                if (!response1.IsSuccessStatusCode)
                    return;
                _playerGames[playerUsername] = JsonSerializer.Deserialize<Dictionary<string, List<Dictionary<string, object>>>>(await response1.Content.ReadAsStringAsync())["games"];
            }
        }
    }
}
