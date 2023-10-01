import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "../css/table.css";

const Tabla = ({ datos }) => {
  const [rows, setRows] = useState(datos);

  useEffect(() => {
    setRows(datos);
  }, [datos]);

  const handleCellEdit = (e, rowIndex, colIndex) => {
    const updatedRows = rows.map((row, i) => {
      if (i === rowIndex) {
        return { ...row, [Object.keys(row)[colIndex]]: e.target.value };
      }
      return row;
    });

    setRows(updatedRows);
  };

  const renderizarTabla = () => {
    const columns = obtenerColumnas();

    return (
      <>
        <button className="boton" onClick={() => exportarCSV()}>
          Exportar a CSV
        </button>
        <div className="tabla-container">
          <table className="tabla">
            <thead>
              <tr className="fila-superior">
                {columns.map((key) => (
                  <th key={key} className="celdaCabecera">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((key, colIndex) => (
                    <td key={key} className="celda">
                      <input
                        type="text"
                        value={formatCellContent(row[key])}
                        onChange={(e) => handleCellEdit(e, rowIndex, colIndex)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const exportarCSV = () => {
    const csvData = Papa.unparse(rows, {
      delimiter: ";",
    });

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "datos.csv");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const obtenerColumnas = () => {
    if (rows.length === 0) return [];

    return Object.keys(rows[0]);
  };

  const formatCellContent = (content) => {
    return typeof content === "object"
      ? JSON.stringify(content)
          .replace(/['"{}]/g, "")
          .replace(/,/g, ", ")
      : content;
  };

  return renderizarTabla();
};

export default Tabla;
