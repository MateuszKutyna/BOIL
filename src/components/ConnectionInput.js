import React, { useEffect, useState } from "react";
import {Button, TextField} from "@material-ui/core"
import "./componentsStyles.css";
import {data} from "./tabelComponent";


const ConnectionInput = ({props})=>{

    const {firstLabel,secondLabel, thirdLabel, buttonName} = props;
    const [connection, setConnection]=useState(null);
    
    useEffect(()=>{
       if(connection){
           data.connections.push({node1ID: connection.node1ID, node2ID: connection.node2ID, cost: connection.cost, max: connection.max,min:connection.min});
            console.log(data);
        }
       
    })

    const handleButton = ()=>{
        setConnection({
            node1ID:document.getElementById("FROM").value,
            node2ID:document.getElementById("TO").value,
            cost:Number(document.getElementById("COST").value),
            max:document.getElementById("MAX").value?document.getElementById("MAX").value:undefined,
            min:document.getElementById("MIN").value?document.getElementById("MIN").value:undefined,
        })
    }

    return (
    <div className="inputBox">
        <TextField id="FROM" label={firstLabel} className="textField" />
        <TextField id="TO" label={secondLabel} className="textField" />
        <TextField id="COST" label={thirdLabel} className="textField" />
        <TextField id="MAX" label="MAX" className="textField" />
        <TextField id="MIN" label="MIN" className="textField" />
        <Button variant="contained" className="button" onClick={handleButton}>{buttonName}</Button>
    </div>);

}

export default ConnectionInput;
