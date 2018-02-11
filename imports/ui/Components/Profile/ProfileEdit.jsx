import React, {Component} from 'react';
import ErrorModal from "/imports/ui/Components/ErrorModal";
import Spinner from 'react-spinkit';

class ProfileEdit extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      editProfileError: false,
      editProfileErrorMessage: '',
      editReportSuccess: false,
      profile: {
        mainWalletAddress: '',
        optionalWalletAddress: '',
        firstName: '',
        lastName: ''
      }
    }
  }
  
  resetForm() {
    this.setState({
      profile: {
        mainWalletAddress: '',
        optionalWalletAddress: '',
        firstName: '',
        lastName: ''
      }
    });
  }
  
  componentWillMount() {
    if (Meteor.user() && Meteor.user().profile) this.setState({initialized: true, profile: Meteor.user().profile});
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (Meteor.user().profile && !this.state.initialized) {
      this.setState({initialized: true, profile: Meteor.user().profile});
    }
  }
  
  submitForm() {
    Meteor.call('editProfile', this.state.profile, (err, res) => {
      if (err) {
        this.setState({editProfileError: true, editProfileErrorMessage: err.reason});
      } else {
        if (res.error) {
          this.setState({editProfileError: true, editProfileErrorMessage: res.error});
        } else {
          this.setState({editReportSuccess: true});
        }
      }
    })
  }
  
  render() {
    const {history} = this.props;
    
    if (!Meteor.user()) return <div style={{height: '80vh', display:'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner name="ball-triangle-path" /></div>;
    const {profile} = Meteor.user();
    
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-pencil"> </i> Edit your profile
              </div>
              <div className="card-block">
                <div className="form-group row">
                  <label className="col-md-3 form-control-label">Username</label>
                  <div className="col-md-9">
                    <p className="form-control-static">{profile.username}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3 form-control-label" htmlFor="text-input">Email</label>
                  <div className="col-md-9">
                    <p className="form-control-static">{profile.emails[0].address}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3 form-control-label" htmlFor="text-input">Wallet Address</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="walletAddress"
                      name="walletAddress"
                      className="form-control"
                      onChange={e => {
                        const state = this.state.profile;
                        state.mainWalletAddress = e.currentTarget.value;
                        this.setState({profile: state});
                      }}
                      value={this.state.profile.mainWalletAddress || ''} placeholder="Address"/>
                    <span className="help-block">Fill in your NEO wallet address</span>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3 form-control-label" htmlFor="text-input">Optional Wallet Address</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="optionalAddress"
                      name="optionalAddress"
                      className="form-control"
                      onChange={e => {
                        const state = this.state.profile;
                        state.optionalWalletAddress = e.currentTarget.value;
                        this.setState({profile: state});
                      }}
                      value={this.state.profile.optionalWalletAddress || ''}
                      placeholder="Optional Address"/>
                    <span className="help-block">Fill in your optional NEO wallet address</span>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3 form-control-label" htmlFor="text-input">First Name</label>
                  <div className="col-md-9">
                    <input type="text" id="firstName" name="firstName" className="form-control"
                           onChange={e => {
                             const state = this.state.profile;
                             state.firstName = e.currentTarget.value;
                             this.setState({profile: state});
                           }}
                           value={this.state.profile.firstName || ''} placeholder="First Name"/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3 form-control-label" htmlFor="text-input">Last Name</label>
                  <div className="col-md-9">
                    <input type="text" id="lastName" name="lastName" className="form-control"
                           onChange={e => {
                             const state = this.state.profile;
                             state.lastName = e.currentTarget.value;
                             this.setState({profile: state});
                           }}
                           value={this.state.profile.lastName || ''} placeholder="Last Name"/>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-sm btn-primary" onClick={e => this.submitForm()}><i
                  className="fa fa-dot-circle-o"> </i> Submit
                </button>
                <button type="reset" className="btn btn-sm btn-danger" onClick={e => this.resetForm()}><i
                  className="fa fa-ban"> </i> Reset
                </button>
              </div>
            </div>
          </div>
        </div>
        <ErrorModal
          opened={this.state.editProfileError}
          type="warning" disableCancel={true}
          confirmText="Close"
          message={this.state.editProfileErrorMessage}
          title="Error"
          callback={() => this.setState({editProfileError: false, editProfileErrorMessage: ''})}/>
        <ErrorModal
          opened={this.state.editReportSuccess}
          type="success"
          message="Your profile was edited"
          title="Success"
          confirmText="Close"
          disableCancel={true}
          callback={() => history.push('/profile')}/>
      </div>
    )
  }
}

export default ProfileEdit;
