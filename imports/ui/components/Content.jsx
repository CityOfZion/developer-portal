import React, {Component} from 'react';

class Content extends Component {
  render() {
    const {content} = this.props;
    return (<div className="content-wrapper">
      {content}
    </div>);
  }
}

export default Content;