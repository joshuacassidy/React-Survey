import React, { Component } from 'react';
import './App.css';

var uuid = require('uuid');
var firebase = require('firebase');



  var config = {
    apiKey: "AIzaSyCghorZXDpZeReyobCsnyFbHTJOd5K_GTo",
    authDomain: "test-2bec1.firebaseapp.com",
    databaseURL: "https://test-2bec1.firebaseio.com",
    projectId: "test-2bec1",
    storageBucket: "test-2bec1.appspot.com",
    messagingSenderId: "793223160977"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: uuid.v1(),
      name:'',
      answers: {
        q1:'',
        q2:'',
        q3:'',
        q4:''
      },
      submitted:false
    }
    this.handleQuestionChange=this.handleQuestionChange.bind(this);
  }
  handleNameSubmit(event){
    var name = this.refs.name.value;
    this.setState({name}, () => { console.log(this.state)});
    event.preventDefault();
  }
  handleQuestionSubmit(event){
      console.log("submitted");
      firebase.database().ref('surveys/'+this.state.id).set({
        name: this.state.name,
        answers:this.state.answers
      })
      this.setState({submitted:true},() => {console.log("submited")})
      event.preventDefault();
  }
  handleQuestionChange(event){
    var answers = this.state.answers;
    switch(event.target.name){
      case "q1":
        answers.q1 = event.target.value;
      break;
      case "q2":
        answers.q2 = event.target.value;
   

      break;

      case "q3":
        answers.q3 = event.target.value;

      break;

      case "q4":
        answers.q4 = event.target.value;

      break;
      default:
      break;

    }
    this.setState({answers},()=> {console.log(this.state)});
  }
  render() {
    var user;
    var questions;
    if(this.state.name && this.state.submitted === false){
      user = <h2 className=".Header-text">Hi {this.state.name}</h2>
      questions = <span>
        <form onSubmit={this.handleQuestionSubmit.bind(this)}>
          <div>
            <label className="Lable-text">Whats your os do you use?</label>
            
            <p className="Questions"> <input type="radio" name="q1" value="Windows" onChange={this.handleQuestionChange}/>
            Windows </p> 
            
             <p className="Questions"> <input type="radio" name="q1" value="OSX" onChange={this.handleQuestionChange} />
            OSX </p>  
            
             <p className="Questions"><input type="radio" name="q1" value="Linux" onChange={this.handleQuestionChange} />
            Linux </p> 
            
             <p className="Questions"><input type="radio" name="q1" value="Other" onChange={this.handleQuestionChange} />
            Other</p> 
            

            <label className="Lable-text">How long have you been programming?</label>
            
            <p className="Questions"><input type="radio" name="q2" value="Less than 1 year" onChange={this.handleQuestionChange}/>
              Less than 1 year  </p>
            
            <p className="Questions"> <input type="radio" name="q2" value="2 - 3 years" onChange={this.handleQuestionChange} />
            2 - 3 years</p> 
            
            <p className="Questions"> <input type="radio" name="q2" value="3 - 7 years" onChange={this.handleQuestionChange} />
            3 - 7 years </p>
            
            <p className="Questions"> <input type="radio" name="q2" value="More than 7 years" onChange={this.handleQuestionChange} />
            More than 7 years</p> 
            

            <label className="Lable-text">How long do you program a day?</label>
            
            <p className="Questions"><input type="radio" name="q3" value="Less than 1 hour" onChange={this.handleQuestionChange}/>
            Less than 1 hour</p>
            
            <p className="Questions"> <input type="radio" name="q3" value="1 - 2 hours" onChange={this.handleQuestionChange} />
            1 - 2 hours</p>
            
            <p className="Questions"> <input type="radio" name="q3" value="3 - 4 hours" onChange={this.handleQuestionChange} />
            3 - 4 hours</p> 
            <p className="Questions"> <input type="radio" name="q3" value="Over 4 hours" onChange={this.handleQuestionChange} />
            Over 4 hours</p> 
            

            <label className="Lable-text">Whats your favorite programming language?</label>
            
            <p className="Questions"><input type="radio" name="q4" value="Java" onChange={this.handleQuestionChange}/>
            Java</p> 
            
             <p className="Questions"><input type="radio" name="q4" value="JS" onChange={this.handleQuestionChange} />
            JS</p> 
            
             <p className="Questions"><input type="radio" name="q4" value="Python" onChange={this.handleQuestionChange} />
            Python</p> 
            
             <p className="Questions"><input type="radio" name="q4" value="Other" onChange={this.handleQuestionChange} />
            Other</p> 
            


          </div>
          <div className="Submit-button">
        <input type="submit" className="btn btn-primary " value="Submit" />
</div>
        </form>


      </span>
    }
    else if(!this.state.name &&this.state.submitted === false){
      user = <span>
      <h2 className="Header-text" >Enter name to begin</h2>
      <form onSubmit={this.handleNameSubmit.bind(this)}>
        <input type="text" placeholder="Enter Name..." ref="name" />
      </form>
      </span>;
      questions = '';
    }
    else{
      user = <h2>Thank You {this.state.name}</h2>

    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Programmer Survey</h2>
        </div>
        <div className="text-center">
          {user}
      </div>
      <div className="container ">
        {questions}

      </div>

      </div>
    );
  }
}

export default App;
