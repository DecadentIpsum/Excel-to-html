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
    let dataExcel;
    if (typeof this.state.rows[1] !== "undefined") {
      dataExcel = this.state.rows[1];
    } else {
      dataExcel = {
        1: "Γεώργιε, ξέχασες να ανεβάσεις κάποιο αρχείο!",
      };
    }

    function findOption(option) {
      if (option === "" || option === "Not found") {
        return `<span></span>`;
      } else {
        return `<li>${option}</li>`;
      }
    }

    let description;
    if (typeof this.state.rows[1] !== "undefined") {
      description = `<p>${dataExcel["40"]}</p><ul>
      ${findOption(dataExcel["42"])}
      ${findOption(dataExcel["43"])}
      ${findOption(dataExcel["44"])}
      ${findOption(dataExcel["45"])}
      ${findOption(dataExcel["46"])}
      ${findOption(dataExcel["47"])}
      ${findOption(dataExcel["48"])}
      ${findOption(dataExcel["49"])}
      ${findOption(dataExcel["51"])}
      ${findOption(dataExcel["52"])}
      ${findOption(dataExcel["53"])}
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
