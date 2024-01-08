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
    public class BrawlStarService
    {
        HttpClient client = new HttpClient();
        private Dictionary<string, Dictionary<string, object>> _lastPlayerGames = new Dictionary<string, Dictionary<string, object>>();
        private Dictionary<string, Dictionary<string, object>> _lastPlayerClan = new Dictionary<string, Dictionary<string, object>>();

        private string apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImY0ZDc4NzlhLTBjYmYtNDJhNS1hMWY2LTA2ZTQwNTU3YTIxMiIsImlhdCI6MTY5ODg0NjUwMCwic3ViIjoiZGV2ZWxvcGVyLzc5NTc4YWZmLWI2YTktZmYxMy03ZDQ4LTdjODk1NTUyNjgzYSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNDUuNzkuMjE4Ljc5Il0sInR5cGUiOiJjbGllbnQifV19.957caR4HU8rn8iRJiw6a-kBJ0nscf-jB4wHysoo9PPuGDvk68OnxxNkqq8LO_Rwl8gx02akDt1u2ladeb-jpYQ";
        private ReactionDispatcher dispatcher = new ReactionDispatcher();
        public BrawlStarService()
        {
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("User-Agent", "area HttpClient");
            client.DefaultRequestHeaders.TryAddWithoutValidation("Authorization", "Bearer " + apiKey);
        }

        public async void sendReactionPlayerFinishedGame(Dictionary<string, object> finishedGame, string playerTag, int userId, int reactionId, string reactionToken)
        {
            Console.WriteLine(JsonSerializer.Serialize(finishedGame));
            string gamemode = JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(finishedGame["battle"]))["mode"].ToString();
            string map = JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(finishedGame["event"]))["map"].ToString();
            
            HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://bsproxy.royaleapi.dev/v1/players/" + HttpUtility.UrlEncode(playerTag));
            HttpResponseMessage response = await client.SendAsync(requestMessage);
            string res = await response.Content.ReadAsStringAsync();
            string userName = JsonSerializer.Deserialize<Dictionary<string, object>>(res)["name"].ToString();

            string message = String.Format("Player {0} finished a {1} game on {2} in Brawl Stars",
                userName,
                gamemode,
                map
            );
            Console.WriteLine(message);
            dispatcher.dispatchReaction(reactionId, reactionToken, message, userId);
        }

        public async void sendReactionPlayerChangedClan(Dictionary<string, object> newClan, string playerName, int userId, int reactionId, string reactionToken)
        {
            string message = String.Format("Player {0} {1}",
                playerName,
                newClan["tag"].ToString().Length == 0 ? "left his clan." : $"joined clan: {newClan["name"]}"
            );
            dispatcher.dispatchReaction(reactionId, reactionToken, message, userId);
        }

        public async void checkPlayerJustFinishedGame(string playerTag, int userId, int reactionId, string reactionToken)
        {
            try
            {
                if (_lastPlayerGames.ContainsKey(playerTag))
                {
                    HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://bsproxy.royaleapi.dev/v1/players/" + HttpUtility.UrlEncode(playerTag) + "/battlelog");
                    HttpResponseMessage response = await client.SendAsync(requestMessage);
                    string res = await response.Content.ReadAsStringAsync();
                    if (!response.IsSuccessStatusCode)
                        return;
                    if (JsonSerializer.Deserialize<Dictionary<string, object>>(res).ContainsKey("items"))
                    {
                        Dictionary<string, object> lastBattle = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["items"])).FirstOrDefault();
                        if (lastBattle["battleTime"].ToString() != _lastPlayerGames[playerTag]["battleTime"].ToString())
                            sendReactionPlayerFinishedGame(lastBattle, playerTag, userId, reactionId, reactionToken);
                        _lastPlayerGames[playerTag] = lastBattle;
                    }
                }
                else
                {
                    HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://bsproxy.royaleapi.dev/v1/players/" + HttpUtility.UrlEncode(playerTag) + "/battlelog");
                    HttpResponseMessage response = await client.SendAsync(requestMessage);
                    string res = await response.Content.ReadAsStringAsync();
                    if (!response.IsSuccessStatusCode)
                        return;
                    if (JsonSerializer.Deserialize<Dictionary<string, object>>(res).ContainsKey("items"))
                    {
                        Dictionary<string, object> lastBattle = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["items"])).FirstOrDefault();
                        _lastPlayerGames[playerTag] = lastBattle;
                    }
                }
            } catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        public async void checkPlayerChangedClub(string playerTag, int userId, int reactionId, string reactionToken)
        {
            try {
                if (_lastPlayerClan.ContainsKey(playerTag))
                {
                    HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://bsproxy.royaleapi.dev/v1/players/" + HttpUtility.UrlEncode(playerTag));
                    HttpResponseMessage response = await client.SendAsync(requestMessage);
                    if (!response.IsSuccessStatusCode)
                        return;
                    string res = await response.Content.ReadAsStringAsync();
                    Dictionary<string, object> lastClan;
                    if (JsonSerializer.Deserialize<Dictionary<string, object>>(res).ContainsKey("club"))
                    {
                        lastClan = JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["club"]));
                    }
                    else
                    {
                        lastClan = new Dictionary<string, object>
                        {
                            ["tag"] = "",
                        };
                    }
                    Console.WriteLine(JsonSerializer.Serialize(lastClan));
                    if (lastClan["tag"].ToString() != _lastPlayerClan[playerTag]["tag"].ToString())
                        sendReactionPlayerChangedClan(lastClan, JsonSerializer.Deserialize<Dictionary<string, object>>(res)["name"].ToString(), userId, reactionId, reactionToken);
                    _lastPlayerClan[playerTag] = lastClan;
                }
                else
                {
                    HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://bsproxy.royaleapi.dev/v1/players/" + HttpUtility.UrlEncode(playerTag));
                    HttpResponseMessage response = await client.SendAsync(requestMessage);
                    if (!response.IsSuccessStatusCode)
                        return;
                    string res = await response.Content.ReadAsStringAsync();
                    Dictionary<string, object> lastClan;
                    if (JsonSerializer.Deserialize<Dictionary<string, object>>(res).ContainsKey("club"))
                    {
                        lastClan = JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["club"]));
                    }
                    else
                    {
                        lastClan = new Dictionary<string, object>
                        {
                            ["tag"] = "",
                        };
                    }
                    Console.WriteLine(JsonSerializer.Serialize(lastClan));
                    _lastPlayerClan[playerTag] = lastClan;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }
    }
}
