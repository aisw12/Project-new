import { ADD_RECORD, EDIT_RECORD, DELETE_RECORD } from './actions';

// Define the data type
export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

// Define the initial state
const initialState: DataType[] = [
  { key: '1', name: 'John Doe', age: 32, address: '10 Downing Street' },
  { key: '2', name: 'Jane Smith', age: 28, address: '11 Downing Street' },
  { key: '3', name: 'Sam Johnson', age: 45, address: '12 Downing Street' },
];

// Create the reducer function
const dataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_RECORD:
      return [...state, action.payload];  // Add new record
    case EDIT_RECORD:
      return state.map((record) =>
        record.key === action.payload.key ? { ...record, ...action.payload } : record
      );  // Edit an existing record
    case DELETE_RECORD:
      return state.filter((record) => record.key !== action.payload);  // Delete record by key
    default:
      return state;
  }
};

export default dataReducer;
