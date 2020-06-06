// import React, { useState, useEffect } from "react";
// import firebase, { auth } from "firebase";
// import axios from "axios";
// // import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// // firebase.initializeApp({
// //   apiKey: "AIzaSyCs-PhYAG1ZEYuF9Hbhinn7Iwh9ZhwrNJ4",
// //   authDomain: "koompiplay-a02eb.firebaseapp.com",
// // });
// const Authfirebase = () => {
//   const [state, setState] = useState({
//     isSingedIn: false,
//   });
//   const uiConfig = {
//     signInFlow: "popup",
//     signInOptions: [
//       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//       firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//       firebase.auth.GithubAuthProvider.PROVIDER_ID,
//       firebase.auth.EmailAuthProvider.PROVIDER_ID,
//     ],
//     callbacks: {
//       signInSuccess: () => false,
//     },
//   };
//   const SinginSocial = () => {
//     firebase.auth().signInWithPopup(uiConfig);
//     console.log("click");
//   };

//   useEffect(() => {
//     firebase.auth().onAuthStateChanged((user) => {
//       setState({ isSingedIn: !!user });
//       console.log("user", user);

//       fetch("http://localhost:8000/all_register", user, {
//         method: "POST",
//         headers: {
//           headers: {
//             Accept: "application/json, text/plain, */*",
//             "Content-type": "application/json",
//           },
//         },
//       })
//         // axios
//         //   .post("http://localhost:8000/all_register", { ...user },)
//         //   .then(function (res) {
//         //     console.log(res);
//         //   })
//         .then((res) => res.json())
//         .catch(function (err) {
//           console.log(err);
//         });
//     });
//   }, []);
//   return (
//     <div>
//       {state.isSingedIn ? (
//         <span>
//           <div>Signed In!</div>
//           <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
//           {/* <h1>Welcome {firebase.auth().currentUser.displayName}</h1> */}
//           <img
//             alt="profile picture"
//             src={firebase.auth().currentUser.photoURL}
//           />
//           <h1>{firebase.auth().currentUser.phoneNumber}</h1>
//           <h1> {firebase.auth().currentUser.refreshToken} hg</h1>
//         </span>
//       ) : (
//         <div>
//           {/* <button onClick={firebase.auth().signInWithPopup(uiConfig)}> */}
//           <StyledFirebaseAuth
//             uiConfig={uiConfig}
//             firebaseAuth={firebase.auth()}
//           />

//           {/* </button> */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Authfirebase;

// // import React, { useState } from "react";
// // import firebase from "firebase";

// // const Authfirebase = () => {
// //   // const [state, setState] = useState(false);
// //   const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
// //   const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
// //   const conf = {
// //     apiKey: "AIzaSyCs-PhYAG1ZEYuF9Hbhinn7Iwh9ZhwrNJ4",
// //     authDomain: "koompiplay-a02eb.firebaseapp.com",
// //   };

// //   const app = firebase.initializeApp(conf);

// //   const authWithFacebook = () => {
// //     app.auth().signInWithPopup(FacebookAuthProvider);
// //     console.log("clicked");
// //   };
// //   const authWithGoogle = () => {
// //     app.auth().signInWithPopup(GoogleAuthProvider);
// //     console.log("cl");
// //   };

// //   return (
// //     <div>
// //       <button value="facebook" onClick={authWithFacebook}>
// //         login with facebook{" "}
// //       </button>
// //       <button value="google" onClick={authWithGoogle}>
// //         login with google{" "}
// //       </button>
// //     </div>
// //   );
// // };

// // export default Authfirebase;

import React, { useState, useEffect } from "react";
import firebase, { auth } from "firebase";
import axios from "axios";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { FirebaseAuth } from "react-firebaseui";

// firebase.initializeApp({
//   // apiKey: "AIzaSyCs-PhYAG1ZEYuF9Hbhinn7Iwh9ZhwrNJ4",
//   apiKey: "AIzaSyCs-PhYAG1ZEYuF9Hbhinn7Iwh9ZhwrNJ4",
//   authDomain: "koompiplay-a02eb.firebaseapp.com",
// });
const Authfirebase = () => {
  const [state, setState] = useState({
    isSingedIn: false,
  });
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setState({ isSingedIn: !!user });
      console.log("user", user);
      console.log(uiConfig.signInOptions);
      console.log(user.providerData[0].providerId);

      if (user.providerData[0].providerId == "google.com") {
        let user_external_id = user.uid;
        let user_name = user.displayName;
        let user_gender = "default";
        let user_email = user.email;
        let user_password = "default";
        let user_profile = user.photoURL;
        let phone_number = user.phoneNumber;
        let login_type = "google";

        // "user_name" : "shing",
        // "user_external_id" : "abc",
        // "user_gender" : "Male",
        // "user_email" : "shing2001@gmail.com",
        // "user_password" : "shing@123",
        // "user_profile" : "shing-profile",
        // "phone_numbe":	"096 6508960",
        // "login_type" : "google"

        fetch("http://52.221.199.235:9000/all_login", {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_name:        user_name,
            user_external_id: user_external_id,
            user_gender:      user_gender,
            user_email:       user_email,
            user_password:    user_password,
            user_profile:     user_profile,
            phone_number:     phone_number,
            login_type:       login_type,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.string);
          });
      } else if (user.providerData[0].providerId == "facebook.com") {
        let user_external_id = user.uid;
        let user_name = user.displayName;
        let user_gender = "default";
        let user_email = user.email;
        let user_profile = user.photoURL;
        let login_type = "facebook";

        fetch("http://52.221.199.235:9000/all_login", {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_external_id: user_external_id,
            user_name: user_name,
            user_gender: user_gender,
            user_email: user_email,
            user_profile: user_profile,
            login_type: login_type,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.string);
          });
      } else {

      }
    });
  }, []);
  return (
    <div>
      {state.isSingedIn ? (
        <span>
          <div>Signed In!</div>
          <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
          <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
          <img
            alt="profile picture"
            src={firebase.auth().currentUser.photoURL}
          />
          <h1>{firebase.auth().currentUser.phoneNumber}</h1>
        </span>
      ) : (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </div>
  );
};

export default Authfirebase;

// import React, { Component } from "react";
// // import "./App.css";
// import firebase from "firebase";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// firebase.initializeApp({
//   apiKey: "AIzaSyDLoqcbTDMFuurtAyDgVEKZ6qwo0j0Osjk",
//   authDomain: "fir-auth-tutorial-ed11f.firebaseapp.com",
// });

// class Authfirebase extends Component {
//   state = { isSignedIn: false };
//   uiConfig = {
//     signInFlow: "popup",
//     signInOptions: [
//       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//       firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//       firebase.auth.GithubAuthProvider.PROVIDER_ID,
//       firebase.auth.EmailAuthProvider.PROVIDER_ID,
//     ],
//     callbacks: {
//       signInSuccess: () => false,
//     },
//   };

//   componentDidMount = () => {
//     firebase.auth().onAuthStateChanged((user) => {
//       this.setState({ isSignedIn: !!user });
//       console.log("user", user);
//     });
//   };

//   render() {
//     return (
//       <div className="App">
//         {this.state.isSignedIn ? (
//           <span>
//             <div>Signed In!</div>
//             <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
//             <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
//             <img
//               alt="profile picture"
//               src={firebase.auth().currentUser.photoURL}
//             />
//           </span>
//         ) : (
//           <StyledFirebaseAuth
//             uiConfig={this.uiConfig}
//             firebaseAuth={firebase.auth()}
//           />
//         )}
//       </div>
//     );
//   }
// }

// export default Authfirebase;
