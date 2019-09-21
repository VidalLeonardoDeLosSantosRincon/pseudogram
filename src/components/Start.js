//dependencies
import React,{Component} from 'react';
import {Link} from 'react-router-dom';

//components
import Footer from './global/Footer';

//assets
import './global/css/Start.css';
import logo from '../img/logo.jpg';
import imgPost from '../img/demo-post-img.jpg';
import heartIcon from '../img/heart.png';



class Start extends Component{


render(){

    const title = "Thinkers";

    return(
     <div className="back">


     <header className="Header">
            <h2>{title}</h2>
          </header>
            

        <div className="flex-container">

            <div className="cont1">
               <div className="demo">
                
                  <div className="demo-user-img">
                  
                  </div>
                  
                  <div className="demo-info">
                    <h3>James Davidson</h3>
                    <h5>Jun 18 , 2018  Houston/Texas</h5>
                  </div>

                  <div className="demo-text">
                    <p>Traveling in the desert :D!</p>
                  </div>
                 
                 <img src={imgPost} className="demo-post-img" alt="" />

                 <img src={heartIcon} className="heart-icon" alt="" />

                   
               </div>
  
            </div>

            <div className="cont2">
               <img src={logo} className="App-logo" alt="logo" />
               <h1>Thinkers</h1>
               <Link to="/home"><input type="button" onClick="window.location.reload()"className="btn" value="Let's start"/></Link>
            </div>
        </div>  
        <Footer/>
</div>
    );

}

}

export default Start;