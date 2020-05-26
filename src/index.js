import React, { useState } from "react";
import ReactDOM from "react-dom";
import ExcelRequestsImport from "./ExcelRequestsImport";
import ExcelExampleExport from "./ExcelExampleExport";

import "./styles.css";

const App = () => {
  const [data, setData] = useState([]);

  const createRequests = () => {
    console.log(data);
  };

  return (
    <div>
      <ExcelRequestsImport uploadHandler={setData} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
