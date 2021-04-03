import React, { useState, useEffect } from 'react';
import './App.css';
import { forwardRef } from 'react';

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios';


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function App()  {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                console.table(data)
                setData(data)
            })
            .catch(error => {
                console.log(error)
            })
  }, []);
  
      const columns = [
        {title: "Id", field:"id",hidden:"true"},
        {title: "Name", field: "name"},
        {title: "Username", field:"username"},
        {title: "Email", field: "email"},
        {title: "Phone", field: "phone"},
        {title: "Website", field: "website"}
      ]
   
  return (
    <div className="App">
      
            <MaterialTable
              title="User data from remote source"
              columns={columns}
              data={data}
              icons={tableIcons}
              editable={{
                onRowUpdate: (oldData,newData) =>
                new Promise((resolve, reject) => {
                  const RowId = oldData.id;
                  fetch(`https://jsonplaceholder.typicode.com/users/${RowId}`, {
                      method: 'PUT',
                      body: JSON.stringify(newData),
                      headers: {
                          'Content-type': 'application/json; charset=UTF-8',
                      }
                  })
                      .then(res => res.json())
                      .then(data => {
                          console.table(data)
                          const dataUpdate = [...data];
                          const index = oldData.tableData.id;
                          dataUpdate[index] = data;
                          setData([...dataUpdate]);
                          resolve();
                      })
                      .catch(e => {
                          console.log(e);
                          reject()
                      })

              }),
                onRowAdd: (newData) =>
                  new Promise((resolve,reject) => {
                    fetch(`https://jsonplaceholder.typicode.com/users`, {
                      method: 'POST',
                      body: JSON.stringify(newData),
                      headers: {
                          'Content-type': 'application/json; charset=UTF-8',
                      }
                  })
                      .then(res => res.json())
                      .then(data => {
                          console.table(data)
                          setData([...data, data]);
                          resolve();
                      })
                      .catch(e => {
                          console.log(e);
                          reject()
                      })
              }),
              onRowDelete: (oldData) =>
                  new Promise((resolve,reject) => {
                    fetch(`https://jsonplaceholder.typicode.com/users/${oldData.id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.table(data)
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve();
            })
            .catch(e => {
                console.log(e);
                reject()
            })

                  }),
            }}

            />
    </div>
  );
      }
          

export default App;












