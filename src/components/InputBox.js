import React, { useEffect, useState } from "react";
import {Button, TextField} from "@material-ui/core"
import "./componentsStyles.css";
import {data} from "./tabelComponent";



const InputBox = ({props})=>{
    const {firstLabel, secondLabel, buttonName,isSupplier} = props;

    const [supplier,setSupplier] = useState(null);
    const [receiver,setReceiver] = useState(null);
   
    useEffect(()=>{
      if(isSupplier && supplier)
        data.nodes.push({id: supplier.id,cost: supplier.cost,type: "supplier"});
      else if(receiver)
        data.nodes.push({id: receiver.id,cost: receiver.cost,type: "receiver"});})

    
    const set = (setFunction,inputBoxId1,inputBoxId2) =>{
        setFunction({id:document.getElementById(inputBoxId1).value,cost: Number(document.getElementById(inputBoxId2).value)})
    }

    return(
    <div className="inputBox">
        <TextField id={isSupplier?"supplierID":"resiverID"} label={firstLabel} className="textField" />
        <TextField id={isSupplier?"supplierCost":"resiverCost"} label={secondLabel} className="textField"/>
        <Button variant="contained" className="button" onClick={()=>(isSupplier?set(setSupplier,"supplierID","supplierCost"):set(setReceiver,"resiverID","resiverCost"))}>{buttonName}</Button>
    </div>);
}

export default InputBox;