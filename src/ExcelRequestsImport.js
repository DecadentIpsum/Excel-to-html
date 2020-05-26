import React from "react";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import ExcelExampleExport from "./ExcelExampleExport";

class ExcelRequestsImport extends React.Component {
  state = {
    cols: [],
    rows: [],
  };

  uploadFile = (event) => {
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        const { cols, rows } = resp;
        this.setState(
          {
            cols: cols,
            rows: rows,
          },
          () => {
            const data = [...rows];
            data.shift();
            this.props.uploadHandler(data);
          }
        );
      }
    });
  };

  render() {
    console.log(this.state.rows);
    let dataExcel;
    if (typeof this.state.rows[1] !== "undefined") {
      dataExcel = this.state.rows[1];
    } else {
      dataExcel = {
        1: "zaralis",
        40: "",
      };
    }

    let description;
    if (typeof this.state.rows[1] !== "undefined") {
      description = `<p>${dataExcel["40"]}</p><ul>
      <li>${dataExcel["42"]}</li>
      <li>${dataExcel["43"]}</li>
      <li>${dataExcel["44"]}</li>
      <li>${dataExcel["45"]}</li>
      <li>${dataExcel["46"]}</li>
      <li>${dataExcel["47"]}</li>
      <li>${dataExcel["48"]}</li>
      <li>${dataExcel["49"]}</li>
      <li>${dataExcel["50"]}</li>
      <li>${dataExcel["51"]}</li>
      <li>${dataExcel["52"]}</li>
      <li>${dataExcel["53"]}</li>
      </ul>`;
    } else {
      description = "";
    }

    const worksheets = [
      {
        name: "Requests",
        columns: [
          { label: "SKU", value: "sku" },
          { label: "Description", value: "description" },
        ],
        data: [
          {
            sku: dataExcel["1"],
            description: description,
          },
        ],
      },
    ];
    return (
      <>
        <ExcelExampleExport filename="requests.xlsx" worksheets={worksheets} />
        <div className="excel-import-container">
          <div className="file-upload">
            <label>Upload File</label>
            <input type="file" onChange={this.uploadFile} />
            <button>+</button>
          </div>
          <div className="excel-table-wrapper">
            <OutTable
              data={this.state.rows}
              columns={this.state.cols}
              tableClassName="excel-table"
            />
          </div>
        </div>
      </>
    );
  }
}

export default ExcelRequestsImport;
