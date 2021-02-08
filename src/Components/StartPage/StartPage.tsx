import React, { useEffect } from 'react';
import { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';


export function StartPage({startState,SetstartState,SetusersList}){

    const [options,setoptions]  = useState([]);

     async function GetTeamsFromServer(){
        try{
            const response = await fetch('http://drawserver-env.eba-kdm2hg7h.us-east-2.elasticbeanstalk.com/teams');
            const teams = await response.json();
            console.log(teams);
            setoptions(teams);
        }
        catch(err){
            console.log(err);
        }  
    }

    useEffect(() =>{
        GetTeamsFromServer();
    },[]);

    
    //['Team1', 'Team2', 'Team3'];
    const defaultOption = options[0];
      

    async function GotoRoom(values){
        SetstartState({name:values.name,team:startState.team})
        try{

            const response  = await fetch('http://drawserver-env.eba-kdm2hg7h.us-east-2.elasticbeanstalk.com/users/'+startState.team, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                body:  JSON.stringify({name: values.name})
            })
            const users = await response.json();
            console.log("This is the Users = " + users);
            SetusersList(users);
        }
        catch(err){
            console.log("Err while POST user name");
            console.log(err);
        }
        
    }

    function onSelect(option){
        console.log(option);
        SetstartState({name:startState.name,team:option.value})
    }
    return (
        <Formik
            initialValues = {{ name:"",password:"" }}
            onSubmit ={GotoRoom}
            render={
                ()=>{
                    return(
                        <Form>
                            <div>
                                <div className="display-4">
                                    White Board -Teams Daily
                                </div>
                                <div className="row d-flex align-items-between mt-5">
                                    <div className="col-2">
                                        EnterName
                                    </div>
                                    <div className="col-4">
                                        <Field className="form-control" name="name" id="name-input"/>
                                    </div>
                                    
                                </div>

                                <div className="row d-flex align-items-between mt-5">
                                    <div className="col-2">
                                        Choose team
                                    </div>
                                    <div className="col-4 ">
                                            <Dropdown 
                                                        options={options} 
                                                        onChange={onSelect} 
                                                        value={defaultOption} 
                                                        placeholder="Select an option" />
                                    </div>
                                    
                                </div>

                                <div className="row d-flex align-items-between mt-5">
                                    <div className="col-6 ">
                                            <button>Submit</button>
                                    </div>
                                    
                                </div>

                         </div>
                        </Form>
                    )}}
                    />
    )
}