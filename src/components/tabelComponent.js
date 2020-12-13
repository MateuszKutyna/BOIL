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

const exampledata= {
  "nodes": [
    {
      "id": 1,
      "type": "supplier",
      "amount": 250
    },
    {
      "id": 2,
      "type": "supplier",
      "amount": 300
    },
    /* {
      "id": 3,
      "type": "receiver",
      "amount": 120
    },
    {
      "id": 4,
      "type": "receiver",
      "amount": 250
    },
    {
      "id": 5,
      "type": "receiver",
      "amount": 100
    },
    {
      "id": 6,
      "type": "transport"
    } */
  ],
  "connections": [
    {
      "node1ID": 2,
      "node2ID": 1,
      "cost": 2
    },
   /*  {
      "node1ID": 1,
      "node2ID": 3,
      "cost": 3,
      "max": 50,
      "min": 30
    },
    {
      "node1ID": 1,
      "node2ID": 6,
      "cost": 5,
      "max": 150
    },
    {
      "node1ID": 2,
      "node2ID": 6,
      "cost": 6
    },
    {
      "node1ID": 2,
      "node2ID": 5,
      "cost": 2
    },
    {
      "node1ID": 6,
      "node2ID": 3,
      "cost": 5
    },
    {
      "node1ID": 6,
      "node2ID": 4,
      "cost": 4
    },
    {
      "node1ID": 6,
      "node2ID": 5,
      "cost": 1
    },
    {
      "node1ID": 3,
      "node2ID": 4,
      "cost": 8
    },
    {
      "node1ID": 4,
      "node2ID": 5,
      "cost": 4
    } */
  ]
};


const createData = (connection, cost, amount, min, max)=> {
  return { connection, cost, amount, min, max};
}

const DenseTable=()=> {
  const classes = useStyles();
  let tempRows=[];
  const [rows,setRows] = useState([]);
  console.log(data)
  const handleButton = ()=>{
    axios.post('http://localhost:8080/optimize', 
    data)
    .then(function (response) {
      response.data.connections.map((a)=>{
        tempRows.push(createData(`${a.node1ID}->${a.node2ID}`,a.cost,a.amount,a.min,a.max));
      });
      tempRows.push(createData("TOTAL TRANSPORT COST",undefined,undefined,undefined,response.data.transportCost))
      setRows(tempRows)
    })
    .catch(function (error) {
      console.log(error);
    });
    
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

   </div>
   
  );
}

export default DenseTable;