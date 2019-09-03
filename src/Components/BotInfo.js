import React from 'react';

export default class BotInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {showName : false};

        this.mouseEnterHandler = this.mouseEnterHandler.bind(this);
        this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);
    }

    mouseEnterHandler() {
        this.setState({showName : true});
    }
    mouseLeaveHandler() {
        this.setState({showName : false});
    }

    render() {
        return (
            <div>
                {/* White bar at the left if selected */}
                {this.props.isSelected &&
                <div className="selected-spot"></div>}

                {/* Shows the name of bot on hovering */}
                {this.state.showName &&
                    <div className="nametag"><p>{this.props.bot.name}</p></div>}
                    
                <img
                    onMouseEnter={this.mouseEnterHandler}
                    onMouseLeave={this.mouseLeaveHandler}
                    onClick={() => this.props.onClick(this.props.bot.id)}
                    className={this.props.isSelected ? "selected-img" : null}
                    src={this.props.bot.avatarURL} alt="discord bot avatar" />
            </div>
        );
    }
}
