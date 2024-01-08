using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;

namespace ActionBackend
{
    public class TwitterService
    {
        HttpClient client = new HttpClient();
        private string twitterToken = "";
        private string apiKey = "iFwPwYD6hVhboM6j02X9KsPlj";
        private string apiSecret = "o02nwPPZw4w9fEh6Rn9ah8feK2LJEg4dIjSlAXi8j2uiEccfMo";
        private Dictionary<string,string> _lastUserTweets = new Dictionary<string, string>();
        private Dictionary<string, string> _lastUserFollowers = new Dictionary<string, string>();
        private Dictionary<string, string> _lastUserFollowersLost = new Dictionary<string, string>();
        private Dictionary<string, string> _lastUserFriends = new Dictionary<string, string>();
        private Dictionary<string, string> _lastUserFriendsLost = new Dictionary<string, string>();
        private Dictionary<string, string> _lastUserLists = new Dictionary<string, string>();
        private Dictionary<string, string> _lastUserFavorites = new Dictionary<string, string>();
        private Dictionary<string, string> _lastUserDescription = new Dictionary<string, string>();
        private Dictionary<string, string> _lastUserLocation = new Dictionary<string, string>();
        private Dictionary<string, string> _lastUserBannerUrl = new Dictionary<string, string>();
        private Dictionary<string, string> _lastUserPfp = new Dictionary<string, string>();
        private ReactionDispatcher dispatcher = new ReactionDispatcher();

        public TwitterService()
        {
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("User-Agent", "area HttpClient");

            registerTwitterApiToken();
            Thread.Sleep(1000);
        }

        public async void registerTwitterApiToken()
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

            Dictionary<string, string> bodyRaw = new Dictionary<string, string> { { "grant_type", "client_credentials" } };
            FormUrlEncodedContent body = new FormUrlEncodedContent(bodyRaw);

            HttpResponseMessage response = await twitterClient.PostAsync("https://api.twitter.com/oauth2/token", body);
            if (!response.IsSuccessStatusCode)
                return;
            string res = await response.Content.ReadAsStringAsync();
            Dictionary<string, string> respParsed = JsonSerializer.Deserialize<Dictionary<string, string>>(res);
            twitterToken = respParsed["access_token"];
            client.DefaultRequestHeaders.TryAddWithoutValidation("Authorization", "Bearer " + twitterToken);
        }

        public async void sendReactionUserNewTweet(string message, int userId, int reactionId, string reactionToken)
        {
            Console.WriteLine(message);
            dispatcher.dispatchReaction(reactionId, reactionToken, message, userId);
        }

