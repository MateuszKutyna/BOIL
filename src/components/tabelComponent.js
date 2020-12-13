import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TextField } from '@material-ui/core';

const axios = require('axios').default;

export const data = {
  nodes:[],
  connections:[],
}
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



const createData = (connection, cost, amount, min, max)=> {
  return { connection, cost, amount, min, max};
}



async function setData() {
  try {
    return await axios.get('/data');  
  } catch (error) {
    console.error(error);
  }
}

const DenseTable=()=> {
  const classes = useStyles();
  let tempRows=[];
  const [rows,setRows] = useState([]);
  const [totalCost,setTotalCost] = useState();

  const handleButton = ()=>{
    console.log(data);
    axios.post('/data', {
      data: data,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    const backendData = setData();

    setTotalCost(backendData.transportCost);
    
    backendData.connections.map((a)=>{
      tempRows.push(createData(`${a.node1ID}->${a.node2ID}`,a.cost,a.amount,a.min,a.max));
    })
    setRows(tempRows);
  }

  return (<div>
     <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Polaczenie</TableCell>
            <TableCell align="right">Koszt</TableCell>
            <TableCell align="right">Ilosc</TableCell>
            <TableCell align="right">Min</TableCell>
            <TableCell align="right">Max</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.connection}>
              <TableCell component="th" scope="row">
                {row.connection}
              </TableCell>
              <TableCell align="right">{row.cost}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.min}</TableCell>
              <TableCell align="right">{row.max}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button onClick={handleButton}>Optymalizuj</Button>
    <TextField label="F"></TextField>
   </div>
   
  );
}

export default DenseTable;