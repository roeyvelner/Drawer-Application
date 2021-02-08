import React,{ useState } from 'react';


import { Listbox, Option, OptionsList } from 'listbox';

export default ({usersList})=>{

    const options = [
        { label: 'One', value: 1 },
        { label: 'Two', value: 2 },
        { label: 'Three', value: 3 },
      ];

 

    return(
        <>
            <ul className="list-group">
            {
                (function(){
                    var counter =1;
                    const arrayLis=[] as any;
                    for (let item of usersList){
                        
                        arrayLis.push(<li>{item}</li>)
                        // arrayLis.push(<ToDoItem counter={counter} id={item.id} title={item.title}  description={item.description} group={item.group} when={item.when} />)  Version 1
                        
                    }
                    return arrayLis;
                })()
            }
            </ul>
    </>
    )
}
