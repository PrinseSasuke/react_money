// src/pages/Excel
import React, { useState } from "react";
import FileUpload from "../components/FileUpload/FileUpload";
import ExcelReader from "../components/FileUpload/ExcelReader";

function Excel() {
  const [excelFile, setExcelFile] = useState(null);

  return (
    <div>
      <h1>Загрузка и анализ Excel</h1>
      <FileUpload onFileSelect={setExcelFile} />
      {excelFile && <ExcelReader file={excelFile} />}
    </div>
  );
}

export default Excel;
