import React, { useEffect, useState } from "react";
import {Button, TextField} from "@material-ui/core"
import "./componentsStyles.css";
import {data} from "./tabelComponent";


const ConnectionInput = ({props})=>{

    const {firstLabel,secondLabel, thirdLabel, buttonName} = props;
    const [connection, setConnection]=useState(null);
    
    useEffect(()=>{
       if(connection && connection.min && connection.max){
           data.connections.push({node1ID: connection.node1ID, node2ID: connection.node2ID, cost: connection.cost, max: connection.max,min:connection.min});
            console.log(data);
        }else if(connection && connection.min && !connection.max){
            data.connections.push({node1ID: connection.node1ID, node2ID: connection.node2ID, cost: connection.cost,min:connection.min});
        }else if(connection && connection.max && !connection.min){
            data.connections.push({node1ID: connection.node1ID, node2ID: connection.node2ID, cost: connection.cost, max: connection.max,});
        }else if(connection && !connection.max && !connection.min){
            data.connections.push({node1ID: connection.node1ID, node2ID: connection.node2ID, cost: connection.cost});
        }
       console.log(data)
    })

    const handleButton = ()=>{
        
            setConnection({
                node1ID:Number(document.getElementById("FROM").value),
                node2ID:Number(document.getElementById("TO").value),
                cost:Number(document.getElementById("COST").value),
                max:document.getElementById("MAX").value,
                min:document.getElementById("MIN").value,
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
