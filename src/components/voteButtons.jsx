import React, { Component } from "react";
import axios from "axios";

class VoteButtons extends Component {
  url = "";
  state = {
    guide: this.props.guide,
    scoreUp: 0,
    scoreDown: 0,
  };
  componentDidMount() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      this.url = "http://localhost:8080/voteGuide";
    } else {
      this.url =
        "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/voteGuide";
    }
    // console.log(this.url);
    this.updateScores(this.state.guide);
  }

  onVote(e) {
    let formData = new FormData();
    let vote = {
      guideID: this.state.guide.guideID,
      voteType: e.target.classList[0],
      user: this.props.user,
    };
    // console.log(vote);
    formData.append("file", JSON.stringify(vote));
    axios.post(this.url, formData).then((res) => {
      //   console.log(res);
      this.setState({
        guide: res.data,
      });
      this.updateScores(res.data);
      //   this.forceUpdate();
    });
  }

  updateScores(guide) {
    this.setState({
      scoreUp: guide.scoreUp,
      scoreDown: guide.scoreDown,
    });
    // console.log(guide.scoreUp,guide.scoreDown,this.state)
  }

  render() {
    return (
      <div className="guideVoteButtons">
        <div
          className={
            this.state.guide.upUsers.includes(this.props.user)
              ? "guideUpvote voted"
              : "guideUpvote"
          }
        >
          <span
            role="img"
            aria-label="up"
            className="up"
            onClick={(e) => this.onVote(e)}
          >
            👍
            {this.state.scoreUp || 0}
          </span>
        </div>
        <div
          className={
            this.state.guide.downUsers.includes(this.props.user)
              ? "guideDownvote voted"
              : "guideDownvote"
          }
        >
          <span
            role="img"
            aria-label="down"
            className="down"
            onClick={(e) => this.onVote(e)}
          >
            👎
            {this.state.guide.scoreDown || 0}
          </span>
        </div>
      </div>
    );
  }
}
export default VoteButtons;
