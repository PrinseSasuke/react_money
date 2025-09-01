import "./App.scss";
import React, { useState, useEffect, createContext } from "react";
import Side from "./components/Side";
import { Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, collection, getDocs, query, where, auth, addDoc } from "./firebase";

export const AppContext = createContext({});

function App() {
  const [transactions, setTransactions] = useState([]);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
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

    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const generateTestExpenses = async () => {
    if (!user) {
      alert("Сначала авторизуйся");
      return;
    }

    const transRef = collection(db, 'transactions');
    const userId = user.uid;

    // умный расчёт последних 6 месяцев
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // с 1 по 12

    const months = [];

    for (let i = 0; i < 6; i++) {
      let month = currentMonth - i;
      let year = currentYear;

      if (month <= 0) {
        month += 12;
        year -= 1;
      }

      months.push({ year, month });
    }

    for (let m of months) {
      for (let i = 0; i < 10; i++) {
        const randomSum = Math.floor(Math.random() * 4000) + 1000;
        const randomDay = Math.floor(Math.random() * 28) + 1;
        const date = new Date(m.year, m.month - 1, randomDay); // месяц сдвиг на -1

        await addDoc(transRef, {
          user_id: userId,
          type: "Расход",
          source: "Генератор",
          summ: randomSum,
          description: "Тестовая операция",
          currency: "rub",
          date: date
        });
      }
    }

    alert("Данные залиты");
  };

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
