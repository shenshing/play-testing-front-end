import React from "react";
import { Helmet } from "react-helmet";
import { RiMedalLine } from "react-icons/ri";
import { Link } from "react-router-dom";
// import axios from "axios";
import swal from "sweetalert";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import ParticlesBg from "particles-bg";

const TITLE = "Result | Quiz app";

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hintsUsed: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { state } = this.props.location;
    if (state) {
      this.setState({
        score: (state.score / state.numberOfQuestions) * 100,
        numberOfQuestions: state.numberOfQuestions,
        numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
        correctAnswers: state.correctAnswers,
        wrongAnswers: state.wrongAnswers,
        hintsUsed: state.hintsUsed,
      });
    }
  }

  handleChange = (e) => {
    console.log("hello");
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello world");
    var accessTokenObj = localStorage.getItem("token");
    // console.log(accessTokenObj);
    const newResult = {
      score: this.state.score,
    };
    console.log(newResult);
    fetch("http://52.221.199.235:9000/play_info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: accessTokenObj,
      },
      body: JSON.stringify({
        score: this.state.correctAnswers,
      }),
    });
    // axios({
    //   method: "post",
    //   url: "http://52.221.199.235:9000/play_info",
    //   data: JSON.stringify({
    //     score: newResult,
    //   }),
    // }).then((res) => res.json());
  };
  render() {
    const submitAlert = () => {
      swal({
        title: "Thank you so much!",
        icon: "success",
        button: "Ok",
        timer: 3000,
      });
    };

    const { state } = this.props.location;
    let stats, remark;
    const userScore = this.state.score;

    if (userScore <= 30) {
      remark = "You need more practice !";
    } else if (userScore > 30 && userScore <= 50) {
      remark = "Better luck for the next time !";
    } else if (userScore > 50 && userScore <= 70) {
      remark = "Wow it's better !";
    } else if (userScore >= 71 && userScore <= 84) {
      remark = "You did it greate!";
    } else {
      remark = "You're an absolute genuis!";
    }

    if (state !== undefined) {
      stats = (
        <React.Fragment>
          <div className="m-auto flex justify-center p-0 mt-6">
            <span className="icon text-indigo-800 text-6xl">
              <RiMedalLine />
            </span>
          </div>
          <h2
            id="result-header"
            className=" text-indigo-800 text-4xl text-center"
          >
            Quiz has ended
          </h2>
          <form
            id="form-background"
            onSubmit={this.handleSubmit}
            className="container shadow-xl rounded px-8 pt-4 pb-8 mx-auto mt-1 h-full"
          >
            <div className="container text-center ">
              <h3 className=" container text-3xl text-gray-100 font-bold">
                {remark}
              </h3>
              <Progress
                type="circle"
                percent={this.state.score.toFixed(0)}
                strokeWidth={8}
                theme={{
                  error: {
                    symbol: this.state.score.toFixed(0) + "%",
                    trailColor: "pink",
                    color: "red",
                  },
                  active: {
                    symbol: this.state.score.toFixed(0) + "%",
                    trailColor: "	#E0FFFF",
                    color: "#0F1EF0",
                  },
                }}
              />
            </div>
            <div className="container p-4 text-black text-xl font-bold">
              <span onChange={this.handleChange}>
                Total of the number questions: {this.state.numberOfQuestions}
              </span>

              <Progress width={70} percent={100} status="active" />

              <br />
              <br />
              <span onChange={this.handleChange}>
                Number of attempted questions:{" "}
                {this.state.numberOfAnsweredQuestions}
              </span>
              <Progress percent={100} status="active" />
              <br />
              <br />
              <span onChange={this.handleChange}>
                Number of correctAnswers: {this.state.correctAnswers}
              </span>
              <Progress
                percent={this.state.correctAnswers * 6}
                status="active"
              />
              <br />
              <br />
              <span onChange={this.handleChange}>
                Number of incorrectAnswers: {this.state.wrongAnswers}
              </span>
              <Progress
                percent={10 + this.state.wrongAnswers * 6}
                status="active"
              />
              <br />
              <br />
              <span onChange={this.handleChange}>
                Hints used: {this.state.hintsUsed}
              </span>
              <Progress percent={this.state.hintsUsed * 50} status="success" />
            </div>
            {/* <Link to="/userinfo">
              <input
                // onClick={submitAlert}
                type="submit"
                value="submit"
                className="w-32 mr-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded cursor-pointer"
              />
            </Link> */}

            <input
              onClick={submitAlert}
              className="w-32 mr-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded cursor-pointer"
              type="submit"
              value="Win"
            />
            <Link to="/">
              <input
                onClick={submitAlert}
                className="w-32 mr-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded cursor-pointer"
                type="submit"
                value="Home"
              />
            </Link>
          </form>
        </React.Fragment>
      );
    } else {
      stats = (
        <form className="container text-center text-6xl shadow-xl rounded px-8 pt-4 pb-8 mx-auto my-auto h-full">
          <h1>No stats available please take a quiz!</h1>
        </form>
      );
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <ParticlesBg type="color" bg={true} />
        {stats}
      </React.Fragment>
    );
  }
}

export default Result;
