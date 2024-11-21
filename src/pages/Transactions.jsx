import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import Transaction from "../components/Transaction";
import TransactionModal from "../components/TransactionModal";
import { useContext } from "react";
import { AppContext } from "../App";
function Transactions() {
  const { transactions, setTransactions } = useOutletContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  React.useEffect(() => {
    axios
      .get("https://6738aa0b4eb22e24fca89960.mockapi.io/Transactions")
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);
  return (
    <div className="table__container">
      <TransactionModal isOpen={modalIsOpen} onClose={closeModal} />
      <div className="table_top__wrapper">
        <button className="button__add_transaction" onClick={openModal}>
          Добавить запись
        </button>
        <div className="table__filter">
          <button className="button__filter">
            <img src="./img/button_filter.svg" alt="filter" />
            <span>Filter</span>
          </button>
          <div className="search_container">
            <span className="search_icon">
              <img src="./img/search.svg" alt="" />
            </span>
            <input
              type="text"
              placeholder="Aspen Weste"
              className="search_input"
            />
          </div>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th className="date">Дата и время</th>
            <th className="details">Детали</th>
            <th className="description">Описание</th>
            <th className="summ">Сумма</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((obj, index) => (
            <Transaction key={obj.id || index} {...obj} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