        public async void checkUserPostedTweet(string userName, int userId, int reactionId, string reactionToken)
        {
            if (twitterToken.Length == 0)
                return;
            if (_lastUserTweets.ContainsKey(userName))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                if (userInfo["statuses_count"].ToString() != _lastUserTweets[userName])
                    sendReactionUserNewTweet($"{userInfo["name"]} ({userInfo["screen_name"]}) just posted a new tweet ! Current tweet count: {userInfo["statuses_count"].ToString()}", userId, reactionId, reactionToken);
                _lastUserTweets[userName] = userInfo["statuses_count"].ToString();
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                _lastUserTweets[userName] = userInfo["statuses_count"].ToString();
            }
        }

        public async void checkUserNewFollower(string userName, int userId, int reactionId, string reactionToken)
        {
            if (twitterToken.Length == 0)
                return;
            if (_lastUserFollowers.ContainsKey(userName))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                if (userInfo["followers_count"].ToString() != _lastUserFollowers[userName] && long.Parse(userInfo["followers_count"].ToString()) > long.Parse(_lastUserFollowers[userName]))
                    sendReactionUserNewTweet($"{userInfo["name"]} ({userInfo["screen_name"]}) just gained a new follower ! current follower count: {userInfo["followers_count"]}", userId, reactionId, reactionToken);
                _lastUserFollowers[userName] = userInfo["followers_count"].ToString();
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                _lastUserFollowers[userName] = userInfo["followers_count"].ToString();
            }
        }
        public async void checkUserLostFollower(string userName, int userId, int reactionId, string reactionToken)
        {
            if (twitterToken.Length == 0)
                return;
            if (_lastUserFollowersLost.ContainsKey(userName))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                if (userInfo["followers_count"].ToString() != _lastUserFollowersLost[userName] && long.Parse(userInfo["followers_count"].ToString()) < long.Parse(_lastUserFollowersLost[userName]))
                    sendReactionUserNewTweet($"{userInfo["name"]} ({userInfo["screen_name"]}) just lost a follower :( current follower count: {userInfo["followers_count"]}", userId, reactionId, reactionToken);
                _lastUserFollowersLost[userName] = userInfo["followers_count"].ToString();
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                _lastUserFollowersLost[userName] = userInfo["followers_count"].ToString();
            }
        }
        public async void checkUserGainedFriend(string userName, int userId, int reactionId, string reactionToken)
        {
            if (twitterToken.Length == 0)
                return;
            if (_lastUserFriends.ContainsKey(userName))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                if (userInfo["friends_count"].ToString() != _lastUserFriends[userName] && long.Parse(userInfo["friends_count"].ToString()) > long.Parse(_lastUserFriends[userName]))
                    sendReactionUserNewTweet($"{userInfo["name"]} ({userInfo["screen_name"]}) just gained a friend ! current friend count: {userInfo["friends_count"]}", userId, reactionId, reactionToken);
                _lastUserFriends[userName] = userInfo["friends_count"].ToString();
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                _lastUserFriends[userName] = userInfo["friends_count"].ToString();
            }
        }
        public async void checkUserLostFriend(string userName, int userId, int reactionId, string reactionToken)
        {
            if (twitterToken.Length == 0)
                return;
            if (_lastUserFriendsLost.ContainsKey(userName))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                if (userInfo["friends_count"].ToString() != _lastUserFriendsLost[userName] && long.Parse(userInfo["friends_count"].ToString()) < long.Parse(_lastUserFriendsLost[userName]))
                    sendReactionUserNewTweet($"{userInfo["name"]} ({userInfo["screen_name"]}) just lost a friend :( current friend count: {userInfo["friends_count"]}", userId, reactionId, reactionToken);
                _lastUserFriendsLost[userName] = userInfo["friends_count"].ToString();
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                _lastUserFriendsLost[userName] = userInfo["friends_count"].ToString();
            }
        }
        public async void checkUserNewList(string userName, int userId, int reactionId, string reactionToken)
        {
            if (twitterToken.Length == 0)
                return;
            if (_lastUserLists.ContainsKey(userName))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                Console.WriteLine(userInfo["listed_count"].ToString());
                if (userInfo["listed_count"].ToString() != _lastUserLists[userName])
                    sendReactionUserNewTweet($"{userInfo["name"]} ({userInfo["screen_name"]}) joined a new list ! current list count: {userInfo["listed_count"]}", userId, reactionId, reactionToken);
                _lastUserLists[userName] = userInfo["listed_count"].ToString();
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                _lastUserLists[userName] = userInfo["listed_count"].ToString();
            }
        }
        public async void checkUserNewFavorite(string userName, int userId, int reactionId, string reactionToken)
        {
            if (twitterToken.Length == 0)
                return;
            if (_lastUserFavorites.ContainsKey(userName))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                if (userInfo["favourites_count"].ToString() != _lastUserFavorites[userName])
                    sendReactionUserNewTweet($"{userInfo["name"]} ({userInfo["screen_name"]}) added a post to their favorites ! current favorite count: {userInfo["favourites_count"]}", userId, reactionId, reactionToken);
                _lastUserFavorites[userName] = userInfo["favourites_count"].ToString();
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                _lastUserFavorites[userName] = userInfo["favourites_count"].ToString();
            }
        }
        public async void checkUserChangedDescription(string userName, int userId, int reactionId, string reactionToken)
        {
            if (twitterToken.Length == 0)
                return;
            if (_lastUserDescription.ContainsKey(userName))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                if (userInfo["description"].ToString() != _lastUserDescription[userName])
                    sendReactionUserNewTweet($"{userInfo["name"]} ({userInfo["screen_name"]}) changed their description to: \"{userInfo["description"]}\"", userId, reactionId, reactionToken);
                _lastUserDescription[userName] = userInfo["description"].ToString();
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                _lastUserDescription[userName] = userInfo["description"].ToString();
            }
        }
        public async void checkUserChangedLocation(string userName, int userId, int reactionId, string reactionToken)
        {
            if (twitterToken.Length == 0)
                return;
            if (_lastUserLocation.ContainsKey(userName))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                if (userInfo["location"].ToString() != _lastUserLocation[userName])
                    sendReactionUserNewTweet($"{userInfo["name"]} ({userInfo["screen_name"]}) changed their location to: \"{userInfo["location"]}\"", userId, reactionId, reactionToken);
                _lastUserLocation[userName] = userInfo["location"].ToString();
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                _lastUserLocation[userName] = userInfo["location"].ToString();
            }
        }
        public async void checkUserChangeBannerUrl(string userName, int userId, int reactionId, string reactionToken)
        {
            if (twitterToken.Length == 0)
                return;
            if (_lastUserBannerUrl.ContainsKey(userName))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                if (userInfo["profile_banner_url"] != null && userInfo["profile_banner_url"].ToString() != _lastUserBannerUrl[userName])
                    sendReactionUserNewTweet($"{userInfo["name"]} ({userInfo["screen_name"]}) changed their profile banner to: \"{userInfo["profile_banner_url"]}\"", userId, reactionId, reactionToken);
                _lastUserBannerUrl[userName] = userInfo["profile_banner_url"] == null ? "" : userInfo["profile_banner_url"].ToString();
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                _lastUserBannerUrl[userName] = userInfo["profile_banner_url"] == null ? "" : userInfo["profile_banner_url"].ToString();
            }
        }
        public async void checkUserChangeProfilePicture(string userName, int userId, int reactionId, string reactionToken)
        {
            if (twitterToken.Length == 0)
                return;
            if (_lastUserPfp.ContainsKey(userName))
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                if (userInfo["profile_image_url_https"].ToString() != _lastUserPfp[userName])
                    sendReactionUserNewTweet($"{userInfo["name"]} ({userInfo["screen_name"]}) changed their profile picture to: \"{userInfo["profile_image_url_https"]}\"", userId, reactionId, reactionToken);
                _lastUserPfp[userName] = userInfo["profile_image_url_https"].ToString();
            }
            else
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://api.twitter.com/1.1/users/lookup.json?screen_name=" + HttpUtility.UrlEncode(userName));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
                if (!response.IsSuccessStatusCode)
                    return;
                string res = await response.Content.ReadAsStringAsync();
                Dictionary<string, object> userInfo = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(res).FirstOrDefault();
                _lastUserPfp[userName] = userInfo["profile_image_url_https"].ToString();
            }
        }
    }
}
