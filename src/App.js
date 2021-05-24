// import React from 'react';
// import {AgGridColumn, AgGridReact} from 'ag-grid-react';

// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// const App = () => {
//    const rowData = [
//        {
//           City: "Sasovo",
//           Country: "Russia",
//           DOB: "24-12-1987",
//           Email: "ksimonyi1@slashdot.org",
//           Gender: "Female",
//           Id: 2,
//           Name: "Kassie",
//           isError: {}},

//        {
//           City: "Leviv",
//           Country: "Ukraine",
//           DOB: "14-01-1990",
//           Email: "hivanenkov2@163.com",
//           Gender: "Male",
//           Id: 3,
//           Name: "Homerus",
//           isError: {}}
      
//    ];

//    return (
//        <div className="ag-theme-alpine" style={{height: 400,padding:30}}>
//            <AgGridReact
//                rowData={rowData} y>
//                <AgGridColumn field="Id" ></AgGridColumn>
//                <AgGridColumn field="Name"></AgGridColumn>
//                <AgGridColumn field="Email"></AgGridColumn>
//                <AgGridColumn field="Gender"></AgGridColumn>
//                <AgGridColumn field="DOB"></AgGridColumn>
//                <AgGridColumn field="Country"></AgGridColumn>
//                <AgGridColumn field="City"></AgGridColumn>
//            </AgGridReact>
//        </div>
//    );
// };

//export default App;



import React, { Component } from 'react';
import { render } from 'react-dom';

import { AllCommunityModules } from 'ag-grid-community';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rowData2:[],
      modules: AllCommunityModules,
      rowData: [
        {
                     City: "Sasovo",
                     Country: "Russia",
                     DOB: "24-12-1987",
                     Email: "ksimonyi1@slashdot.org",
                     Gender: "Female",
                     Id: 2,
                     Name: "Kassie",
                     isError: {}},
          
                  {
                     City: "Leviv",
                     Country: "Ukraine",
                     DOB: "14-01-1990",
                     Email: "hivanenkov2@163.com",
                     Gender: "Male",
                     Id: 3,
                     Name: "Homerus",
                     isError: {}}
      ],
      columnDefs: [
        { field: 'Id', checkboxSelection: true,editable:true },
        { field: 'Name',editable:true },
        { field: 'Email' ,editable:true},
        { field: 'DOB' ,editable:true},
        { field: 'City',editable:true },
        { field: 'Country',editable:true },
      ],
      columnDefs2: [
        { field: 'Id' },
        { field: 'Name'},
        { field: 'Email' },
        { field: 'DOB' },
        { field: 'City'},
        { field: 'Country' },
      ],
      defaultColDef: { flex: 1 },
      rowSelection: 'multiple',
      
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  getRowData = () => {
    var rowData = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    console.log('Row Data:');
    console.log(rowData);
    this.setState({rowData2: rowData})
  };

  addItems = (addIndex) => {
    var newItems = [createNewRowData()];
    var res = this.gridApi.applyTransaction({
      add: newItems,
      addIndex: addIndex,
    });
    printResult(res);
  };

  onRemoveSelected = () => {
    var selectedData = this.gridApi.getSelectedRows();
    var res = this.gridApi.applyTransaction({ remove: selectedData });
    printResult(res);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          style={{ height: 300, display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ marginBottom: '4px' }}>
            <button onClick={() => this.addItems()}>Add New Row</button>
            
            
            <button onClick={() => this.onRemoveSelected()}>
              Remove Selected
            </button>
            <button onClick={() => this.getRowData()}>Submit</button>
          </div>
          <div style={{ flexGrow: '1' }}>
            <div
              id="myGrid"
              style={{
                height: '100%',
                width: '100%',
              
              }}
              className="ag-theme-alpine"
            >
              <AgGridReact
                modules={this.state.modules}
                rowData={this.state.rowData}
                columnDefs={this.state.columnDefs}
                defaultColDef={this.state.defaultColDef}
                rowSelection={this.state.rowSelection}
                animateRows={true}
                onGridReady={this.onGridReady}
                
              />
            </div>
           
          </div>
        </div>
        <div
              style={{
                height: 300,
                width: '100%',
              }}
              className="ag-theme-alpine"
            >
              <AgGridReact
                rowData={this.state.rowData2}
                columnDefs={this.state.columnDefs2}
                            
              />
            </div>
      </div>
    );
  }
}

var newCount = 1;
function createNewRowData() {
  var newData = {
    Id: 'unknown' ,
    Name: 'unknown',
    Email: "something@gmail.com",
    DOB: 'unknown',
    Country: 'unknown',
    City: 'unknown',
  };
  newCount++;
  return newData;
}
function printResult(res) {
  console.log('---------------------------------------');
  if (res.add) {
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
  }
  if (res.remove) {
    res.remove.forEach(function (rowNode) {
      console.log('Removed Row Node', rowNode);
    });
  }
  if (res.update) {
    res.update.forEach(function (rowNode) {
      console.log('Updated Row Node', rowNode);
    });
  }
}

