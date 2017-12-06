import React, {Component} from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import Chat from "./subcomponents/Chat";
import Keypress from "react-keypress";

class MessageThread extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      subscription: {
        messages: Meteor.subscribe('messagesById', this.props.match.params.id)
      },
      message: ''
    }
  }
  
  sendMessage(chatId, message) {
    if(message.length > 0) {
      Meteor.call('sendChatMessage', chatId, message, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({message: ''});
        }
      });
    }
  }
  
  componentWillUnmount() {
    this.state.subscription.messages.stop();
  }
  
  messages() {
    return Messages.find().fetch();
  }
  
  render() {
    const messages = this.messages()[0] || {messages: []};
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-9">
            <div className="card">
              <Chat targetUser={messages.toUserId === Meteor.userId() ? messages.fromUserId : messages.toUserId} messages={messages.messages} />
              <div className="card">
                <div className="card-block">
                  <textarea value={this.state.message} onKeyPress={Keypress("ctrl enter", e => {this.sendMessage(this.props.match.params.id, this.state.message)})} rows="9" placeholder="Fill in a message" className="form-control" onChange={e => this.setState({message: e.currentTarget.value})}>
                  </textarea>
                </div>
                <div className="card-footer">Characters: {this.state.message.length}</div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            options here
          </div>
        </div>
      </div>
    )
  }
}

ReactMixin(MessageThread.prototype, TrackerReactMixin);


export default MessageThread;
