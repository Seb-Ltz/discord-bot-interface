import React from 'react';

//========= COMPONENTS ===========//
import GuildInfo from './GuildInfo'

export default class GuildList extends React.Component {
    constructor(props) {
        super(props)

        this.state =
        {
            guilds : [],
            selectedGuildId : null
        };

        this.selectGuildOnClick = this.selectGuildOnClick.bind(this);

        this.props.socket.on('get_guilds', (guild) => {
            this.setState({guilds : guild});
        });
    }

    selectGuildOnClick(guildId) {
        this.setState({selectedGuildId : guildId});
        //Tell socketio that a new bot was selected (so we can get the channels)
        this.props.socket.emit("guild_selected", guildId);
    }

    render() {
        return (
            <div className="guild-list">
                <ul>
                    {this.state.guilds.map((guild) => (
                        <li key={guild.id}>
                            <GuildInfo guild={guild} onClick={this.selectGuildOnClick} isSelected={guild.id == this.state.selectedGuildId}/>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

}
