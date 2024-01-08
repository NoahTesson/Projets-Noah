import discord
from discord.ext import commands
import requests
import os
from dotenv import load_dotenv

load_dotenv()

intents = discord.Intents.all()
intents.members = True
bot = commands.Bot(command_prefix='!',  intents=intents)

print("je suis la")

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user.name} ({bot.user.id})')
    for server in bot.guilds:
        print(server.id)

@bot.event
async def on_presence_update(before, after):
    print("jsuis la \n")
    if before.status != after.status:
        print("jsuis la \n")
        user = after
        new_status = after.status
        print(f'{user.name} changed status to {new_status} / {before.status}')
        try :
            data = {
                "new_status": new_status[0],
                "prev_status": before.status[0],
                "user": user.name
            }
            requests.post(f'http://localhost:8080/api/discord/user/updateStatus?server={before.guild.id}', json=data)
        except Exception as e:
            print(e)

@bot.event
async def on_message(message):
    if message.author == bot.user:
        return
    try :
        data = {
            "channel": message.channel.name,
            "author": message.author.name,
            "guild": message.guild.name,
            "content": message.content
        }

        requests.post(f'http://localhost:8080/api/discord/messages/channel?server={message.guild.id}', json=data)
    except Exception as e:
        print(e)

@bot.event
async def on_guild_channel_create(channel):
    try:
        data = {
            "name": channel.name,
            "guild": channel.guild.name
        }
        requests.post(f'http://localhost:8080/api/discord/channel/create?server={channel.guild.id}', json=data)
    except Exception as e:
        print(e)

@bot.event
async def on_guild_channel_update(before, after):
    try:
        data = {
            "prev_name": before.name,
            "name": after.name,
            "guild": after.guild.name
        }
        requests.post(f'http://localhost:8080/api/discord/channel/update?server={before.guild.id}', json=data)
    except Exception as e:
        print(e)

@bot.event
async def on_guild_channel_delete(channel):
    try:
        data = {
            "name": channel.name,
            "guild": channel.guild.name
        }
        requests.post(f'http://localhost:8080/api/discord/channel/delete?server={channel.guild.id}', json=data)
    except Exception as e:
        print(e)

@bot.event
async def on_guild_channel_pins_update(channel, last_pin):
    try:
        data = {
            "name": channel.name,
            "guild": channel.guild.name
        }
        requests.post(f'http://localhost:8080/api/discord/channel/pins?server={channel.guild.id}', json=data)
    except Exception as e:
        print(e)

@bot.event
async def on_typing(channel, user, when):
    try:
        data = {
            "user": user.name,
            "channel": channel.name,
            "guild": channel.guild.name,
        }
        requests.post(f'http://localhost:8080/api/discord/user/typing?server={channel.guild.id}', json=data)
    except Exception as e:
        print(e)

@bot.event
async def on_member_update(before, after):
    print('member update')
    pass

@bot.event
async def on_member_join(member):
    try :
        data = {
            "name" : member.name,
            "guild": member.guild.name
        }
        requests.post(f'http://localhost:8080/api/discord/user/join?server={member.guild.id}', json=data)
    except Exception as e:
        print(e)

@bot.event
async def on_member_remove(member):
    try :
        data = {
            "name" : member.name,
            "guild": member.guild.name
        }
        requests.post(f'http://localhost:8080/api/discord/user/remove?server={member.guild.id}', json=data)
    except Exception as e:
        print(e)

@bot.event
async def on_member_ban(guild, user):
    try :
        data = {
            "name" : user.name,
            "guild": guild.name
        }
        requests.post(f'http://localhost:8080/api/discord/user/ban?server={guild.id}', json=data)
    except Exception as e:
        print(e)


@bot.event
async def on_member_unban(guild, user):
    try :
        data = {
            "name" : user.name,
            "guild": guild.name
        }
        requests.post(f'http://localhost:8080/api/discord/user/unban?server={guild.id}', json=data)
    except Exception as e:
        print(e)

bot.run(os.getenv("BOT_TOKEN"))
