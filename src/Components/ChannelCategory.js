import React from 'react';

//========= COMPONENTS ===========//
import Channel from './Channel';

const categoryArrow = (<svg width="12" height="12" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 10L12 15 17 10"></path></svg>);

export default class ChannelCategory extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="category">
                <div className="category-title">
                     {categoryArrow} {this.props.channel.name}
                </div>
                <div>
                    <ul>
                        {this.props.channel.childrens.map((channel) => (
                            <li key={channel.id}>
                                <Channel socket={this.props.socket} guildId={this.props.guildId} channel={channel} channelClick={this.props.channelClick} selectedChannelName={this.props.selectedChannelName} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
