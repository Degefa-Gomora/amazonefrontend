
// Global state 
import { createContext, useReducer } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children, reducer, initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};







































// import { createContext, useReducer } from "react";


// export const DataContext = createContext();

// export const DataProvider = ({children,reducer,initialState}) => {
//     return (
//         <DataContext.Provider value={useReducer(reducer, initialState)}>
//             {children}
//         </DataContext.Provider>
//     );
// }



// DataProvider.jsx
// import { createContext, useReducer } from "react";

// export const DataContext = createContext();

// export const DataProvider = ({ children, reducer, initialState }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <DataContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </DataContext.Provider>
//   );
// };

// import { createContext, useReducer } from "react";

// export const DataContext = createContext();

// export const DataProvider = ({ children, reducer, initialState }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <DataContext.Provider value={{ state, dispatch }}>
//       {children}
//     </DataContext.Provider>
//   );
// };
