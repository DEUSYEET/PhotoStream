import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guides: [],
    };
  }
  url = "";

  componentDidMount() {
    document.title = "Guía"

    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      this.url = "http://localhost:8080/getAll";
    } else {
      this.url =
        "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/getAll";
    }
    // console.log(this.url)
    this.getAll();
  }

  getAll() {
    // console.log(url)
    fetch(this.url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          guides: data,
        });
        // console.log(this.state.guides);
      });
  }


  render() {
    return (
      <div id="homePage">

        <div id="homeGuideContainer">
          {/* {this.state.guides
            .sort((a, b) => {
              let aScore = a.scoreUp - a.scoreDown;
              let bScore = b.scoreUp - b.scoreDown;
              return bScore - aScore;
            })
            .filter((guide) => {
              return guide.title
                .toLowerCase()
                .includes(this.props.searchValue.toLowerCase().trim());
            })
            .map((guide) => (
              <Link to={"/guide?guideID=" + guide.guideID} key={guide.guideID}>
                <GuidePreview guide={guide} />
              </Link>
            ))} */}
        </div>
      </div>
    );
  }
}
export default Home;
