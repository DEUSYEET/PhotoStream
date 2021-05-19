import React, { Component } from "react";


class Button extends Component {
  state = {
    test:true
  }
  render (){
    return(
        <p> {this.props.test} </p>
  )
}
}

export default Button;