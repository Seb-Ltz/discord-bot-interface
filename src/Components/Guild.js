import React from 'react';

//========= COMPONENTS ===========//
import ChannelList from './ChannelList'
import Discussion from './Discussion'

export default class Guild extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            guild : {
                id : null,
                name : null,
                avatarURL : null,
                memberCount : null,
                channels : []
            },
            channelMessages : [],
            displayedMessage : {},
            displayedChannelName : ""
        }

        this.props.socket.on('get_guild_content', (guildData) => {
            //And reset the channel messages
            this.setState({
                guild : guildData,
                channelMessages : [],
                displayedChannelName : "",
                displayedMessage : []
            });
        });

        this.props.socket.on('get_channel_messages', (messageData) => {
            var msgChannels = this.state.channelMessages.splice(0);

            msgChannels.push(messageData);
            this.setState({channelMessages : msgChannels});
        });

        this.handleChannelClick = this.handleChannelClick.bind(this);
    }

    handleChannelClick(channel) {
        var channelId = channel.id;
        if(channel.type == "text") {

            if(this.state.channelMessages) {
                var channelMsg = this.state.channelMessages.find(function(channelMessage) {
                    return channelMessage.id == channelId;
                });
            }
            
            this.setState({displayedMessage : channelMsg.messages,
                           displayedChannelName : channel.name});
        }
    }

    render() {
        return(
            <div className="guild-content">
                <ChannelList socket={this.props.socket} guild={this.state.guild} channelClick={this.handleChannelClick} selectedChannelName={this.state.displayedChannelName}/>
                <Discussion socket={this.props.socket} messages={this.state.displayedMessage} selectedChannelName={this.state.displayedChannelName}/>
            </div>
        );
    }

}
