import React, { Component } from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';

class MessagesOverview extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      subscription: {
        messages: Meteor.subscribe('messages')
      },
      selectedMessages: [],
      selectedFilters: []
    }
  }
  
  componentWillUnmount() {
    this.state.subscription.messages.stop();
  }
  
  messages() {
    const msgs = Messages.find({}).fetch();
    console.log(msgs);
    return msgs;
  }
  
  render() {
    const {history} = this.props;
    return (
      <div className="animated fadeIn">
        <div className="row">
        <div className="col-lg-9">
          <div className="card">
            <div className="card-header">
              <i className="fa fa-align-justify"></i> Chats
            </div>
            <div className="card-block">
              <table className="table table-striped">
                <thead>
                <tr>
                  <th>From</th>
                  <th>Date</th>
                  <th>Messages</th>
                  <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {this.messages().map((message, index) => {
                  console.log('msg', message, index);
                  let hasUnread = false;
                  for(let i = 0; i < message.messages.length; i++) {
                    if(!message.messages[i].read) {
                      hasUnread = true;
                      break;
                    }
                  }
                  
                  return (
                    <tr key={message._id} onClick={e => history.push(`/chats/${message._id}`)}>
                      <td>{message.fromUserId}</td>
                      <td>{moment(message.dateSent).format('YYYY/MM/DD HH:mm:ss')}</td>
                      <td>{message.messages.length}</td>
                      <td>
                        {hasUnread ? <span className="badge badge-warning">Unread</span> : <span className="badge badge-success">Read</span>}
                      </td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
              <ul className="pagination">
                <li className="page-item"><a className="page-link" href="#">Prev</a></li>
                <li className="page-item active">
                  <a className="page-link" href="#">1</a>
                </li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">4</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          filters here
        </div>
      </div>
      </div>
    )
  }
}

ReactMixin(MessagesOverview.prototype, TrackerReactMixin);


export default MessagesOverview;
