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
    public class ClashRoyaleService
    {
        HttpClient client = new HttpClient();
        private Dictionary<string, Dictionary<string, object>> _lastPlayerGames = new Dictionary<string, Dictionary<string, object>>();
        private Dictionary<string, Dictionary<string, object>> _lastPlayerClan = new Dictionary<string, Dictionary<string, object>>();
        private Dictionary<string, string> _lastPlayerRole = new Dictionary<string, string>();
        private Dictionary<string, long> _totalPlayerDonations = new Dictionary<string, long>();
        private Dictionary<string, Dictionary<string, object>> _playersFavoriteCard = new Dictionary<string, Dictionary<string, object>>();
        
        private string apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImY4ZGZjYWJhLWU3YjktNDk1Ni1iZjkxLWMwODhiZjgxNzIzZSIsImlhdCI6MTY5ODc0NTg4NCwic3ViIjoiZGV2ZWxvcGVyLzlmOTY4ZjI5LTNiMDYtOTg4NS03M2QyLTNlZDVkY2M1ZWViZCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS43OS4yMTguNzkiXSwidHlwZSI6ImNsaWVudCJ9XX0.qCOWDpuz8GmFK2Tl8jUddwBrziUbj7Z3fjiHpqmK8vYNKq-LJW-_O2-SFA5SQJSpieebcDgLW1VwpEzByavvvA";
        private ReactionDispatcher dispatcher = new ReactionDispatcher();
        public ClashRoyaleService()
        {
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("User-Agent", "area HttpClient");
            client.DefaultRequestHeaders.TryAddWithoutValidation("Authorization", "Bearer " + apiKey);
        }

        public async void sendReactionPlayerFinishedGame(Dictionary<string, object> finishedGame, int userId, int reactionId, string reactionToken)
        {
            List<Dictionary<string, object>>? opponents = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(JsonSerializer.Serialize(finishedGame["opponent"]));
            List<Dictionary<string, object>>? team = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(JsonSerializer.Serialize(finishedGame["team"]));
            string arena = JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(finishedGame["arena"]))["name"].ToString();
            string gamemode = JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(finishedGame["gameMode"]))["name"].ToString();

            string teamPlayersStr = "";
            int i = 0;
            int teamCrowns = 0;

            foreach (Dictionary<string, object> player in team) {
                if (i > 0)
                    teamPlayersStr += ", ";
                teamPlayersStr += player["name"].ToString();
                try
                {
                    JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(player["clan"]))["name"].ToString();
                    teamPlayersStr += " from " + JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(player["clan"]))["name"].ToString();
                } catch (Exception ex)
                {
                }
                i++;
                teamCrowns += Convert.ToInt32(player["crowns"].ToString());
            }

            string oponentPlayersStr = "";
            i = 0;
            int oponentCrowns = 0;

            foreach (Dictionary<string, object> player in opponents)
            {
                if (i > 0)
                    oponentPlayersStr += ", ";
                oponentPlayersStr += player["name"].ToString();
                try
                {
                    JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(player["clan"]))["name"].ToString();
                    oponentPlayersStr += " from " + JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(player["clan"]))["name"].ToString();
                }
                catch (Exception ex)
                {
                }
                i++;
                oponentCrowns += Convert.ToInt32(player["crowns"].ToString());
            }

            string message = String.Format("Players {0} finished a {1} game, result: {2} against {3} in Clash Royale",
                teamPlayersStr,
                gamemode,
                $"{teamCrowns} - {oponentCrowns}",
                oponentPlayersStr
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

        public async void sendReactionPlayerNewDonation(long totalDonations, string playerName, int userId, int reactionId, string reactionToken)
        {
            string message = String.Format("Player {0} just donated cards ! total donations: {1}",
                playerName,
                totalDonations
            );
            Console.WriteLine(message);
            dispatcher.dispatchReaction(reactionId, reactionToken, message, userId);
        }

        public async void sendReactionPlayerNewFavoriteCard(Dictionary<string, object> favoriteCard, string playerName, int userId, int reactionId, string reactionToken)
        {
            string message = String.Format("Player {0}'s favorite card is now: {1}",
                playerName,
                favoriteCard["name"].ToString()
            );
            Console.WriteLine(message);
            dispatcher.dispatchReaction(reactionId, reactionToken, message, userId);
        }

        public async void checkPlayerJustFinishedGame(string playerTag, int userId, int reactionId, string reactionToken)
        {
            try
            {
                if (_lastPlayerGames.ContainsKey(playerTag))
                {
                    HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://proxy.royaleapi.dev/v1/players/" + HttpUtility.UrlEncode(playerTag) + "/battlelog");
                    HttpResponseMessage response = await client.SendAsync(requestMessage);
                    if (!response.IsSuccessStatusCode)
                        return;
                    string res = await response.Content.ReadAsStringAsync();
                    Dictionary<string, object> lastBattle = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                    Console.WriteLine(lastBattle["battleTime"].ToString());
                    if (lastBattle["battleTime"].ToString() != _lastPlayerGames[playerTag]["battleTime"].ToString())
                        sendReactionPlayerFinishedGame(lastBattle, userId, reactionId, reactionToken);
                    _lastPlayerGames[playerTag] = lastBattle;
                }
                else
                {
                    HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://proxy.royaleapi.dev/v1/players/" + HttpUtility.UrlEncode(playerTag) + "/battlelog");
                    HttpResponseMessage response = await client.SendAsync(requestMessage);
                    if (!response.IsSuccessStatusCode)
                        return;
                    string res = await response.Content.ReadAsStringAsync();
                    Dictionary<string, object> lastBattle = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                    _lastPlayerGames[playerTag] = lastBattle;
                }
            } catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        public async void checkPlayerChangedClan(string playerTag, int userId, int reactionId, string reactionToken)
        {
            try {
                if (_lastPlayerClan.ContainsKey(playerTag))
                {
                    HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://proxy.royaleapi.dev/v1/players/" + HttpUtility.UrlEncode(playerTag));
                    HttpResponseMessage response = await client.SendAsync(requestMessage);
                    if (!response.IsSuccessStatusCode)
                        return;
                    string res = await response.Content.ReadAsStringAsync();
                    Dictionary<string, object> lastClan;
                    if (JsonSerializer.Deserialize<Dictionary<string, object>>(res).ContainsKey("clan"))
                    {
                        lastClan = JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["clan"]));
                    } else
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
                    HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://proxy.royaleapi.dev/v1/players/" + HttpUtility.UrlEncode(playerTag));
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
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        public async void checkPlayerChangedRoleWithinClan(string playerTag, int userId, int reactionId, string reactionToken)
        {
            try {
                if (_lastPlayerRole.ContainsKey(playerTag))
                {
                    HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://proxy.royaleapi.dev/v1/players/" + HttpUtility.UrlEncode(playerTag));
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
                    HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://proxy.royaleapi.dev/v1/players/" + HttpUtility.UrlEncode(playerTag));
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
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        public async void checkPlayerDonatedCard(string playerTag, int userId, int reactionId, string reactionToken)
        {
            try
            {
                if (_totalPlayerDonations.ContainsKey(playerTag))
                {
                    HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://proxy.royaleapi.dev/v1/players/" + HttpUtility.UrlEncode(playerTag));
                    HttpResponseMessage response = await client.SendAsync(requestMessage);
                    if (!response.IsSuccessStatusCode)
                        return;
                    string res = await response.Content.ReadAsStringAsync();
                    long cardsDonated = 0;
                    if (JsonSerializer.Deserialize<Dictionary<string, object>>(res).ContainsKey("totalDonations"))
                    {
                        cardsDonated = Convert.ToInt64(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["totalDonations"].ToString());
                    }
                    if (cardsDonated != _totalPlayerDonations[playerTag])
                        sendReactionPlayerNewDonation(cardsDonated, JsonSerializer.Deserialize<Dictionary<string, object>>(res)["name"].ToString(), userId, reactionId, reactionToken);
                    _totalPlayerDonations[playerTag] = cardsDonated;
                }
                else
                {
                    HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://proxy.royaleapi.dev/v1/players/" + HttpUtility.UrlEncode(playerTag));
                    HttpResponseMessage response = await client.SendAsync(requestMessage);
                    if (!response.IsSuccessStatusCode)
                        return;
                    string res = await response.Content.ReadAsStringAsync();
                    long cardsDonated = 0;
                    if (JsonSerializer.Deserialize<Dictionary<string, object>>(res).ContainsKey("totalDonations"))
                    {
                        cardsDonated = Convert.ToInt64(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["totalDonations"].ToString());
                    }
                    _totalPlayerDonations[playerTag] = cardsDonated;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            
        }

        public async void checkPlayerNewFavoriteCard(string playerTag, int userId, int reactionId, string reactionToken)
        {
            try {
                if (_playersFavoriteCard.ContainsKey(playerTag))
                {
                    HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://proxy.royaleapi.dev/v1/players/" + HttpUtility.UrlEncode(playerTag));
                    HttpResponseMessage response = await client.SendAsync(requestMessage);
                    if (!response.IsSuccessStatusCode)
                        return;
                    string res = await response.Content.ReadAsStringAsync();
                    Dictionary<string, object> favoriteCard = new Dictionary<string, object>();
                    if (JsonSerializer.Deserialize<Dictionary<string, object>>(res).ContainsKey("currentFavouriteCard"))
                    {
                        favoriteCard = JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["currentFavouriteCard"]));
                    }
                    if (favoriteCard["id"].ToString() != _playersFavoriteCard[playerTag]["id"].ToString())
                        sendReactionPlayerNewFavoriteCard(favoriteCard, JsonSerializer.Deserialize<Dictionary<string, object>>(res)["name"].ToString(), userId, reactionId, reactionToken);
                    _playersFavoriteCard[playerTag] = favoriteCard;
                }
                else
                {
                    HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://proxy.royaleapi.dev/v1/players/" + HttpUtility.UrlEncode(playerTag));
                    HttpResponseMessage response = await client.SendAsync(requestMessage);
                    if (!response.IsSuccessStatusCode)
                        return;
                    string res = await response.Content.ReadAsStringAsync();
                    Dictionary<string, object> favoriteCard = new Dictionary<string, object>();
                    if (JsonSerializer.Deserialize<Dictionary<string, object>>(res).ContainsKey("currentFavouriteCard"))
                    {
                        favoriteCard = JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["currentFavouriteCard"]));
                    }
                    _playersFavoriteCard[playerTag] = favoriteCard;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }
    }
}
