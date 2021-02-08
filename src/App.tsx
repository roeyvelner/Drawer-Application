// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Room from './Components/Room/Room';
import {StartPage} from './Components/StartPage/StartPage'
import { useState } from 'react';

document.getElementById("root")?.classList.add("d-flex");
document.getElementById("root")?.classList.add("h-100");
document.getElementById("root")?.classList.add("w-100");
document.getElementById("root")?.classList.add("align-items-center");
document.getElementById("root")?.classList.add("justify-content-center");



function App() {
  async function leaveTeam(){
    try{

      const response  = await fetch('http://drawserver-env.eba-kdm2hg7h.us-east-2.elasticbeanstalk.com/users/'+startState.team, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
          body:  JSON.stringify({name: startState.name})
      })
      const users = await response.json();
      console.log("This is the Users = " + users);
      SetusersList(users);
    }
    catch(err){
        console.log(err);
    }
    SetstartState({name:'',team:'Team1'});
  }
  const [startState,SetstartState] =  useState({name:'',team:'Team1'});
  const [usersList,SetusersList] =  useState([]);

  window.addEventListener("beforeunload", async (ev) => 
  {  
    const response  = await fetch('http://drawserver-env.eba-kdm2hg7h.us-east-2.elasticbeanstalk.com/users/'+startState.team, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body:  JSON.stringify({name: startState.name})
    })
  });

  return (
    <div className="App container h-75">
      {
        ((startState.name == '')?true:false)  &&
        <StartPage startState={startState} SetstartState={SetstartState} SetusersList={SetusersList}/>
      }

      {

      ((startState.name != '')?true:false)  &&
      <div className=" h-100">
        <Room roomName={startState.team} usersList={usersList}/> 
        <div className="row w-100 h-75 mt-5 flex-row-reverse">
                <button className="w-25 btn btn-primary h-25 p-3" onClick={leaveTeam}>
                  Leave Room
                </button>
        </div>
      </div>
      }

    </div>
  );
}

export default App;
