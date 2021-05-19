import React, { Component } from "react";
import CommentBox from "../components/CommentBox";
import CommentVoteButtons from "./commentVoteButtons";
import ProfilePic from "./ProfilePic";

class Comment extends Component {
  comment = this.props.comment;
  render() {
    return (
      <div className="comment">
      <div className="commentHead">
      <ProfilePic username={this.comment.author} />
      </div>
        <div className="commentBody">{this.comment.body}</div>
        {this.comment.author === "[Deleted]" ? (
          ""
        ) : (
          <div className="commentInteractions">
          {this.props.user?(

            <CommentVoteButtons
              comment={this.comment}
              user={this.props.username}
            />
          ): ( <div className="guideVoteButtons">
              <div>
                <span role="img" aria-label="up" className="up">
                  👍
                  {this.props.comment.scoreUp || 0}
                </span>
              </div>
              <div>
                <span role="img" aria-label="down" className="down">
                  👎
                  {this.props.comment.scoreDown || 0}
                </span>
              </div>
            </div>)}
          </div>
        )}
        <CommentBox
          parentID={this.comment.commentID}
          user={this.props.user}
          username={this.props.username}
          hide={true}
          reply={true}
          deleted = {this.comment.author === "[Deleted]"}
          prompt="Leave a reply"
        />
      </div>
    );
  }
}
export default Comment;
