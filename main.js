import React from "react";
import ReactDom from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import PropTypes from "prop-types";

// Reducer
const name = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE":
      return Object.assign({}, { name: action.name });
    default:
      return state;
  }
};

// Redux store
const store = createStore(name, { name: "MDK" });

// React Component
class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.changeName(e.target.value);
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange} />
        <br />
        Hello, {this.props.name}
      </div>
    );
  }
}

// React prop validation
Greeting.propTypes = {
  name: PropTypes.string.isRequired
};

// Connecting React component with Redux returns a instance of that component
const GreetingConnection = connect(
  state => {
    return {
      name: state.name
    };
  },
  dispatch => {
    return {
      changeName: name => {
        dispatch({ type: "CHANGE", name });
      }
    };
  }
)(Greeting);

// Rendering,
ReactDom.render(
  <Provider store={store}>
    <GreetingConnection />
  </Provider>,
  document.getElementById("mount")
);

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
