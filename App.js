import React, { Component } from "react"
import "./App.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
  apiKey: "AIzaSyAytiBVd8nCloHpCAJ97hvcJygQ48Cl21A",
  authDomain: "hostel-app-c8307.firebaseapp.com"
})

class App extends Component {
  state = { isSignedIn: false }
  // state={
  //   user:'',
  //   floor:'',
  //   hostel_no:'',
  //   room_no:'',
  // }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <>
          <span>
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
          </span>
          <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
          <h4>You have already booked a room. </h4>
          <h3>Your room details are as follows:</h3>
          <>Hostel No: B4
          <br/>
          Room No.8</>
          </>
        ) : (
        <>
            <h4>Hostel Allocation</h4>
            <br/>
            <>Please Sign-in:</>
            <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
          </>
        )}
      </div>
    )
  }
}
export default App

