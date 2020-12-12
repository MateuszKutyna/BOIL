import React, { useEffect, useState } from "react";
import {Button, TextField} from "@material-ui/core"
import "./componentsStyles.css";
import {data} from "./tabelComponent";


const ConnectionInput = ({props})=>{

    const {firstLabel,secondLabel, thirdLabel, buttonName} = props;
    const [connection, setConnection]=useState(null);
    
    useEffect(()=>{
       if(connection){
           data.connections.push({from: connection.from, to: connection.to, cost: connection.cost});
       }
    })

    const handleButton = ()=>{
        setConnection({
            from:document.getElementById("FROM").value,
            to:document.getElementById("TO").value,
            cost:Number(document.getElementById("COST").value)
        })
    }

    return (
    <div className="inputBox">
        <TextField id="FROM" label={firstLabel} className="textField" />
        <TextField id="TO" label={secondLabel} className="textField" />
        <TextField id="COST" label={thirdLabel} className="textField" />
        <Button variant="contained" className="button" onClick={handleButton}>{buttonName}</Button>
    </div>);

}

export default ConnectionInput;
