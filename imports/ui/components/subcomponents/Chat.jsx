import React, {Component} from 'react';
import Initicon from 'react-initicon';

class Chat extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      subscription: {
        targetUser: Meteor.subscribe('getPublicProfileById', this.props.targetUser)
      }
    }
  }
  
  componentWillUnmount() {
    this.state.subscription.targetUser.stop();
  }
  
  users() {
    return Meteor.users.find({_id: this.props.targetUser}).fetch();
  }
  
  render() {
    const {messages} = this.props;
    const targetUser = this.users()[0] || {username: ''};
    return (
      <div className="card">
        <div className="card-header">
          <i className="fa fa-align-justify"></i> Chat
        </div>
        <div className="card-block">
          {messages.map((message, index) => {
            if (message.byUser === Meteor.user()._id) {
              return <div className="row" key={`message${index}`}>
                <div className="col-2">
                  <Initicon
                    size={50}
                    text={Meteor.user().username}
                    seed={20}
                    single={false}
                  />
                </div>
                <div className="col-10">
                  <div className="card card-accent-success">
                    <div className="card-block">
                      {message.message}
                    </div>
                  </div>
                </div>
              </div>
            } else {
              return <div className="row" key={`message${index}`}>
                <div key={`message${index}`} className="col-10">
                  <div className="card card-accent-primary">
                    <div className="card-block">
                      {message.message}
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <Initicon
                    size={50}
                    text={targetUser.username}
                    seed={4}
                    single={false}
                  />
                </div>
              </div>
            }
          })}
        </div>
      </div>
    )
  }
}

export default Chat;
