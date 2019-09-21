import React ,{Component} from 'react';
import firebase from 'firebase';

//assets
import './global/css/Home.css';


//components
import Header from './global/Header';

class Home extends Component{

  constructor(){
    super();
    this.state={
      pictures:[]

    }
  }

  componentWillMount(){
    firebase.database().ref('publicaciones').on('child_added',(snapshot)=>{

      this.setState({

        pictures: this.state.pictures.concat(snapshot.val())

      });

    });

  }

render(){

return(
    <div>
    
    <Header title="Thinkers" onUpload/>
       <div className="content">
       <div className="flex-container-home">

       {

       this.state.pictures.map((pictur,key)=>{
          
       
 
        if(pictur.image){

         
          
        return <div key={key} className="post-container">
        <div className="demo">
            
            
            <div id="photo" style={ { backgroundImage: `url(${pictur.photo})` } } className="demo-user-img">
            
            </div>
            
            <div className="demo-info">
              <h3>{pictur.name}</h3>
              <h5>{pictur.date}</h5>
            </div>

            <div className="demo-text">
              <p>{pictur.text}</p>
            </div>
        
           <div id="img" className="demo-post-img" >
             <img src={pictur.image} alt=""/>
           </div>
                            
         </div>
   </div>

       }else{

 
        return <div key={key} className="post-container">
        <div className="demo">
            

            
            <div id="photo" style={ { backgroundImage: `url(${pictur.photo})` } }className="demo-user-img">
            
            </div>
            
            <div className="demo-info">
              <h3>{pictur.name}</h3>
              <h5>{pictur.date}</h5>
            </div>

            <div className="demo-text">
              <p>{pictur.text}</p>
            </div>
        
                            
         </div>
   </div>
       }
      }).reverse()


       }

       
  

       </div>

       
    </div>
    
</div>);

}



}

export default Home;