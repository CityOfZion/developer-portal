import React, {Component} from 'react';

class ContentTable extends Component {
  
  pagination(pages, currentPage, changePageCallback) {
    const items = [];
    
    items.push(<li className="page-item" key="navprev"><a className="page-link" href="#" onClick={e => changePageCallback('prev')}>Prev</a></li>);
    
    for(let i = 1; i <= pages; i++) {
      if(i === currentPage) items.push(<li className="page-item active" key={`nav${i}`}><a className="page-link" href="#" onClick={e => changePageCallback(i)}>{i}</a></li>);
      else items.push(<li className="page-item" key={`nav${i}`}><a className="page-link" href="#" onClick={e => changePageCallback(i)}>{i}</a></li>);
    }
    
    items.push(<li className="page-item" key={`navnext`}><a className="page-link" href="#" onClick={e => changePageCallback('next')}>Next</a></li>);
    
    return items;
  }
  
  render() {
    const {history, headers, items, pages, currentPage, changePageCallback} = this.props;
    
    return (
      <div>
        <table className="table table-striped">
          <thead>
          <tr>
            {headers.map((head, index) => <th key={`th${index}`}>{head}</th>)}
          </tr>
          </thead>
          <tbody>
          {items}
          </tbody>
        </table>
        <ul className="pagination">
          {this.pagination(pages, currentPage, changePageCallback)}
        </ul>
      </div>
    )
  }
}

export default ContentTable;
