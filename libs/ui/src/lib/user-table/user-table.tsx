import React, { useState } from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridPaginationModel,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridSortModel,
  GridToolbarContainer,
  useGridApiRef,
} from '@mui/x-data-grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';

import {
  addNewUser,
  checkIfUserExists,
  removeUser,
  updateUser,
  useFetchUsers,
} from './user-table-helpers';
import { User } from '@fullstack/interfaces';
import { Role } from '@fullstack/types';
import Avatar from '@mui/material/Avatar';
import { Chip } from '@mui/material';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id: string = crypto.randomUUID();
    setRows((oldRows: GridRowsProp) =>
      [
        ...oldRows,
        {
          id,
          username: 'new user',
          password:
            '$2b$10$mg7KG9fSZaHbOU0EZzSYk.I20qiYB/AAbSOtb37kODVTXWQVLEmCm',
          roles: ['user'],
        },
      ].reverse()
    );
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'username' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add new user
      </Button>
    </GridToolbarContainer>
  );
}

export function UserTable() {
  const apiRef = useGridApiRef();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  const { isLoading, usersCount, setUsersCount, rows, setRows } = useFetchUsers(
    `/api/users?page=${paginationModel.page + 1}&limit=${
      paginationModel.pageSize
    }`,
    paginationModel
  );

  const handlePaginationModelChange = (
    newPaginationModel: GridPaginationModel
  ) => setPaginationModel(newPaginationModel);

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    setRows((prevState) => prevState);
  };

  const handleEditClick = (id: GridRowId) => () =>
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.Edit },
    });

  const handleSaveClick = (id: string) => async () => {
    const username = (
      apiRef.current.getCellElement(id, 'username')?.lastChild
        ?.lastChild as HTMLInputElement
    ).value;
    const password = (
      apiRef.current.getCellElement(id, 'password')?.lastChild
        ?.lastChild as HTMLInputElement
    ).value;
    let response: [User | User[], boolean] | boolean;
    let isSaveSucceeded: boolean;

    if (await checkIfUserExists(id)) {
      response = await updateUser(id, { username, password });
      if (Array.isArray(response) && (response as [User, boolean])[1]) {
        isSaveSucceeded = (response as [User, boolean])[1];
      } else {
        isSaveSucceeded = response as boolean;
      }
    } else {
      response = await addNewUser(username);
      if (Array.isArray(response) && (response as [User, boolean])[1]) {
        isSaveSucceeded = (response as [User, boolean])[1];
        setUsersCount((prevState) => prevState + 1);
        setPaginationModel({ page: 0, pageSize: 5 });
      } else {
        isSaveSucceeded = response as boolean;
      }
    }
    if (isSaveSucceeded) {
      setPaginationModel({ page: 0, pageSize: paginationModel.pageSize });
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    }
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.enterKeyDown) {
      event.defaultMuiPrevented = true;
      handleSaveClick(params.id as string)()
        .then(() => {
          setRowModesModel({
            ...rowModesModel,
            [params.id]: {
              mode: GridRowModes.View,
              ignoreModifications: false,
            },
          });
        })
        .catch((err) => toast.error(err.message));
    } else {
      event.defaultMuiPrevented = true;
      setRowModesModel({
        ...rowModesModel,
        [params.id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    }
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    if (await removeUser(id as string)) {
      setRows(rows.filter((row) => row.id !== id));
      setPaginationModel((prevState) => {
        if (prevState.pageSize === usersCount) {
          return { ...prevState, pageSize: prevState.pageSize - 1 };
        }
        return { ...prevState };
      });
      setUsersCount((prevState) => prevState - 1);
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) =>
    setRowModesModel(newRowModesModel);

  const handleSortModelChange = (newSortModel: GridSortModel) =>
    setSortModel(newSortModel);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 2,
      sortable: false,
      filterOperators: [],
    },
    { field: 'username', headerName: 'Username', flex: 2, editable: true },
    {
      field: 'password',
      headerName: 'Password',
      flex: 3,
      editable: true,
      sortable: false,
      filterable: false,
    },
    {
      field: 'roles',
      headerName: 'Roles',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      sortComparator: (a: string[], b: string[]) => {
        const roleA = a.includes(Role.ADMIN) ? 'admin' : 'user';
        const roleB = b.includes(Role.ADMIN) ? 'admin' : 'user';
        return roleA.localeCompare(roleB);
      },
      renderCell: (params) => {
        const isAdmin = params.row.roles.includes(Role.ADMIN);
        const chipColor = isAdmin ? 'error' : 'info';
        const chipLabel = isAdmin ? 'admin' : 'user';
        return (
          <Chip
            color={chipColor}
            size="small"
            avatar={<Avatar>{chipLabel.charAt(0).toUpperCase()}</Avatar>}
            title={chipLabel}
            label={chipLabel}
          />
        );
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      cellClassName: 'actions',
      align: 'center',
      headerAlign: 'center',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id as string)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        autoHeight={true}
        autoPageSize={false}
        apiRef={apiRef}
        columns={columns}
        // checkboxSelection
        disableRowSelectionOnClick
        editMode="row"
        loading={isLoading}
        onPaginationModelChange={handlePaginationModelChange}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        onSortModelChange={handleSortModelChange}
        pageSizeOptions={[5, 15, 30, +usersCount]}
        paginationModel={paginationModel}
        pagination
        paginationMode="server"
        processRowUpdate={processRowUpdate}
        rows={rows}
        rowCount={usersCount}
        rowModesModel={rowModesModel}
        rowSelection={false}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        sortModel={sortModel}
      />
      <Divider />
      <div>
        <Button variant="contained" color="primary">
          SAVE
        </Button>
        <Button variant="contained" color="warning">
          CANCEL
        </Button>
        <Button variant="contained" color="error">
          REMOVE
        </Button>
      </div>
    </div>
  );
}

export default UserTable;
