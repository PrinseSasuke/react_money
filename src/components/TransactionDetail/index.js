import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import styles from "./TransactionDetail.module.scss";

function TransactionDetail() {
  const { id } = useParams(); // Получаем id транзакции из URL
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const docRef = doc(db, "transactions", id); // Получаем документ по id
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTransaction(docSnap.data()); // Устанавливаем данные транзакции
        } else {
        }
      } catch (error) {}
    };
    fetchTransaction();
  }, [id]);

  if (!transaction) {
    return <div className={styles.loading}>Загрузка...</div>; // Пока данные не загружены, показываем индикатор
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Детали транзакции № {id}</h2>
      <div className={styles.details}>
        <p className={styles.label}>Тип:</p>
        <p>{transaction.type}</p>
      </div>
      <div className={styles.details}>
        <p className={styles.label}>Источник:</p>
        <p>{transaction.source}</p>
      </div>
      <div className={styles.details}>
        <p className={styles.label}>Описание:</p>
        <p>{transaction.description}</p>
      </div>
      <div className={styles.details}>
        <p className={styles.label}>Сумма:</p>
        <p>{transaction.summ}</p>
      </div>
      <div className={styles.details}>
        <p className={styles.label}>Валюта:</p>
        <p>{transaction.currency}</p>
      </div>
      <div className={styles.details}>
        <p className={styles.label}>Дата:</p>
        <p>{new Date(transaction.date.seconds * 1000).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default TransactionDetail;
