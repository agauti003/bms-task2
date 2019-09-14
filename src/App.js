import React, { Component } from "react";
import "./App.css";
const trailers = require("./trailer.json");

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trailers,
      clickedImageIndex: -1,
      clickedImageYoutubeLink: ""
    };
    this.handleImageClick = this.handleImageClick.bind(this);
  }
  handleImageClick(event, clickedImageIndex, youtubeLink) {
    const clickedImageYoutubeLink = youtubeLink.replace("watch","embed");
    this.setState({ clickedImageIndex, clickedImageYoutubeLink });
  }
  render() {
    console.log(this.state.trailers);
    const shows = Object.values(this.state.trailers[1]).map((elem, index) => {
      if (this.state.clickedImageIndex === index) {
        return (
          <div key={index} className={"youtube-cards"}>
            <div className={"youtube-contents"}>
              <iframe
                className={"youtube-container"}
                src={`${this.state.clickedImageYoutubeLink}`}
                frameBorder="0" 
                allowFullScreen>
              ></iframe>
            </div>
          </div>
        );
      } else {
        return (
          <div key={index} className={"cards"}>
            <div className={"contents"}>
              <img
                src={`https://in.bmscdn.com/events/moviecard/${elem.EventImageCode}.jpg`}
                className={"poster-thumbnail"}
                onClick={e => this.handleImageClick(e, index, elem.TrailerURL)}
              />
              <div
                className={"name details-container"}
              >{`Name: ${elem.EventName}`}</div>
              <div
                className={"Genre details-container"}
              >{`Genre: ${elem.EventGenre}`}</div>
              <div
                className={"Showdate details-container"}
              >{`Showdate: ${elem.ShowDate}`}</div>
              <div
                className={"avgRating details-container"}
              >{`Avg Rating: ${elem.avgRating}`}</div>
            </div>
          </div>
        );
      }
    });
    return (
      <div>
        <header>
          <div className="header-container">
            <h3>Welcome to Bookmyshow</h3>
          </div>
        </header>
        <div className={"container"}>{shows}</div>
      </div>
    );
  }
}
