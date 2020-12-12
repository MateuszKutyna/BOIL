import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

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

const createData = (connection, cost, amount)=> {
  return { connection, cost, amount};
}

const rows = [
  createData("1->2", 159),
  createData("2->3", 237),
  createData("3->4", 262, 16.0),
  createData("4->5", 3053),
  createData("5->6", 356),
];



const DenseTable=()=> {
  const classes = useStyles();

  async function setData() {
    try {
      const backendData = await axios.get('/data');
      console.log(backendData);
      
    } catch (error) {
      console.error(error);
    }
  }

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

      setData();
  }
  

  return (<div>
     <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Polaczenie</TableCell>
            <TableCell align="right">Koszt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.connection}>
              <TableCell component="th" scope="row">
                {row.connection}
              </TableCell>
              <TableCell align="right">{row.cost}</TableCell>
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