const Discord = require('discord.js');
const client = new Discord.Client();

const io = require('socket.io')();

var botList = [];
var activeBotId = null;
var selectedBotId = null;
var guildList = [];

// TODO :
//      * Add scroll dans le channel list
//      * Reset le selected server quand y'a un nouveau bot
//      * Regler le problème de selection quand on appuie sur enter dans la popup
//      * Verifier client et server si botkey existe déjà


io.on('connection', (socket) => {
    //SEND ALL THE IMPORTANT DATA
    socket.emit('get_bots', botList);
    socket.emit('get_guilds', guildList);
    if(selectedBotId != null) {
        socket.emit('select_bot', selectedBotId);
    }


    socket.on('add_bot_key', (botToken) => {
        var emptyBot = {name : 'New bot ' + (botList.length + 1),
                        avatarURL : "https://images.discordapp.net/avatars/256846874122649610/8287f0f034a4d9e85d9e3a3851433aa3.png",
                        id : botList.length + 1,
                        token : botToken }
        botList.push(emptyBot);
        io.emit('new_bot', emptyBot);
    });

    socket.on('bot_selected', (botId) => {
        //Say that this bot was selected
        socket.broadcast.emit('select_bot', botId);
        selectedBotId = botId;

        //Try to connect
        //If already connected, disconnect first
        if(client.token != null || activeBotId != null) {
            client.destroy().then(res => {
                console.log("DISCONNECTED BOT");
                connectToBot(botId);
            }).catch(console.error);
        } else {
            connectToBot(botId);
        }

        // io.emit('new_bot', emptyBot);
    });

    socket.on('guild_selected', (guildId) => {
        var selectedGuild = client.guilds.find('id', guildId);

        var guildData = {
            id : guildId,
            name : selectedGuild.name,
            avatarURL : selectedGuild.avatarURL,
            memberCount : selectedGuild.memberCount,
            channels : []
        };

        guildData.channels = sortChannels(selectedGuild.channels.array())

        socket.emit('get_guild_content', guildData);


        selectedGuild.channels.array().forEach((channel) => {
            if(channel.type == "text") {
                channel.fetchMessages({ limit: 30 })
                    .then(messages => {
                        var messagesData = [];

                        messages.array().forEach((message) => {
                            messagesData.unshift({
                                content : message.cleanContent,
                                createdAt : message.createdAt,
                                id : message.id,
                                author : {
                                    displayName : message.member.displayName,
                                    username : message.author.username,
                                    id : message.author.id,
                                    color : message.member.displayHexColor,
                                    avatarURL : message.author.avatarURL
                                }
                            });
                        });

                        socket.emit('get_channel_messages', {id : channel.id, messages : messagesData});

                        //TODO: ADD THE EMBED
                    }).catch(console.error);
                }
        });


    });

});

function connectToBot(botId) {
    client.login(findBotById(botId).token).then(res => {
        console.log("CONNECTED !");
        //SUCCESS CONNECTING
        activeBotId = botId;
        //Update profile pic, name etc
        var botData = botList[findBotIndexById(botId)];
        botData.name = client.user.username;
        botData.avatarURL = client.user.avatarURL;
        io.emit('update_bot', botData);

        //Update guild list
        var guilds = [];
        client.guilds.array().forEach((guild) => {
            //If bot is member of that guild
            if(guild.members.exists('id', client.user.id)) {
                guilds.push({
                    name : guild.name,
                    iconURL : guild.iconURL,
                    id : guild.id,
                    acronym : guild.nameAcronym
                });
            }
        });

        guildList = guilds;

        io.emit('get_guilds', guilds);

    }).catch(err => {
        //FAILED CONNECTING to the Id
        console.log(err);
        activeBotId = null;
        selectedBotId = null;
        // io.emit('error', {token : botTokens[botId].token, err : err});
    });
}

function sortChannels(channels) {
    var channelList = [];
    for(var i = 0; i < channels.length; i++) {
        //if they are category then add them to the array with the childrens
        if(channels[i].type == "category") {
            var childrens = [];

            channels[i].children.array().forEach((channel) => {
                childrens.push({
                    name : channel.name,
                    type : channel.type,
                    id : channel.id,
                    parentID : channel.parentID,
                    position : channel.position,
                    childrens : []
                });
            });

            //Sort the childrens channel
            childrens.sort((channelA, channelB) => {
                return channelA.position - channelB.position;
            });

            channelList.push({
                name : channels[i].name,
                type : channels[i].type,
                id : channels[i].id,
                parentID : channels[i].parentID,
                position : channels[i].position,
                childrens : childrens
            });
        } else if (channels[i].parentID == null) {
            //It is a channel without a category
            channelList.push({
                name : channels[i].name,
                type : channels[i].type,
                id : channels[i].id,
                parentID : channels[i].parentID,
                position : channels[i].position,
                childrens : []
            });
        }
    }

    channelList.sort((channelA, channelB) => {
        //Sort the text / vocal channels to the top
        if (channelA.type != "category" && channelB.type != "category") {
            return channelA.position - channelB.position;
        } else if (channelA.type != "category") {
            return -1;
        } else if (channelB.type != "category") {
            return 1;
        }
        //Then sort categories
        return channelA.position - channelB.position;
    });

    return channelList;
}

function findBotById(botId) {
    return botList.find(function(bot) {
      return bot.id == botId;
    });
}
function findBotIndexById(botId) {
    return botList.findIndex(function(bot) {
      return bot.id == botId;
    });
}


const port = 8000;
io.listen(port);
console.log('listening on port ', port);

/*
NDM3NzI4ODY2MDIzMzc0ODU4.Db6VQA.eI6uI95DsY2D4H7jPYBDo56V_-g
Mzg5NTI1NjMxNTEzMTMzMDU4.DcI0qg._ER0YLAL0cnnNPV-VXY1RyJ5YLY
*/
