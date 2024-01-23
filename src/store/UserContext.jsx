import { createContext, useReducer, useState } from "react";

export const UserContext = createContext({
  user: {},
  signup: () => {},
  login: () => {},
  logout: () => {},
});

const userReducer = (user, action) => {
  let newUser = user;

  switch (action.type) {
    case "LOGOUT":
      newUser = {};
      return newUser;
    case "SET_USER":
      newUser = action.payload;
      return newUser;
    default:
      return newUser;
  }
};

const docReducer = (doc, action) => {
  let newDoc = doc;
  switch (action.type) {
    case "SET_DOC":
      newDoc = action.payload.doc;
      return newDoc;
    default:
      return newDoc;
  }
};

const docsReducer = (docs, action) => {
  let newDocs = docs;
  switch (action.type) {
    case "SET_DOCS":
      newDocs = action.payload.docs;
      return newDocs;
    case "RESET_DOCS":
      newDocs = [];
      return newDocs;
    default:
      return newDocs;
  }
};

const UserProvider = ({ children }) => {
  const [user, dispatchUser] = useReducer(userReducer, false);
  const [document, dispatchDoc] = useReducer(docReducer, []);
  const [documents, dispatchDocs] = useReducer(docsReducer, []);
  const [alert, setAlert] = useState(null);

  const setUser = (user) => {
    dispatchUser({ type: "SET_USER", payload: user });
  };
  const setDoc = (doc) => {
    dispatchDoc({ type: "SET_DOC", payload: { doc } });
  };

  const setDocs = (docs) => {
    dispatchDocs({ type: "SET_DOCS", payload: { docs } });
  };

  const logout = () => {
    dispatchUser({ type: "LOGOUT" });
    dispatchDocs({ type: "RESET_DOCS" });
  };

  const isLoggedIn = () => {
    if (user !== false) {
      return true;
    }
    return false;
  };
  return (
    <UserContext.Provider
      value={{
        user,
        document,
        alert,
        documents,
        setDocs,
        setUser,
        isLoggedIn,
        logout,
        setDoc,
        setAlert,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
