// Define action types
export const ADD_RECORD = 'ADD_RECORD';
export const EDIT_RECORD = 'EDIT_RECORD';
export const DELETE_RECORD = 'DELETE_RECORD';

// Define action creators

export const addRecord = (record: { key: string; name: string; age: number; address: string }) => ({
  type: ADD_RECORD,
  payload: record,
});

export const editRecord = (record: { key: string; name: string; age: number; address: string }) => ({
  type: EDIT_RECORD,
  payload: record,
});

export const deleteRecord = (key: string) => ({
  type: DELETE_RECORD,
  payload: key,
});
