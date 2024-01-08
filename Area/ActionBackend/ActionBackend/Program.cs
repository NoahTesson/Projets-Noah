

using ActionBackend;
using System.Collections.Generic;

DatabaseService dbService = new DatabaseService("area", "root", "password", 3306);
List<IArea> allAreas;
List<IService> allServices;
ChessComService chessComService = new ChessComService();
TwitterService twitterService = new TwitterService();
ClashRoyaleService clashRoyaleService = new ClashRoyaleService();
ClashOfClansService clashOfClansService = new ClashOfClansService();
WeatherService weatherService = new WeatherService();
CoinbaseService coinbaseService = new CoinbaseService();
TwitchService twitchService = new TwitchService();
TftService tftService = new TftService(dbService.getTftApiKey());
BrawlStarService brawlService = new BrawlStarService();
WorldTimeService worldTimeService = new WorldTimeService();

while (true) {
    allAreas = dbService.getAllAreas();
    allServices = dbService.getAllServices();
    foreach (IArea area in allAreas)
    {
        if (area.trigger_id == 25)
        {
            chessComService.checkPlayerJustFinishedGame(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 29)
        {
            twitterService.checkUserPostedTweet(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 31)
        {
            twitterService.checkUserNewFollower(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 32)
        {
            twitterService.checkUserLostFollower(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 33)
        {
            twitterService.checkUserNewList(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 34)
        {
            twitterService.checkUserNewFavorite(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 35)
        {
            twitterService.checkUserChangedDescription(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 36)
        {
            twitterService.checkUserChangedLocation(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 37)
        {
            twitterService.checkUserChangeBannerUrl(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 38)
        {
            twitterService.checkUserChangeProfilePicture(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 39)
        {
            clashRoyaleService.checkPlayerJustFinishedGame(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 40)
        {
            clashRoyaleService.checkPlayerChangedClan(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 41)
        {
            clashRoyaleService.checkPlayerChangedRoleWithinClan(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 42)
        {
            clashRoyaleService.checkPlayerNewFavoriteCard(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 43)
        {
            clashRoyaleService.checkPlayerDonatedCard(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 44)
        {
            clashOfClansService.checkPlayerChangedClan(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 45)
        {
            clashOfClansService.checkPlayerChangedRoleWithinClan(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 46)
        {
            weatherService.checkWeatherTemperatureChange(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 47)
        {
            weatherService.checkWeatherConditionsChange(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 48)
        {
            coinbaseService.checkBitcoinOverLimit(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 49)
        {
            coinbaseService.checkEthOverLimit(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 50)
        {
            twitchService.checkUserIsLive(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 51)
        {
            twitchService.checkUserChangedStreamTitle(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 52)
        {
            twitchService.checkUserChangedDescription(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 54)
        {
            tftService.checkPlayerJustFinishedGame(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 57)
        {
            brawlService.checkPlayerJustFinishedGame(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 58)
        {
            brawlService.checkPlayerChangedClub(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
        else if (area.trigger_id == 59)
        {
            worldTimeService.checkTimeTrigger(area.triggerToken, area.user_id, area.action_id, area.actionToken);
        }
    }
    Thread.Sleep(5000);
}
