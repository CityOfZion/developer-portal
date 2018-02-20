import React, {Component} from 'react';
import ErrorModal from "/imports/ui/Components/ErrorModal";
import showdown from 'showdown';
import DOMPurify from 'dompurify';

class ReportAdd extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      addReportError: false,
      addReportErrorMessage: '',
      addReportSuccess: false,
      content: ''
    }
  }
  
  resetForm() {
    this.setState({content: ''});
  }
  
  submitForm() {
    if (this.state.content.length > 0) {
      Meteor.call('addReport', this.state.content, (err, res) => {
        if (err) {
          this.setState({addReportError: true, addReportErrorMessage: err.reason});
        } else {
          if (res.error) {
            this.setState({addReportError: true, addReportErrorMessage: res.error});
          } else {
            this.setState({addReportSuccess: true});
          }
        }
      })
    }
  }
  
  render() {
    const {history} = this.props;
    const converter = new showdown.Converter({
      simplifiedAutoLink: true,
      excludeTrailingPunctuationFromURLs: true,
      openLinksInNewWindow: true,
      simpleLineBreaks: true,
    });
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify"> </i> Create report for week {moment().isoWeek()}
              </div>
              <div className="card-block">
                <form action="" method="post">
                  <div className="form-group">
                    <label htmlFor="nf-password">Report</label>
                    <textarea id="report" name="report" rows="9" className="form-control"
                              placeholder="Enter your report here"
                              onChange={e => this.setState({content: e.currentTarget.value})}
                              value={this.state.content}>
                      {this.state.content}
                    </textarea>
                  </div>
                </form>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-sm btn-primary" onClick={e => this.submitForm()}><i
                  className="fa fa-dot-circle-o"> </i> Save
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify"> </i> Example output
              </div>
              <div className="card-block">
                <div className="form-group"
                     dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(converter.makeHtml(this.state.content))}}/>
              </div>
            </div>
          </div>
        </div>
        <ErrorModal
          opened={this.state.addReportError}
          disableCancel={true}
          confirmMessage="Close"
          type="warning"
          message={this.state.addReportErrorMessage}
          title="Error"
          callback={() => this.setState({addReportError: false, addReportErrorMessage: ''})}/>
        <ErrorModal
          opened={this.state.addReportSuccess}
          type="success"
          message="Your report was submitted"
          disableCancel={true}
          title="Success"
          callback={() => this.setState({addReportSuccess: false})}/>
      </div>
    )
  }
}

export default ReportAdd;
