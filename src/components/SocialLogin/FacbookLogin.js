import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from "react-router-dom";

const FacbookLoginn = () => {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  return (
    <div>
      <div>
        <div>
          {!login && (
            <FacebookLogin
              textButton=""
              cssClass="bg-blue-600 w-8 h-8 rounded-full focus:outline-none"
              appId="1095052497541475"
              autoLoad={true}
              fields="name,email,picture"
              icon="fa-facebook"
              // onClick={this.componentClicked}
              callback={responseFacebook}
            />
            // <FacebookLogin
            //   appId="1095052497541475"
            //   autoLoad={true}
            //   fields="name,email,picture"
            //   scope="public_profile,user_friends"
            //   callback={responseFacebook}
            //   icon="fa-facebook"
            //   cssClass="bg-blue-600 w-8 h-8 rounded-full focus:outline-none"
            // />
          )}
          {login && <img src={picture} />}
        </div>
        {login && (
          <div>
            <Redirect to="/start" />
            {/* <h1>{data.name}</h1>
            <h1>{data.email}</h1> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacbookLoginn;

// // import React, { Component } from "react";
// // import FacebookLogin from "react-facebook-login";
// // import {
// //   BrowserRouter as Router,
// //   Redirect,
// //   Route,
// //   Switch,
// //   Link,
// // } from "react-router-dom";

// // export default class Facebook extends Component {
// //   state = {
// //     isLoggedIn: false,
// //     userID: "",
// //     name: "",
// //     email: "",
// //     picture: "",
// //   };

// //   responseFacebook = (response) => {
// //     console.log(response);

// //     this.setState({
// //       isLoggedIn: true,
// //       userID: response.userID,
// //       name: response.name,
// //       email: response.email,
// //       picture: response.picture.data.url,
// //     });
// //   };

// //   componentClicked = () => console.log("clicked");

// //   render() {
// //     let fbContent;

// //     if (this.state.isLoggedIn) {
// //       fbContent = (
// //         <div
// //           style={{
// //             width: "400px",
// //             margin: "auto",
// //             background: "#f4f4f4",
// //             padding: "20px",
// //           }}
// //         >
// //           <img src={this.state.picture} alt={this.state.name} />
// //           <h2>Welcome {this.state.name}</h2>
// //           Email: {this.state.email}
// //         </div>

// //         // <Redirect to="/profile" />
// //       );
// //     } else {
// //       fbContent = (
// // <FacebookLogin
// //   textButton=""
// //   cssClass="bg-blue-600 w-8 h-8 rounded-full focus:outline-none"
// //   appId="1095052497541475"
// //   autoLoad={true}
// //   fields="name,email,picture"
// //   icon="fa-facebook"
//   onClick={this.componentClicked}
// //   callback={this.responseFacebook}
// // />
// //       );
// //     }

// //     return <div>{fbContent}</div>;
// //   }
// // }
