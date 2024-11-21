import "./App.scss";
import Side from "./components/Side";
import Transactions from "./pages/Transactions";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { createContext } from "react";
export const AppContext = createContext({});
function App() {
  const [transactions, setTransactions] = useState([]);

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
