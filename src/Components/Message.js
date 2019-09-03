import React from 'react';

export default class Message extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const message = this.props.message;
        const msgCreatedAt = new Date(message.createdAt);
        const avatarUrl = message.author.avatarURL ? message.author.avatarURL : "https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png";
        const timeMinutes = msgCreatedAt.getMinutes().toString().length == 1 ? "0" + msgCreatedAt.getMinutes() : msgCreatedAt.getMinutes();
        const timeHours = msgCreatedAt.getHours().toString().length == 1 ? "0" + msgCreatedAt.getHours() : msgCreatedAt.getHours();
        return (
            <div className="message">
                <div className="message-avatar">
                    <img src={avatarUrl} alt="avatar url" />
                </div>
                <div className="message-data">
                    <h3 style={{color : message.author.color}}>{message.author.displayName}</h3>
                    <p className="message-date">{msgCreatedAt.getDate()}/{msgCreatedAt.getMonth()}/{msgCreatedAt.getFullYear()} at {timeHours}:{timeMinutes} </p>
                </div>
                <div className="message-content">
                    {message.content}
                </div>
            </div>
        );
    }

}
