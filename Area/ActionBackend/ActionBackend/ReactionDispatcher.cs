using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace ActionBackend
{
    public class ReactionDispatcher
    {
        private HttpClient client = new HttpClient();
        private Dictionary<string, List<Dictionary<string, object>>> _playerGames = new Dictionary<string, List<Dictionary<string, object>>>();
        public ReactionDispatcher()
        {
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("User-Agent", "area HttpClient");
        }
        public async void dispatchReaction(int reactionId, string reactionToken, string message, int userId)
        {
            if (reactionId == 12)
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, "https://stirring-settling-mutt.ngrok-free.app/api/twitter/postTweet?user_id=" + userId.ToString() + "&content=" + Uri.EscapeUriString(message));
                HttpResponseMessage response = await client.SendAsync(requestMessage);
            }
            if (reactionId == 14)
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, $"https://stirring-settling-mutt.ngrok-free.app/api/google/spreadsheet/add_new_row?user_id={userId}&title={Uri.EscapeUriString(reactionToken)}&value1={Uri.EscapeUriString(message)}");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
            }
            if (reactionId == 15)
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, $"https://stirring-settling-mutt.ngrok-free.app/api/google/sendEmail?email={Uri.EscapeUriString(reactionToken)}&content={Uri.EscapeUriString(message)}");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
            }
            if (reactionId == 17)
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, $"https://stirring-settling-mutt.ngrok-free.app/api/spotify/follow_playlist?user_id={userId}&playlist_id={Uri.EscapeUriString(reactionToken)}");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
            }
            if (reactionId == 18)
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, $"https://stirring-settling-mutt.ngrok-free.app/api/spotify/unfollow_playlist?user_id={userId}&playlist_id={Uri.EscapeUriString(reactionToken)}");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
            }
            if (reactionId == 19)
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, $"https://stirring-settling-mutt.ngrok-free.app/api/spotify/unfollow_artist?user_id={userId}&artist_id={Uri.EscapeUriString(reactionToken)}");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
            }
            if (reactionId == 20)
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, $"https://stirring-settling-mutt.ngrok-free.app/api/spotify/follow_artist?user_id={userId}&artist_id={Uri.EscapeUriString(reactionToken)}");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
            }
            if (reactionId == 21)
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, $"https://stirring-settling-mutt.ngrok-free.app/api/spotify/follow_user?user_id={userId}&artist_id={Uri.EscapeUriString(reactionToken)}");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
            }
            if (reactionId == 22)
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, $"https://stirring-settling-mutt.ngrok-free.app/api/spotify/unfollow_user?user_id={userId}&artist_id={Uri.EscapeUriString(reactionToken)}");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
            }
            if (reactionId == 23)
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, $"https://stirring-settling-mutt.ngrok-free.app/api/spotify/save_track?user_id={userId}&track_id={Uri.EscapeUriString(reactionToken)}");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
            }
            if (reactionId == 24)
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, $"https://stirring-settling-mutt.ngrok-free.app/api/spotify/unsave_track?user_id={userId}&track_id={Uri.EscapeUriString(reactionToken)}");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
            }
            if (reactionId == 26)
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, $"https://stirring-settling-mutt.ngrok-free.app/api/github/createRepo?user_id={userId}&repo_name={Uri.EscapeUriString(reactionToken)}&repo_desc={Uri.EscapeUriString("Generated repository with NAPTE")}&is_repo_private=1");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
            }
            if (reactionId == 53)
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, $"https://stirring-settling-mutt.ngrok-free.app/api/linkedin/postALinkedinPost?user_id={userId}&content={Uri.EscapeUriString(message)}");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
            }
            if (reactionId == 55)
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, $"https://stirring-settling-mutt.ngrok-free.app/api/trello/createOrganization?user_id={userId}&name={Uri.EscapeUriString(reactionToken)}");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
            }
            if (reactionId == 56)
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, $"https://stirring-settling-mutt.ngrok-free.app/api/trello/createBoard?user_id={userId}&idOrganization={Uri.EscapeUriString(reactionToken)}");
                HttpResponseMessage response = await client.SendAsync(requestMessage);
            }
        }
    }
}
