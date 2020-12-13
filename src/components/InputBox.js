import React, { useEffect, useState } from "react";
import {Button, TextField} from "@material-ui/core"
import "./componentsStyles.css";
import {data} from "./tabelComponent";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const InputBox = ({props})=>{
    const {firstLabel, secondLabel, buttonName,isSupplier} = props;
    const classes = useStyles();
    const [supplier,setSupplier] = useState(null);
    const [receiver,setReceiver] = useState(null);
    const [rows,setRows] = useState([]);
    let tempRows = [];
    useEffect(()=>{
      if(isSupplier && supplier){
        data.nodes.push({id: supplier.id,type: "supplier",amount: supplier.amount});
      }
      else if(receiver){
        data.nodes.push({id: receiver.id,type: "receiver",amount: receiver.amount});
        
      }});

    
    const set = (setFunction,inputBoxId1,inputBoxId2) =>{
        setFunction({id:Number(document.getElementById(inputBoxId1).value),amount: Number(document.getElementById(inputBoxId2).value)})
      if(isSupplier){
        tempRows=[...rows]
        tempRows.push({id:Number(document.getElementById(inputBoxId1).value), amount: Number(document.getElementById(inputBoxId2).value)});
        setRows(tempRows);
      }else{
        tempRows=[...rows]
        tempRows.push({id:Number(document.getElementById(inputBoxId1).value), amount: Number(document.getElementById(inputBoxId2).value)});
        setRows(tempRows);
      } 
       
    }

    return(
    <div className="inputBox">
        <TextField id={isSupplier?"supplierID":"resiverID"} label={firstLabel} className="textField" />
        <TextField id={isSupplier?"supplierCost":"resiverCost"} label={secondLabel} className="textField"/>
        <Button variant="contained" className="button" onClick={()=>(isSupplier?set(setSupplier,"supplierID","supplierCost"):set(setReceiver,"resiverID","resiverCost"))}>{buttonName}</Button>
        <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">KOSZT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>);
}

export default InputBox;