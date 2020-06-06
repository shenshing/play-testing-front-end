import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import ParticlesBg from "particles-bg"

const TITLE = "Koompi play | Quiz";


const Start = () => (
  <React.Fragment>
    <Helmet>
      <title>{TITLE}</title>
    </Helmet>
    <Navbar />
    <div id="home">
    <ParticlesBg type="random" bg={true}/>
      <section style={{ marginTop: "90px" }} id="section">
        <h1 className="app text-center text-current">Quiz App</h1>
        <ul>
          <li id="button">
            <Link to="/quiz">
              <button  id="play-button" className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 bg-teal-400 hover:bg-blue-500 w-full text-white font-bold py-2 px-4 mt-48 h-12 rounded-full">
                Play{" "}
              </button>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  </React.Fragment>
);

export default Start;
