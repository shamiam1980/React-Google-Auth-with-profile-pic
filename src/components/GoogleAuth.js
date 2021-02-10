import React from "react";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null, userPhoto: "true" };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "797401886567-9cumct9mrt3v2va409rasa7fa6fq02hh.apps.googleusercontent.com",
          scope: "email profile",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
          if (this.auth.isSignedIn.get()) {
            this.getProfilePic();
          }
        });
    });
  }

  getProfilePic = () => {
    this.profile = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getBasicProfile().fI;
    this.setState({ userPhoto: this.profile });
  };

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignIn = () => {
    this.auth.signIn();
    this.auth.isSignedIn.listen(this.getProfilePic);
  };

  onSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={this.state.userPhoto}
            alt='profile'
            style={{ width: "45px", borderRadius: "50%", marginRight: "10px" }}
          />
          <button onClick={this.onSignOut} className='ui red google button'>
            <i className='google icon' />
            Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <button onClick={this.onSignIn} className='ui red google button'>
          <i className='google icon' />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
