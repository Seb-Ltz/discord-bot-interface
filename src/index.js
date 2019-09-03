import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//========= COMPONENTS ===========//
import BotList from './Components/BotList'
import GuildList from './Components/GuildList'
import AddBotPopUp from './Components/AddBotPopUp'
import Guild from './Components/Guild'

//========= LIBRARIES ============//
import openSocket from 'socket.io-client';
// const socket = openSocket('192.168.1.15:8000');
const socket = openSocket('192.168.2.20:8000');

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {showAddBotPopUp : false};

        this.showAddBotPopUp = this.showAddBotPopUp.bind(this);
        this.hideAddBotPopUp = this.hideAddBotPopUp.bind(this);
    }

    showAddBotPopUp() {
        this.setState({showAddBotPopUp : true});
    }
    hideAddBotPopUp() {
        this.setState({showAddBotPopUp : false});
    }

    render() {
        return (
            <div>
                <h1>Discord bot</h1>
                <Guild socket={socket} /> /
                <GuildList socket={socket} />
                <BotList onAddBotClick={this.showAddBotPopUp} socket={socket} />
                {this.state.showAddBotPopUp &&
                <AddBotPopUp hidePopUp={this.hideAddBotPopUp} socket={socket}/>}
            </div>
        );
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
