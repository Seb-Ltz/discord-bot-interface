import React from 'react';

//========= COMPONENTS ===========//
import ChannelCategory from './ChannelCategory';
import Channel from './Channel';

export default class ChannelList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        var guildName = this.props.guild.name ? this.props.guild.name : "";
        if(guildName.length > 20) {
            guildName = guildName.substring(0, 20) + "...";
        }

        return(
            <div className="channel-list">
                <div className="guild-name">
                    <h1>{guildName}</h1>
                </div>
                <div className="guild-channels">
                    <ul>
                        {this.props.guild.channels.map((channel) => (
                            <li key={channel.id}>
                                {channel.type == "category" &&
                                    <ChannelCategory socket={this.props.socket} guildId={this.props.guild.id} channel={channel} channelClick={this.props.channelClick} selectedChannelName={this.props.selectedChannelName}/> }
                                {channel.type != "category" &&
                                    <div>
                                        <div className="uncategorized-channel">
                                            <Channel socket={this.props.socket} guildId={this.props.guild.id} channel={channel} channelClick={this.props.channelClick} selectedChannelName={this.props.selectedChannelName}/>
                                        </div>
                                        <div className="channel-space"></div>
                                    </div>
                                }

                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

}

function getChannelSpan(type) {
    if(type == "text") {
        return (<span className="hashtag">#</span>);
    } else if(type == "voice") {
        return (<span className="hashtag">🔊</span>);
    } else if (type == "category") {
        return (<span className="hashtag">\/</span>);
    }
}
