import React from 'react'
import { CirclePicker,Chrome  } from 'react-color'
 



export default ({colorState,HandlePickColor})=>{

    function handleChangeComplete  (color) {
        HandlePickColor(color.hex);
        console.log(color.hex)
    };

    return (

        <CirclePicker 
            color={ colorState }
            onChangeComplete={ handleChangeComplete }
        />
    )
}
