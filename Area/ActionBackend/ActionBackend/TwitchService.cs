using Savage.Data.MySqlClient;
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
    public class TwitchService
    {
        HttpClient client = new HttpClient();
        private string twitchToken = "";
        private string apiKey = "kasdl3ni5n5i04hgmnbq3yvvwuousw";
        private string apiSecret = "6uc2hdkdr2tobcwerx0k8aihek6gms";
        private ReactionDispatcher dispatcher = new ReactionDispatcher();

        private Dictionary<string, bool> _areUsersLive = new Dictionary<string, bool>();
        private Dictionary<string, string> _streamTitles = new Dictionary<string, string>();
        private Dictionary<string, string> _userDescriptions = new Dictionary<string, string>();

        public TwitchService()
        {
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("User-Agent", "area HttpClient");

            registerTwitchApiToken();
            Thread.Sleep(1000);
        }

        public async void registerTwitchApiToken()
        {
            HttpClient twitterClient = new HttpClient();
            twitterClient.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/x-www-form-urlencoded"));
            twitterClient.DefaultRequestHeaders.Add("User-Agent", "area HttpClient");
            twitterClient.DefaultRequestHeaders.Add("grant_type", "client_credentials");
            string keyEncoded = HttpUtility.UrlEncode(apiKey);
            string secretEncoded = HttpUtility.UrlEncode(apiSecret);
            string basicAuth = $"{keyEncoded}:{secretEncoded}";
            string base64BasicAuth = Convert.ToBase64String(Encoding.UTF8.GetBytes(basicAuth));
            twitterClient.DefaultRequestHeaders.TryAddWithoutValidation("Authorization", "Basic " + base64BasicAuth);
            twitterClient.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");

            Dictionary<string, string> bodyRaw = new Dictionary<string, string> { { "grant_type", "client_credentials" }, { "client_id", apiKey }, { "client_secret", apiSecret } };
            FormUrlEncodedContent body = new FormUrlEncodedContent(bodyRaw);

            HttpResponseMessage response = await twitterClient.PostAsync("https://id.twitch.tv/oauth2/token", body);
            if (!response.IsSuccessStatusCode)
                return;
            string res = await response.Content.ReadAsStringAsync();
            Dictionary<string, object> respParsed = JsonSerializer.Deserialize<Dictionary<string, object>>(res);
            twitchToken = respParsed["access_token"].ToString();
            client.DefaultRequestHeaders.TryAddWithoutValidation("Authorization", "Bearer " + twitchToken);
            client.DefaultRequestHeaders.TryAddWithoutValidation("Client-Id", apiKey);
        }

        public async void sendReactionUserStreaming(bool isStreaming, string displayName, int userId, int reactionId, string reactionToken)
        {
            string message = String.Format("{0} {1}",
                displayName,
                isStreaming ? "just started a stream !" : "just ended his stream");
            Console.WriteLine(message);
            dispatcher.dispatchReaction(reactionId, reactionToken, message, userId);
        }

        public async void sendReactionUserStreamTitleChanged(string newStreamTitle, string displayName, int userId, int reactionId, string reactionToken)
        {
            if (newStreamTitle.Length == 0)
                return;
            string message = String.Format("{0} just changed their streaming title to: {1}",
                displayName,
                newStreamTitle);
            Console.WriteLine(message);
            dispatcher.dispatchReaction(reactionId, reactionToken, message, userId);
        }

        public async void sendReactionUserDescriptionChanged(string newDesc, string displayName, int userId, int reactionId, string reactionToken)
        {
            string message = String.Format("{0} changed their twitch description: {1}",
                displayName,
                newDesc
            );
            Console.WriteLine(message);
            dispatcher.dispatchReaction(reactionId, reactionToken, message, userId);
        }

        public async void checkUserIsLive(string userName, int userId, int reactionId, string reactionToken)
        {
            if (twitchToken.Length == 0)
                return;
            if (_areUsersLive.ContainsKey(userName))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitch.tv/helix/streams?user_login=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                List<Dictionary<string, object>> streamerInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["data"]));
                bool isStreaming = streamerInfo.Count() > 0;
                if (isStreaming != _areUsersLive[userName])
                    sendReactionUserStreaming(isStreaming, userName, userId, reactionId, reactionToken);
                _areUsersLive[userName] = isStreaming;
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitch.tv/helix/streams?user_login=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                List<Dictionary<string, object>> streamerInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["data"]));
                _areUsersLive[userName] = streamerInfo.Count() > 0;
            }
        }

        public async void checkUserChangedStreamTitle(string userName, int userId, int reactionId, string reactionToken)
        {
            if (twitchToken.Length == 0)
                return;
            if (_streamTitles.ContainsKey(userName))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitch.tv/helix/streams?user_login=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                List<Dictionary<string, object>> streamerInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["data"]));
                string streamTitle = streamerInfo.Count() > 0 ? streamerInfo.FirstOrDefault()["title"].ToString() : "";
                if (streamTitle != _streamTitles[userName])
                    sendReactionUserStreamTitleChanged(streamTitle, userName, userId, reactionId, reactionToken);
                _streamTitles[userName] = streamTitle;
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitch.tv/helix/streams?user_login=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                List<Dictionary<string, object>> streamerInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["data"]));
                _streamTitles[userName] = streamerInfo.Count() > 0 ? streamerInfo.FirstOrDefault()["title"].ToString() : "";
            }
        }

        public async void checkUserChangedDescription(string userName, int userId, int reactionId, string reactionToken)
        {
            if (twitchToken.Length == 0)
                return;
            if (_userDescriptions.ContainsKey(userName))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitch.tv/helix/users?login=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                List<Dictionary<string, object>> streamerInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["data"]));
                string userDesc = streamerInfo.Count() > 0 ? streamerInfo.FirstOrDefault()["description"].ToString() : "";
                if (userDesc != _userDescriptions[userName])
                    sendReactionUserDescriptionChanged(userDesc, userName, userId, reactionId, reactionToken);
                _userDescriptions[userName] = userDesc;
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitch.tv/helix/users?login=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                List<Dictionary<string, object>> streamerInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(JsonSerializer.Serialize(JsonSerializer.Deserialize<Dictionary<string, object>>(res)["data"]));
                _userDescriptions[userName] = streamerInfo.Count() > 0 ? streamerInfo.FirstOrDefault()["description"].ToString() : "";
            }
        }
    }
}
