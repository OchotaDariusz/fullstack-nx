import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridValueGetterParams,
} from '@mui/x-data-grid';

import { fetchData } from '@fullstack/data-manager';
import { User } from '@fullstack/interfaces';

// TODO: add breakpoints to column headers
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 500 },
  { field: 'username', headerName: 'Username', width: 400 },
  {
    field: 'roles',
    headerName: 'Roles',
    width: 100,
    valueGetter: (params: GridValueGetterParams) => params.row.roles,
  },
];

export function UserTable() {
  const [rows, setRows] = useState<User[]>([]);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });
  const [isLoading, setIsLoading] = useState(false);

  // get how many users are in db
  const [usersCount, setUsersCount] = useState(0);
  useEffect(() => {
    fetchData
      .get('/api/users/?count=true')
      .then((response) => {
        setUsersCount(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // handle pagination side effects
  useEffect(() => {
    setIsLoading(true);
    fetchData
      .get(`/api/users?page=${paginationModel.page + 1}`)
      // .get('/api/users')
      .then((response) => response.data)
      .then((users: User[]) => {
        setRows(users);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [paginationModel]);

  const handlePaginationModelChange = (
    newPaginationModel: GridPaginationModel
  ) => {
    setPaginationModel(newPaginationModel);
    console.log('old');
    console.log(paginationModel);
    console.log('new');
    console.log(newPaginationModel);
  };

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        paginationMode="server"
        autoPageSize={false}
        loading={isLoading}
        rowCount={usersCount}
        checkboxSelection
        onPaginationModelChange={handlePaginationModelChange}
        paginationModel={paginationModel}
      />
    </div>
  );
}

export default UserTable;
