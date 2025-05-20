// src/components/ExcelReader.js
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { db, collection, addDoc } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { Timestamp } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { getDocs, deleteDoc } from "firebase/firestore";
const parseDate = (value) => {
  if (!value) return new Date(); // fallback
  if (value instanceof Date) return value;
  if (typeof value === "number") {
    const { y, m, d } = XLSX.SSF.parse_date_code(value);
    return new Date(y, m - 1, d);
  }
  if (typeof value === "string") {
    const parts = value.split(/[./-]/);
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      return new Date(year, month - 1, day);
    }
  }
  return new Date(value);
};

function ExcelReader({ file }) {
  const [data, setData] = useState([]);
  const [user] = useAuthState(auth);

  const addTransaction = async (id, newTr) => {
    try {
      const ref = doc(db, "transactions", id);
      await setDoc(ref, newTr);
      console.log("✅ Добавлена транзакция с ID:", id);
    } catch (error) {
      console.error("Ошибка при добавлении:", error);
    }
  };

  const readExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const ab = e.target.result;
      const wb = XLSX.read(ab, { type: "array" });
      const sheetName = wb.SheetNames[0];
      const sheet = wb.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const formattedData = jsonData.map((row, i) => {
        const parsedDate = parseDate(row["ДАТА ОПЕРАЦИИ (МСК)"]);
        const timestamp = Timestamp.fromDate(parsedDate);
        const type =
          Number(row["СУММА В ВАЛЮТЕ СЧЁТА"]) < 0 ? "Расход" : "Доход";
        const source = row["КАТЕГОРИЯ"] || "Остальное";
        const description = row["Описание операции"] || "";
        const summ = Math.abs(Number(row["СУММА В ВАЛЮТЕ СЧЁТА"]));
        const currency = row["Валюта"] || "rub";
        const user_id = user?.uid;
        const id = row["Код авторизации"];
        console.log("ID: ", id);
        return {
          date: timestamp,
          type,
          source,
          description,
          summ,
          currency,
          user_id,
          id,
        };
      });

      setData(formattedData);

      for (const transaction of formattedData) {
        const { id, ...data } = transaction;
        await addTransaction(id, data);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    if (file && user) {
      readExcelFile(file);
    }
  }, [file, user]);

  return (
    <div>
      <h3>Импортированные данные:</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default ExcelReader;
