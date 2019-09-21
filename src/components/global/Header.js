//dependencies
import React,{Component} from 'react';
import propTypes from 'prop-types';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import swal from 'sweetalert';

//assets
import './css/Header.css';

class Header extends  Component{

  static propTypes={

    title: propTypes.string.isRequired

  };

  constructor(){
    super();
    this.state={
      user:null,
      uploadValue:0,
      picture: null,
      pictures:[],
      text:"",
      date: null
    };

this.handleAuth = this.handleAuth.bind(this);
this.handleLogout = this.handleLogout.bind(this);
this.renderLoginButton = this.renderLoginButton.bind(this);

this.handleUpload = this.handleUpload.bind(this);

this.handlePost = this.handlePost.bind(this);
this.handleInputChanged = this.handleInputChanged.bind(this);

this.obtenerDiaSemana = this.obtenerDiaSemana.bind(this);
this.obtenerMes = this.obtenerMes.bind(this);
this.obtenerFecha = this.obtenerFecha.bind(this);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      this.setState({
        user:user
      });
    });

    

  }


  /*//////////////////funciones para obtner la fecha////////////////// */

  /*////////////obtener dia de la semana////////////// */
   obtenerDiaSemana(diaSemana){

    let dias = ['Domingo','Lunes', 'Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];

    return dias[diaSemana];

  }

  /*//////////////obtner mes del año///////////////// */
  obtenerMes(mes){
    let meses = ['Enero','Febrero', 'Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

    return meses[mes];
  }

  /*/////////////////construir fecha completa///////////////// */
  obtenerFecha(_diaSemana, _diaMes , _mes, _anio, _hora, _minutos){
      
    let diaSemana = this.obtenerDiaSemana(_diaSemana);
    let diaMes = _diaMes;
    let mes = this.obtenerMes(_mes);
    let anio = _anio;
    let hora = _hora;
    let minutos =_minutos;


    if(hora<10){
      hora = `0${hora}`
    }
    if(minutos<10){
      minutos = `0${minutos}`;
    }
    


    return `${diaSemana} ${diaMes} de ${mes} del ${anio}, ${hora}:${minutos}`
  }

/*///////////////////////////////////////////////////////////////// */

  handlePost(){

    if(this.state.text==="" && this.state.picture===null  ||  this.state.text===" " && this.state.picture===null ){
      
    }else if(this.state.picture!==null && this.state.text==="" || this.state.text===" " && this.state.picture!==null 
             || this.state.text!=="" && this.state.picture===null || this.state.text!==" " && this.state.picture===null
             || this.state.text!=="" && this.state.picture!==null || this.state.text!==" " && this.state.picture!==null)
             {

      
      let fecha = new Date();
      let dat = this.obtenerFecha(fecha.getDay(),fecha.getDate(),fecha.getMonth(),
      fecha.getFullYear(),fecha.getHours(),fecha.getMinutes());
      
    const record = {
      photo: this.state.user.photoURL,
      name: this.state.user.displayName,
      image: this.state.picture,
      text: this.state.text,
      date: dat
    };

    const dbRef = firebase.database().ref('publicaciones');
    const newPost = dbRef.push();
    newPost.set(record);

    

    this.setState({
    
      uploadValue:0,
      picture: null,
      pictures:[],
      text:"",
      date: null

    });

  }
  }

  handleInputChanged(e){
   if(e.target.id==='casillaPost'){
     this.setState({
       text: e.target.value
     });
   }
  }

handleUpload(e){
  const file = e.target.files[0];
  const storageRef = firebase.storage().ref(`/imagesPost/`);
  //const task = storageRef.put(file);

  
  var task = storageRef.child(`${file.name}`).put(file);

task.on('state_changed',(snapshot)=>{
let percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
this.setState({
  uploadValue:percentage
});



},(error)=>{
  swal({
  
    text: `ha ocurrido un error al subir el archivo ${error}`,
    icon: "error",
  });
  console.log('ha ocurrido un error al subir el archivo',error);
},()=>{
  
  
  storageRef.child(file.name).getDownloadURL().then((url) => {
    this.setState({
        picture: url
    })

  if(this.state.picture){
    swal({
      text:"archivo subido con exito",
      icon:"success"
    });
  }
})

});

}


 handleAuth(){  

  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
  .then((result)=>{

    swal({
      text:`${result.user.email} ha iniciado sesión`,
      icon:"success"
    });

    console.log(`${result.user.email} ha iniciado sesión`);

})
  .catch((error)=>{
    swal({
      text: `Ha ocurrido un error al iniciar sesión ${error}`,
      icon:"error"
    });
    console.log(`Ha ocurrido un error al iniciar sesión ${error}`);
  });
 }

 handleLogout(){
   firebase.auth().signOut()
   .then(()=>{
    swal({
      text: `${this.state.user.email} ha cerrado sesión`,
      icon: "success"
      
    });
     console.log(`${this.state.user.email} ha cerrado sesión`);
    
    })
  .catch((error)=>{
    swal({
      text: `Ha ocurrido un error al cerrar sesión ${error}`,
      icon: "error",
      
    });
    console.log(`Ha ocurrido un error al cerrar sesión ${error}`);});
   
 }

 

 renderLoginButton(){

  if(this.state.user){

    return(
  <div>
      <header className="Header">
        <h2>{this.props.title}</h2>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          <span onClick={this.handleLogout} className="btns login">Log out</span>&nbsp; 
          <span>{this.state.user.displayName}</span> &nbsp; 
         <span><img width="30" style={{ borderRadius:'50px'}}src={this.state.user.photoURL} alt={this.state.user.displayName}/></span>
    
        </div>
      
      </header>


      <div className="post-flex-container">

      
      
        <div className="box-post">
          <form>
             <input type="text" id="casillaPost" className="casilla-post" max="20" placeholder="Que pasa por tu mente?" 
             value={this.state.text} onChange={this.handleInputChanged}/>
             <progress className="progressBar" value={this.state.uploadValue} max="100"></progress>

             <div className="post-btn-box">
             <img width="60" height="40" src={this.state.picture} alt=""/>
        
                 <label for="file-upload" className="subir">Subir foto</label>
                 <input id="file-upload"  type="file" onChange={this.handleUpload} accept=".jpg ,.png , .jpeg"/>
                 <input type="button" className="btnPost" onClick={this.handlePost} value="Publicar"/>
        
             </div>
          </form>
        </div>

      </div>

      
      
  </div>
    );

     
  }else{

   
    
    return(
    
    <header className="Header">
    
    <h2>{this.props.title}</h2>
    <div>
      
    <Link to="/"><span className="btns home">Home</span></Link>
    <span onClick={this.handleAuth} className="btns login">Login with google</span>
    
     
    
    </div>
  </header>
  
  
  );

    }
  


 }

    render(){
      return(
          <div className="">
            {this.renderLoginButton()}
            
          </div>
      );

    }

}

export default Header;