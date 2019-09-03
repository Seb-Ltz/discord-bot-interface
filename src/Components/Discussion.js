import React from 'react';

//========= COMPONENTS ===========//
import Message from './Message'

export default class Discussion extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="discussion">
                <div className="discussion-title">
                    {this.props.selectedChannelName != "" &&
                        <h1><span className="hashtag">#</span> {this.props.selectedChannelName}</h1>}
                </div>
                <div className="tchat">
                    <ul>
                        {Object.keys(this.props.messages).length !== 0 &&
                            this.props.messages.map((message) => (
                                <li key={message.id}>
                                    <Message message={message}/>
                                </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
