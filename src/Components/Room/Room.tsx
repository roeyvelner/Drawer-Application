import React from 'react';
import { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ColorTray from '../Colors/Colors';
import Board from '../Board/Board.js';
import ListBox from '../ListBox/Listbox';
import {Canvas} from '../Canvas/Canvas';
import CanvasServer from '../Canvas/CanvasFromServer';

    export default ({
        roomName,
        usersList
    })=>{


        const [colorState,setcolorState] = useState('#fff');

        function HandlePickColor(color){
            setcolorState(color);
            console.log("colorState " + colorState);
        }
        

        const options = [
            'one', 'two', 'three'
          ];
        const defaultOption = options[0];
          
        return (
            <div className="position-relative h-75">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col4">
                    <div className="display-3" > {roomName}</div>
                    </div>
                </div>
                <div className="row h-75 flex-row-reverse">

                    <div className="col-9  ">
                        {/* <Board colorState={colorState}/> */}
                        {/* <Canvas colorState={colorState}/> */}
                        <CanvasServer color={colorState} roomName={roomName}/>
                    </div>
                    <div className="col-3 ">
                        <div className="row mt-5">
                            <div className="col-12">
                                <ListBox usersList={usersList}/>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-3">
                                <ColorTray colorState={colorState} HandlePickColor={HandlePickColor} />
                            </div>
                        </div>
                    </div>


                </div>
                
            </div>
        )
    }