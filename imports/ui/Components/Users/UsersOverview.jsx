import React, { Component } from 'react';
import ContentTable from "../Widgets/ContentTable";

class UsersOverview extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      maxItemsPerPage: 100,
      totalItems: 0,
      currentPage: 1,
      pages: 1
    }
  }
  
  changePageCallback = (page) => {
    switch(page) {
      case 'prev':
        if(this.state.currentPage > 1) {
          this.setState({currentPage: this.state.currentPage - 1});
        }
        break;
      case 'next':
        if(this.state.currentPage < this.state.pages) {
          this.setState({currentPage: this.state.currentPage + 1});
        }
        break;
      default:
        if(page > 0 && page <= this.state.pages) this.setState({currentPage: page});
    }
  };
  
  render() {
    const {history, users} = this.props;
    
    if(!users) return <div style={{height: '80vh', display:'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner name="ball-triangle-path" /></div>;
    
    const headers = ['Username', 'Email'];
    const items = users.map((user, index) => {
      return (
        <tr key={user._id}>
          <td>{user.username}</td>
          <td>{user.emails[0].address}</td>
        </tr>
      )
    });
    
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-9">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify"></i> Users
              </div>
              <div className="card-block">
                <ContentTable
                  headers={headers}
                  items={items}
                  pages={this.state.pages}
                  currentPage={this.state.currentPage}
                  changePageCallback={this.changePageCallback}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            No filters available yet
          </div>
        </div>
      </div>
    )
  }
}

export default UsersOverview;
