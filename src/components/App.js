//dependencies
import React, { Component } from 'react';
import propTypes from 'prop-types';


//assets  

import './global/css/App.css';

//components
import Content from './Content';

class App extends Component {

  static propTypes = {
   children: propTypes.object.isRequired
  };


  render() {
    const {children} = this.props;
    return (
      <div id="App" className="App">

      
        
         <Content body={children}/>
        
      </div>
    );
  }
}

export default App;
