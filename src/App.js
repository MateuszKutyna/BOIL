import './App.css';
import ConnectionInput from './components/ConnectionInput';
import InputBox from "./components/InputBox";
import NodeInput from './components/NodeInput';
import DenseTable from './components/tabelComponent';
import labels from "./labels/labelObj";

const App = ()=> {
   

  return (
    <div className="App-header">
      <div>
        <InputBox props={{...labels.supplierLabels,isSupplier:true}}/>
        <InputBox props={{...labels.reciverLabels,isSupplier:false}}/>
        <NodeInput props={labels.nodeLabels}/>
        <ConnectionInput props ={labels.connectionLabels}/>
      </div>
      <div className="container">
        <DenseTable/>
      </div>
    </div>
    
  );
}

export default App;
