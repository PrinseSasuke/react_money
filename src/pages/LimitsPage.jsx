import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, db, auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";

const LimitsPage = () => {
  const [userId, setUserId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [limit, setLimit] = useState(50000);
  const [editing, setEditing] = useState(false);
  const [newLimit, setNewLimit] = useState(limit.toString());
  const [currentExpenses, setCurrentExpenses] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      const q = query(
        collection(db, 'transactions'),
        where('user_id', '==', userId),
        where('type', '==', 'Расход')
      );

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => doc.data());
      setTransactions(data);
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (transactions.length === 0) return;

    const currentDate = new Date();
    const currentMonthStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

    let total = 0;

    transactions.forEach(tx => {
      const parsedDate = tx.date.toDate();
      const txMonth = `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, '0')}`;

      if (txMonth === currentMonthStr) {
        total += Number(tx.summ);
      }
    });

    setCurrentExpenses(total);
  }, [transactions]);

  const remaining = (limit - currentExpenses).toFixed(2);
  const isExceeded = currentExpenses > limit;

  const handleSave = () => {
    const parsedLimit = Number(newLimit);
    if (!isNaN(parsedLimit)) {
      setLimit(parsedLimit);
    }
    setEditing(false);
  };

  return (
    <div className="container-limit" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Контроль лимита расходов</h2>

      {!editing ? (
        <div style={{ marginBottom: '20px' }} className='limit-c'>
          <p>Лимит расходов на месяц: <strong>{limit} ₽</strong></p>
          <button
            onClick={() => { setEditing(true); setNewLimit(limit.toString()); }}
            style={{ padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
          >
            Редактировать лимит
          </button>
        </div>
      ) : (
        <div>
          <label>Введите новый лимит: </label>
          <input
            type="number"
            value={newLimit}
            onChange={(e) => setNewLimit(e.target.value)}
            style={{ padding: '8px', marginRight: '10px', borderRadius: '8px' }}
          />
          <button onClick={handleSave} style={{ padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
            Сохранить
          </button>
        </div>
      )}

      <div style={{ textAlign: 'center', fontSize: '16px' }}>
        <p>Потрачено в текущем месяце: <strong>{currentExpenses} ₽</strong></p>
        <p>Осталось до лимита: <strong>{remaining} ₽</strong></p>
        {isExceeded && <p style={{ color: 'red', fontWeight: 'bold' }}>⚠ Лимит расходов превышен!</p>}
      </div>
    </div>
  );
};

export default LimitsPage;
