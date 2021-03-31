import React, { useReducer, useContext } from "react";
import { initialState } from "./reducer";
import { State } from "./../models/State";

export const StateContext = React.createContext<[
    state: State,
    dispatch: (action: any) => any
]>([
    initialState,
    () => {}
]);

interface Props {
  reducer: (state: State, action: any) => State;
  initialState: State;
  children: React.ReactNode;
}

export const StateProvider: React.FC<Props> = ({
  reducer,
  initialState,
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);   
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
