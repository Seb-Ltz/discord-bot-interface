import React from 'react';

export default class AddBotPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {inputKey : "", inputError : ""};
        // this.props.hidePopUp
        this.handleInputKeyChange = this.handleInputKeyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputKeyChange(e) {
        //If there is an error, remove it
        if(this.state.inputError != "") {
            this.setState({inputError : ""})
        }
        this.setState({inputKey : e.target.value})
    }

    handleSubmit(e) {
        if(this.state.inputKey == "") {
            this.setState({inputError : "(No key found.)"})
        } else {
            this.props.socket.emit('add_bot_key', this.state.inputKey);
            this.props.hidePopUp();
        }
        e.preventDefault();
    }

    render() {
        const addbotInputClass = this.state.inputError == "" ? "addbot-input" : "addbot-input addbot-input-error"
        return (
            <div>
                <div className="popup-mask" onClick={this.props.hidePopUp}></div>
                <div className="pop-up">
                    <form onSubmit={this.handleSubmit}>
                        <h2 className="green-title">ADD A BOT</h2>

                        <input className={addbotInputClass} value={this.state.inputKey} onChange={this.handleInputKeyChange} />
                        <p className="input-explain">Enter the key of a bot</p>
                        {/* IF ERROR IN POPUP */}
                        {this.state.inputError != "" &&
                        <p className="input-error">{this.state.inputError}</p>}
                        <div className="popup-submit">
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}
