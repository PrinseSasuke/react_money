import React from "react";
import styles from "./Transaction.module.scss";
function Transaction({ date, type, source, description, summ, currency }) {
  const COLORS = {
    Доход: ["#CDFFCD", "#007F00"],
    Расход: ["#FFE0E0", "#D30000"],
  };
  const colors = COLORS[type];
  return (
    <tr>
      <td className={styles.date_td}>{date}</td>
      <td className={styles.details_td}>
        <span
          className={styles.table__status}
          style={{
            backgroundColor: colors[0],
          }}
        >
          <span
            className={styles.circle}
            style={{
              backgroundColor: colors[1],
            }}
          ></span>
          <span
            className={styles.table__status_text}
            style={{
              color: colors[1],
            }}
          >
            {type}
          </span>
        </span>
        <div className={styles.table__details_text}>
          <span>Получено от: </span>
          <span
            className={styles.source}
            style={{
              color: colors[1],
              backgroundColor: colors[0],
            }}
          >
            {source}
          </span>
        </div>
      </td>
      <td className={styles.desription_td}>
        <span>{description}</span>
      </td>
      <td>
        <div className={styles.table__amount}>
          <span className={styles.amount}>{summ}</span>
          <span className={styles.currency}>{currency}</span>
        </div>
      </td>
      <td className={styles.about}>
        <span>Подробнее</span>
      </td>
      <td className={styles.dots}>
        <img src="./img/more.svg" alt="" />
      </td>
    </tr>
  );
}
export default Transaction;
