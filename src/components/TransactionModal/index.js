import React from "react";
import styles from "./TransactionModal.module.scss";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { AppContext } from "../../App";
import { useContext } from "react";
function TransactionModal({ isOpen, onClose }) {
  const { setTransactions } = useContext(AppContext);

  const customFormStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      padding: "60px 100px",
    },
    overlay: {
      backgroundColor: "transperent",
    },
  };
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };
  const handleChange = (event) => {
    setForm({ ...form, [event.target.id]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(
      "https://6738aa0b4eb22e24fca89960.mockapi.io/Transactions",
      form
    );
    setTransactions((prev) => [...prev, form]);
    setForm(INITIAL_STATE);
    onClose();
  };
  Modal.setAppElement("#root");
  const [startDate, setStartDate] = useState(new Date());
  const INITIAL_STATE = {
    date: formatDate(new Date()),
    type: "Доход",
    source: "Зарплата",
    description: "",
    summ: "",
    currency: "Рубль",
  };
  const [form, setForm] = React.useState(INITIAL_STATE);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Example Modal"
        style={customFormStyles}
        closeTimeoutMS={200}
      >
        <div className={styles.topWrapper}>
          <span className={styles.title}>Добавить запись</span>
          <button className={styles.close} onClick={onClose}>
            <img src="./img/close_button.svg" alt="" />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Дата</label>
          <DatePicker
            id="date-picker"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setForm({ ...form, date: formatDate(date) });
            }}
            dateFormat="dd/MM/yyyy"
            placeholderText="Выберите дату"
            className={styles.custom_date_input} // Ваши стили
          />

          <label className={styles.label}>Тип операции</label>
          <select
            id="type"
            name="type"
            className={styles.select}
            value={form.type}
            onChange={handleChange}
          >
            <option value="Доход">Доход</option>
            <option value="Расход">Расход</option>
          </select>

          <label className={styles.label}>Источник</label>
          <select
            id="source"
            name="source"
            className={styles.select}
            value={form.source}
            onChange={handleChange}
          >
            <option value="Зарплата">Зарплата</option>
            <option value="Шоппинг">Шоппинг</option>
          </select>

          <label className={styles.label}>Описание</label>
          <textarea
            className={styles.textarea}
            id="description"
            name="description"
            placeholder="Введите описание операции"
            maxLength={250}
            value={form.description}
            onChange={handleChange}
          ></textarea>

          <label className={styles.label}>Сумма</label>
          <input
            className={styles.input}
            type="number"
            id="summ"
            name="summ"
            placeholder="Введите сумму"
            value={form.summ}
            onChange={handleChange}
          />

          <label className={styles.label}>Валюта</label>
          <select
            id="currency"
            name="currency"
            className={styles.select}
            value={form.currency}
            onChange={handleChange}
          >
            <option value="rub">Рубль</option>
            <option value="usd">Доллар</option>
          </select>
          <button type="submit" className={styles.button__submit}>
            Сохранить
          </button>
        </form>
      </Modal>
    </div>
  );
}
export default TransactionModal;
