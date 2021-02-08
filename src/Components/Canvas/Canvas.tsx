import React, { useEffect } from 'react';

import { ReactSketchCanvas } from "react-sketch-canvas";
 
const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};
 
export const Canvas = ({colorState}) => {
  return (
    <ReactSketchCanvas
      style={styles}
      width="100%"
      height="100%"
      strokeWidth={2}
      strokeColor={colorState}
    />
  );
};


export default ()=>{
    return(
        <div>

        </div>
    )
}