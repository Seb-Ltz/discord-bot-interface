import React from 'react';

export default class GuildInfo extends React.Component {

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
                    <div className="nametag"><p>{this.props.guild.name}</p></div>}

                {!this.props.guild.iconURL &&
                <div
                    className={this.props.isSelected ? "icon-div selected-img" : "icon-div"}
                    onMouseEnter={this.mouseEnterHandler}
                    onMouseLeave={this.mouseLeaveHandler}
                    onClick={() => this.props.onClick(this.props.guild.id)}>
                    <p>{this.props.guild.acronym}</p>
                </div>}

                {this.props.guild.iconURL &&
                    <img
                        onMouseEnter={this.mouseEnterHandler}
                        onMouseLeave={this.mouseLeaveHandler}
                        onClick={() => this.props.onClick(this.props.guild.id)}
                        className={this.props.isSelected ? "selected-img" : null}
                        src={this.props.guild.iconURL} alt="discord guild icon" />}

            </div>
        );
    }

}
