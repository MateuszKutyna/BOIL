import React, {useEffect, useState} from "react";
import {Button, TextField} from "@material-ui/core"
import "./componentsStyles.css";
import {data} from "./tabelComponent"

const NodeInput = ({props})=>{
    const {firstLabel, buttonName} = props;
    const [node,setNode] = useState("")

    useEffect(()=>{
      if(node){
        data.nodes.push({id:node,type:"transport"});
      }
    })
    const handleButton = ()=>{
        setNode(document.getElementById("nodeId").value);
    }
    
    return(<div className="inputBox">
        <TextField id="nodeId" label={firstLabel} className="textField" />
        <Button variant="contained" className="button" onClick={handleButton}>{buttonName}</Button>
    </div>);

}

export default NodeInput;