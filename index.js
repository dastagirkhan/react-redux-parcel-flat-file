import React from "react";
import ReactDom from "react-dom";
import { createStore, bindActionCreators} from "redux";
import { Provider, connect } from "react-redux";
import PropTypes from "prop-types";
import { AppContainer } from 'react-hot-loader'

// Constants
const CHANGE_NAME = 'CHANGE_NAME';

// Action Creators
const changeName = (name) => {
	return {
			type:CHANGE_NAME,
			name
	};
}

// Reducer
const reduceName = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_NAME:
      return Object.assign({}, state, { name: action.name });
    default:
      return state;
  }
};

// Redux store
const initialState = { name: "MDK" }
const store = (() => {
   if (module.hot && (process.env.NODE_ENV === 'development') && window.store) {    
      return window.store;
   }
   
   const store = createStore(reduceName, initialState);
   if (module.hot && process.env.NODE_ENV === 'development') { 
      window.store = store;
   }
   return store;
})()


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
        <input type="text" placeholder="type something" onChange={this.handleChange} />
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

// mapStateToProps() is a utility which helps your component get updated state(which is updated by some other components),
const mapStateToProps = state => {
	return {
		name: state.name
	}
}
// mapDispatchToProps() is a utility which will help your component to fire an action event (dispatching action which may cause change of application state)
const mapDispatchToProps = dispatch => {
	return bindActionCreators({changeName},dispatch);
}
// Connecting React component with Redux returns a instance of that component
const GreetingConnection = connect(mapStateToProps,mapDispatchToProps)(Greeting);

// Rendering,
function renderApp(){  
  ReactDom.render(    
    <AppContainer>
      <Provider store={store}>       
            <GreetingConnection />      
      </Provider>
      </AppContainer>,
    document.getElementById("mount")
  );
}
renderApp();
   
// Hot Module Replacement
if (module.hot) {
    module.hot.accept(renderApp);  
}
  