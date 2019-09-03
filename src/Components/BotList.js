import React from 'react';

//========= COMPONENTS ===========//
import BotInfo from './BotInfo'


export default class BotList extends React.Component {
    constructor(props) {
        super(props);
        const avatarURL = "http://i0.kym-cdn.com/photos/images/facebook/000/993/875/084.png";

        this.state =
        {
            bots : [],
            selectedBotId : null
        };

        // this.props.socket.emit('console_send', "Hello world of react :)");
        this.selectBotOnClick = this.selectBotOnClick.bind(this);

        //When we get the data of the bots on connection
        this.props.socket.on('get_bots', (bots) => {
            this.setState({bots : bots});
        });

        //New bot was added : add it to the bots
        this.props.socket.on('new_bot', (bot) => {
            var botList = this.state.bots.splice(0);
            botList.push(bot);
            this.setState({bots : botList});
        });

        //Someone selected a new bot
        this.props.socket.on('select_bot', (botId) => {
            this.setState({selectedBotId : botId});
        });

        this.props.socket.on('update_bot', (botData) => {
            var botList = this.state.bots.splice(0);
            var botIndex = botList.findIndex((bot) => {
                return bot.id == botData.id;
            });
            botList[botIndex] = botData;
            this.setState({bots : botList});
        });
    }


    selectBotOnClick(botId) {
        this.setState({selectedBotId : botId});
        //Tell socketio that a new bot was selected
        this.props.socket.emit("bot_selected", botId);
    }

    render() {
        return(
            <div className="bot-list">
                <ul>
                    {this.state.bots.map((bot) => (
                        <li key={bot.id}>
                            <BotInfo bot={bot} onClick={this.selectBotOnClick} isSelected={bot.id == this.state.selectedBotId} />
                        </li>
                    ))}
                    <li onClick={this.props.onAddBotClick} className="addbot-button" key="addbot">
                        <div>+</div>
                    </li>
                </ul>
            </div>
        );
    }
}
