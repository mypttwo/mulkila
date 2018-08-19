import React from 'react';

const Context = React.createContext();

export const ContextProvider = props => {
  return (
    <Context.Provider value={{dictionary: props.dictionary}} >
      {props.children}
    </Context.Provider>
  );
};

export function withContext(Component) {
    return function AppComponent(props) {
      return (
        <Context.Consumer>
          {context => <Component {...props} dictionary={context.dictionary} />}
        </Context.Consumer>
      );
    };
  }