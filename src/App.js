import "./App.scss";
import React from "react";

import Side from "./components/Side";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, collection, getDocs, query, where, auth } from "./firebase";
export const AppContext = createContext({});

function App() {
  const [transactions, setTransactions] = useState([]);
  const [user, loading] = useAuthState(auth);
  React.useEffect(() => {
    const fetchTransactions = async () => {
      const q = query(
        collection(db, "transactions"),
        where("user_id", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const transactionsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(transactionsList);
    };
    user && fetchTransactions();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <AppContext.Provider value={{ transactions, setTransactions }}>
      <div className="App">
        <Side />
        <Outlet context={{ transactions, setTransactions }} />
      </div>
    </AppContext.Provider>
  );
}

export default App;
