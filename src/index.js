//dependencies
import React from 'react';
import ReactDOM from 'react-dom'; 
import {BrowserRouter as Router} from 'react-router-dom';
import firebase from 'firebase';

//routes
import AppRoutes from './routes';


import './index.css';
//import App from './components/App';
import * as serviceWorker from './serviceWorker';



firebase.initializeApp({
    apiKey: "AIzaSyD8miuh2I1r7c1VTdXUyBkSkiE2NNhsYTo",
    authDomain: "tecnoblog-89a95.firebaseapp.com",
    databaseURL: "https://tecnoblog-89a95.firebaseio.com",
    projectId: "tecnoblog-89a95",
    storageBucket: "tecnoblog-89a95.appspot.com",
    messagingSenderId: "702655883964"
});

ReactDOM.render(<Router>
    <AppRoutes/>
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
