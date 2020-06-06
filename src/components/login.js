import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import jwt from "jsonwebtoken";
import three_dots from "../assets/bars.svg";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import Message from "../components/Message/Message";
import Facebook from "../components/SocialLogin/FacbookLogin";
import SuccessMessage from "../components/Message/SuccessMessage";
import { PostData } from "../components/Services/PostData";

firebase.initializeApp({
  apiKey: "AIzaSyCs-PhYAG1ZEYuF9Hbhinn7Iwh9ZhwrNJ4",
  authDomain: "koompiplay-a02eb.firebaseapp.com",
});

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [face, setFace] = useState({
    redirectToReferrer: false,
  });
  const [state, setState] = useState({
    isSingedIn: false,
  });
  const uiConfig = {
    signInFlow: "popup",
    autoUpgradeAnonymousUsers: true,
    signInSuccessUrl: "/",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
      signInSuccess: function (authResult, redirectUrl) {
        return true;
      },
      signInFailure: function (error) {
        if (error.code != "firebaseui/anonymous-upgrade-merge-conflict") {
          return Promise.resolve();
        }
      },
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
            console.log("google:" + data);
            localStorage.setItem("token", data.string);
          });
      } else if (user.providerData[0].providerId == "facebook.com") {

        let user_external_id =    user.uid;
        let user_name =           user.displayName;
        let user_gender =         "default";
        let user_email =          user.email;
        let user_password =       "default";
        let user_profile =        user.photoURL;
        let phone_number =        user.phoneNumber;
        let login_type =          "facebook";

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
          localStorage.setItem("token", data.string);
        });
      }
    });
  }, []);
  const onSubmit = (data) => {
    // fetch(" http://localhost:8000/all_login", {
      fetch("http://52.221.199.235:9000/all_login", { 
      method: "POST",
      body: JSON.stringify({
        user_name:      "defualt",
        user_email:     data.Email,
        user_password:  data.Password,
        phone_number:   "defualt",
        user_profile:   "defualt",
        user_gender:    "defualt",
        login_type:     "local",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
        localStorage.setItem("token", data.string);
        console.log("data", data.string);

        const decodeToken = jwt.decode(data.string);
        console.log(decodeToken);
        if (decodeToken) {
          setSucessMessage("Successfull");
          setTimeout(() => {
            setSucessMessage();
          }, 3000);
          window.location.replace("/");
        } else {
          setMessage("login failed");
          setTimeout(() => {
            setMessage();
          }, 3000);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  const signup = (res, type) => {
    let postData;
    if (type === "facebook" && res.email) {
      postData = {
        name: res.name,
        provider: type,
        email: res.email,
        provider_id: res.id,
        token: res.accessToken,
        provider_pic: res.picture.data.url,
      };
    }
    if (type === "google" && res.w3) {
      postData = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa,
      };
    }

    if (postData) {
      PostData("singup", postData).then((result) => {
        let responeJson = result;
        sessionStorage.setItem("userData", JSON.stringify(responeJson));
        setFace({ redirectToReferrer: true });
        // }
      });
    }
  };

  //Signup with google
  const responseGoogle = (response) => {
    console.log(response);
    signup(response, "google");
  };

  //Signup with Facebook
  const responseFacebook = (response) => {
    console.log(response);
    console.log("facebook console");
    signup(response, "facebook");
  };
  const componentClicked = () => {
    console.log("clicked");
  };
  if (face.redirectToReferrer || sessionStorage.getItem("userData")) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <React.Fragment>
      {message ? <Message msg={message} /> : null}
      {successMessage ? <SuccessMessage msg={successMessage} /> : null}
      <div className="flex  items-center justify-center h-screen ">
        {/* <ParticlesBg type="ball" bg={true} /> */}
        <div className="w-full max-w-md">
          <form
            className="blur bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-gray-900 font-medium flex text-3xl  items-center justify-center mb-10">
              Login
            </h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={register({ required: true, minLength: 1 })}
                name="Email"
                type="email"
              />
              {errors.Username && (
                <p className="text-red-500 text-xs italic">
                  First Name required
                </p>
              )}
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold  mb-2">
                Password
              </label>
              <input
                className=" appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={register({ required: true, minLength: 8 })}
                name="Password"
                type="password"
              />
              {errors.Password && (
                <p className="text-red-500 text-xs italic">Password required</p>
              )}
            </div>
            {}
            <span
              className="mb-4 cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </span>
            <button
              type="submit"
              className="focus:outline-none mb-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? (
                <img
                  className="justify-center mx-auto w-6 h-6"
                  src={three_dots}
                  alt="loading image"
                />
              ) : (
                "Sign In"
              )}
            </button>

            {}

            <p className="text-center text-gray-600 mb-4">
              Don't hava an account yet?
            </p>
            {}
            <Link to="/register">
              <button
                type="submit"
                className="focus:outline-none mb-6 w-full border text-blue-700 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create account
              </button>
            </Link>
            {}
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />

            <p className="text-center text-gray-600 ">Terms and conditions</p>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
