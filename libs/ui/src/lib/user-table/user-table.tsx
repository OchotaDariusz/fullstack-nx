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

const rows = [
  { id: crypto.randomUUID(), username: 'Snow', roles: ['user'] },
  { id: crypto.randomUUID(), username: 'Lannister', roles: ['user'] },
  { id: crypto.randomUUID(), username: 'Lannister', roles: ['user'] },
  { id: crypto.randomUUID(), username: 'Stark', roles: ['user'] },
  { id: crypto.randomUUID(), username: 'Targaryen', roles: ['user'] },
  { id: crypto.randomUUID(), username: 'Melisandre', roles: ['user'] },
  { id: crypto.randomUUID(), username: 'Clifford', roles: ['user'] },
  { id: crypto.randomUUID(), username: 'Frances', roles: ['user'] },
  { id: crypto.randomUUID(), username: 'Roxie', roles: ['user'] },
];

/* eslint-disable-next-line */
export interface UserTableProps {}

export function UserTable(props: UserTableProps) {
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
      // .get(`/api/users?page=${paginationModel.page || 0}`)
      .get('/api/users')
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
    if (newPaginationModel.page === 0) {
      setPaginationModel(newPaginationModel);
    }
    // console.log("paginationModel");
    // console.log(paginationModel);
    // console.log("newPaginationModel");
    // console.log(newPaginationModel);
  };

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        paginationMode="server"
        pageSizeOptions={[5, 15, 25, 50]}
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
