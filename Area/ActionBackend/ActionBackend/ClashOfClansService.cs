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
    public class ClashOfClansService
    {
        HttpClient client = new HttpClient();
        private Dictionary<string, Dictionary<string, object>> _lastPlayerGames = new Dictionary<string, Dictionary<string, object>>();
        private Dictionary<string, Dictionary<string, object>> _lastPlayerClan = new Dictionary<string, Dictionary<string, object>>();
        private Dictionary<string, string> _lastPlayerRole = new Dictionary<string, string>();
        private Dictionary<string, long> _totalPlayerDonations = new Dictionary<string, long>();
        private Dictionary<string, Dictionary<string, object>> _playersFavoriteCard = new Dictionary<string, Dictionary<string, object>>();

        private string apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjdhNGIzMzIxLWQzMmMtNDAzMS05MWQ1LThmNzhjODM3ZDA3OCIsImlhdCI6MTY5ODc0ODE1NSwic3ViIjoiZGV2ZWxvcGVyLzM5Y2I5ODQ3LWVhNmQtNWJiZi00ODM0LTA0OGI5ZGY5OTFiZCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjQ1Ljc5LjIxOC43OSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.QP4DJgKEJD5x6s6WgPGV-XRsG1kTYg0tpb1h5PN7YCZGEccP2jkAHk9XJ4hVfU1p1SSFAapGhKrlwmZ7efbw0w";
        private ReactionDispatcher dispatcher = new ReactionDispatcher();
        public ClashOfClansService()
        {
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("User-Agent", "area HttpClient");
            client.DefaultRequestHeaders.TryAddWithoutValidation("Authorization", "Bearer " + apiKey);
        }

        public async void sendReactionPlayerChangedClan(Dictionary<string, object> newClan, string playerName, int userId, int reactionId, string reactionToken)
        {
            string message = String.Format("Player {0} {1}",
                playerName,
                newClan["tag"].ToString().Length == 0 ? "left his clan." : $"joined clan: {newClan["name"]}"
            );
            Console.WriteLine(message);
            dispatcher.dispatchReaction(reactionId, reactionToken, message, userId);
        }

        public async void sendReactionPlayerChangedClanRole(string newRole, string playerName, int userId, int reactionId, string reactionToken)
        {
            string message = String.Format("Player {0} got a new role in his clan: {1}",
                playerName,
                newRole
            );
            Console.WriteLine(message);
            dispatcher.dispatchReaction(reactionId, reactionToken, message, userId);
        }

        public async void checkPlayerChangedClan(string playerTag, int userId, int reactionId, string reactionToken)
        {
            if (_lastPlayerClan.ContainsKey(playerTag))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://cocproxy.royaleapi.dev/v1/players/" + HttpUtility.UrlEncode(playerTag));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> lastClan;
                if (JsonSerializer.Deserialize<Dictionary<string, object>>(res).ContainsKey("clan"))
                {
                    lastClan = JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["clan"]));
                }
                else
                {
                    lastClan = new Dictionary<string, object>
                    {
                        ["tag"] = "",
                    };
                }
                if (lastClan["tag"].ToString() != _lastPlayerClan[playerTag]["tag"].ToString())
                    sendReactionPlayerChangedClan(lastClan, JsonSerializer.Deserialize<Dictionary<string, object>>(res)["name"].ToString(), userId, reactionId, reactionToken);
                _lastPlayerClan[playerTag] = lastClan;
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://cocproxy.royaleapi.dev/v1/players/" + HttpUtility.UrlEncode(playerTag));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> lastClan;
                if (JsonSerializer.Deserialize<Dictionary<string, object>>(res).ContainsKey("clan"))
                {
                    lastClan = JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["clan"]));
                }
                else
                {
                    lastClan = new Dictionary<string, object>
                    {
                        ["tag"] = "",
                    };
                }
                _lastPlayerClan[playerTag] = lastClan;
            }
        }

        public async void checkPlayerChangedRoleWithinClan(string playerTag, int userId, int reactionId, string reactionToken)
        {
            if (_lastPlayerRole.ContainsKey(playerTag))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://cocproxy.royaleapi.dev/v1/players/" + HttpUtility.UrlEncode(playerTag));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                string lastRole = "NOT_MEMBER";
                if (JsonSerializer.Deserialize<Dictionary<string, object>>(res).ContainsKey("role"))
                {
                    lastRole = JsonSerializer.Deserialize<Dictionary<string, object>>(res)["role"].ToString();
                }
                if (lastRole != _lastPlayerRole[playerTag])
                    sendReactionPlayerChangedClanRole(lastRole, JsonSerializer.Deserialize<Dictionary<string, object>>(res)["name"].ToString(), userId, reactionId, reactionToken);
                _lastPlayerRole[playerTag] = lastRole;
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://cocproxy.royaleapi.dev/v1/players/" + HttpUtility.UrlEncode(playerTag));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                string lastRole;
                if (JsonSerializer.Deserialize<Dictionary<string, object>>(res).ContainsKey("role"))
                {
                    lastRole = JsonSerializer.Deserialize<Dictionary<string, object>>(res)["role"].ToString();
                }
                else
                {
                    lastRole = "NOT_MEMBER";
                }
                _lastPlayerRole[playerTag] = lastRole;
            }
        }
    }
}
