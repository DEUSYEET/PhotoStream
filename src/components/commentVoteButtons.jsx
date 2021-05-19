import React, { Component } from "react";
import axios from "axios";

class CommentVoteButtons extends Component {
  url = "";
  state = {
    comment: this.props.comment,
    scoreUp: 0,
    scoreDown: 0,
  };
  componentDidMount() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      this.url = "http://localhost:8080/voteComment";
    } else {
      this.url =
        "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/voteComment";
    }
    // console.log(this.url);
    this.updateScores(this.state.comment);
  }

  onVote(e) {
    let formData = new FormData();
    let vote = {
      commentID: this.state.comment.commentID,
      voteType: e.target.classList[0],
      user: this.props.user,
    };
    // console.log(vote);
    formData.append("file", JSON.stringify(vote));
    axios.post(this.url, formData).then((res) => {
      // console.log(res.data);
      this.setState({
        comment: res.data,
        scoreUp: res.data.scoreUp,
        scoreDown: res.data.scoreDown,
      });
      this.updateScores(res.data);
      //   this.forceUpdate();
    });
  }

  updateScores(comment) {
    this.setState({
      scoreUp: comment.scoreUp,
      scoreDown: comment.scoreDown,
    });
    // console.log(this.state.comment.upUsers,this.state.comment.downUsers)
  }

  render() {
    return (
      <div className="guideVoteButtons">
        <div
          className={
            this.state.comment.upUsers.includes(this.props.user)
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
            this.state.comment.downUsers.includes(this.props.user)
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
            {this.state.scoreDown || 0}
          </span>
        </div>
      </div>
    );
  }
}
export default CommentVoteButtons;
