import { Injectable } from '@angular/core';

type Theme = {
  light_blue: string;
  lighter_blue: string;
  blue: string;
  dark_blue: string;
  white: string;
  white_darker: string;
  text_black: string;
}

type AssetsConfig = {
  banner_slogan: string;
  white_bg_logo: string;
  black_bg_logo: string;
  logo_square: string;
  logo_icon: string;
  logo_icon_transparent: string;
  banner_slogan_transparent: string;
  banner_transparent: string;
  logo_blue: string;
  vertical_wave: string;
  blue_logo_shadow: string;
  fb_logo: string;
  vk_logo: string;
  twitter_logo: string;
  google_logo: string;
  github_logo: string;
  globe: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
 theme: { [key: string]: string } = {
    light_blue: '#0094f8',
    lighter_blue: '#0075c5',
    blue: '#005792',
    dark_blue: '#00395f',
    white: '#ffffff',
    white_darker: '#e6e6e6',
    text_black: '#1a1a1a'
  };
  trimColors: { [key: string]: string} = {
    'discord': '#7289da',
    'twitter': '#00ACEE',
    'google': '#e6e6e6',
    'spotify': '#1DB954',
    'github': '#4078c0',
    'linkedin': '#0e76a8',
    'trello': '#1574ef',
  };
  onlineAssets: { [key: string]: string } = {
    banner_slogan: 'https://media.discordapp.net/attachments/1153269651426525204/1153269923850764368/NAPTE_banner.png',
    banner_slogan_transparent: 'https://media.discordapp.net/attachments/1153269651426525204/1153316725165662279/NAPTE_banner-removebg-preview.png',
    white_bg_logo: 'https://media.discordapp.net/attachments/1153269651426525204/1153269924194693220/NAPTE_logo_white_2.png',
    black_bg_logo: 'https://media.discordapp.net/attachments/1153269651426525204/1153269924433772625/NAPTE_black_2.png',
    logo_square: 'https://media.discordapp.net/attachments/1153269651426525204/1153270623615848448/NAPTE_without_slogan.png',
    logo_icon: 'https://media.discordapp.net/attachments/1153269651426525204/1153270624127549450/NAPTE_logo.png',
    logo_icon_transparent: 'https://media.discordapp.net/attachments/1153269651426525204/1153270624337268746/NAPTE_LOGO_WHITE_NO_BG.png',
    banner_transparent: 'https://media.discordapp.net/attachments/1153269651426525204/1153317826816389191/NAPTE_without_slogan-removebg-preview.png',
    logo_blue: 'https://media.discordapp.net/attachments/1153269651426525204/1154012560274767873/blue_logo.png',
    vertical_wave: 'https://media.discordapp.net/attachments/1153269651426525204/1155832325171597342/web_vertical_wave.png?width=713&height=573',
    blue_logo_shadow: 'https://media.discordapp.net/attachments/1153269651426525204/1155839838474485810/blue_logo_1.png',
    fb_logo: 'https://media.discordapp.net/attachments/1153269651426525204/1155875401910976603/facebook_logo.png',
    vk_logo: 'https://media.discordapp.net/attachments/1153269651426525204/1155875402338799697/vk_logo.png',
    google_logo: 'https://media.discordapp.net/attachments/1153269651426525204/1157741529901830204/2048px-Google_22G22_Logo.png',
    twitter_logo: 'https://media.discordapp.net/attachments/1153269651426525204/1157754175325753444/x-logo-twitter-freelogovectors.net_.webp',
    globe: 'https://media.discordapp.net/attachments/1153269651426525204/1156151433054400564/pngwing_1.png',
    discord_logo: 'https://media.discordapp.net/attachments/1153269651426525204/1159016183069167676/Discord_Logo_sans_texte.svg.png',
    sheet_logo: 'https://media.discordapp.net/attachments/1153269651426525204/1161020307054788739/Google_Sheets_Logo_512px.png',
    github_logo: 'https://media.discordapp.net/attachments/1153269651426525204/1163928105803587675/pngwing.com.png',
    email_logo: 'https://media.discordapp.net/attachments/1153269651426525204/1165688584494387242/envelope-regular.png',
    email_logo_white: 'https://media.discordapp.net/attachments/1153269651426525204/1165692110645776414/download.png',
    sheet_logo_white: 'https://media.discordapp.net/attachments/1153269651426525204/1161021644110839919/output-onlinepngtools_2.png',
    google_logo_white: 'https://media.discordapp.net/attachments/1153269651426525204/1157741529901830204/2048px-Google_22G22_Logo.png',
    twitter_logo_white: 'https://media.discordapp.net/attachments/1153269651426525204/1160262270140563526/kisspng-united-states-logo-business-parramatta-eels-manly-twitter-logo-white-5b517ccc3de4d6.6451536515320670202535.png',
    discord_logo_white: 'https://media.discordapp.net/attachments/1153269651426525204/1160262488974168105/PngItem_1083749_1.png',
    github_logo_white: 'https://media.discordapp.net/attachments/1153269651426525204/1163928105803587675/pngwing.com.png',
    spotify_logo_white: 'https://media.discordapp.net/attachments/1153269651426525204/1165681112174039180/klipartz.com.png',
    spotify_logo: 'https://media.discordapp.net/attachments/1153269651426525204/1165681563476971590/spotify-logo-transparent-free-png.png',
    chess_logo_white: 'https://media.discordapp.net/attachments/1153269651426525204/1168158291231248446/noavatar_l.84a92436-removebg-preview.png',
    chess_logo: 'https://media.discordapp.net/attachments/1153269651426525204/1168157688446849065/phpmeXx6V.png',
    clashroyale_logo_white: 'https://media.discordapp.net/attachments/1153269651426525204/1168968572710703216/high-resolution-clash-royale-png-icon-21.png',
    clashroyale_logo: 'https://media.discordapp.net/attachments/1153269651426525204/1168968572710703216/high-resolution-clash-royale-png-icon-21.png',
    clashofclans_logo_white: 'https://media.discordapp.net/attachments/1153269651426525204/1168968445895917669/Clash-of-Clans-emblem.png',
    clashofclans_logo: 'https://media.discordapp.net/attachments/1153269651426525204/1168968445895917669/Clash-of-Clans-emblem.png',
    coingecko_logo_white: 'https://media.discordapp.net/attachments/1153269651426525204/1168969917517803671/coingecko1941-removebg-preview.png',
    coingecko_logo: 'https://cdn.discordapp.com/attachments/1153269651426525204/1168968927582375937/CoinGecko_logo.png',
    weather_logo_white: 'https://media.discordapp.net/attachments/1153269651426525204/1168970132652052480/weather-2021-12-07.png',
    weather_logo: 'https://media.discordapp.net/attachments/1153269651426525204/1168970132652052480/weather-2021-12-07.png',
    twitch_logo_white: 'https://media.discordapp.net/attachments/1153269651426525204/1168970684312064110/Twitch-icon-black.png',
    twitch_logo: 'https://media.discordapp.net/attachments/1153269651426525204/1168971087590199306/twitch_PNG37.png',
    trello_logo_white: 'https://media.discordapp.net/attachments/1153269651426525204/1169360068639199352/pngwing.com_1.png',
    trello_logo: 'https://media.discordapp.net/attachments/1153269651426525204/1169360068639199352/pngwing.com_1.png',
    linkedin_logo_white: 'https://media.discordapp.net/attachments/1153269651426525204/1169035791171862608/1200px-LinkedIn_icon.png',
    linkedin_logo: 'https://media.discordapp.net/attachments/1153269651426525204/1169035791171862608/1200px-LinkedIn_icon.png',
    tft_logo_white: 'https://media.discordapp.net/attachments/1152232741362999422/1169227791494037574/teamfight-tactics.png',
    tft_logo: 'https://media.discordapp.net/attachments/1152232741362999422/1169227791494037574/teamfight-tactics.png',
    brawlstar_logo_white: 'https://media.discordapp.net/attachments/1153269651426525204/1170106579664785418/brawl-stars-logo-brawl-stars-icon-transparent-free-png.png',
    brawlstar_logo: 'https://media.discordapp.net/attachments/1153269651426525204/1170106579664785418/brawl-stars-logo-brawl-stars-icon-transparent-free-png.png',
    datetime_logo_white: 'https://media.discordapp.net/attachments/1153269651426525204/1170107515728580721/clock-512.png',
    datetime_logo: 'https://media.discordapp.net/attachments/1153269651426525204/1170108609984729189/Pngtreevector_clock_icon_4152707.png',
    profile_default: 'https://media.discordapp.net/attachments/1153269651426525204/1164169419518398604/blank-profile-picture-973460_960_720.webp'
  };
  constructor() { }
}
