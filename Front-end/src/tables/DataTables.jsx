/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";

function WriteTable({ titles, data }) {
  const tableRef = useRef(null);

  useEffect(() => {
    // Verifica si el DataTable ya está inicializado
    if (!$.fn.DataTable.isDataTable("#TableDinamic")) {
      let table = new DataTable("#TableDinamic", {
        responsive: true,
        lengthChange: false,
        pageLength: 10,
        columnDefs: [
          {
            targets: -1,
            className: "dt-body-center",
          },
        ],
        language: {
          search: "_INPUT_",
          searchPlaceholder: "Buscar...",
          zeroRecords: "No se encontraron resultados",
          info: "Mostrando página _PAGE_ de _PAGES_ paginas",
          infoEmpty: "No hay registros disponibles",
          infoFiltered: "(Filtrado de _MAX_ registros totales)",
        },
        drawCallback: () => {
          $("#TableDinamic td, #TableDinamic th").css({
            "text-align": "center",
            "vertical-align": "middle",
          });
          $(".dt-layout-cell").removeClass("dt-layout-end");
        },
      });
    }
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto container ">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="overflow-x-auto shadow-md rounded-xl bg-clip-border p-5 border-2 bg-white">
              <table
                className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table table-responsive border-black "
                id="TableDinamic"
                ref={tableRef}
              >
                <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border border-slate-100">
                  <tr>
                    {titles.map((title, index) => (
                      <th scope="col" key={index}>
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {data.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      {/* Mapeo de celdas (todas excepto la última) */}
                      {row.slice(0, -1).map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}

                      {/* Última celda: podría contener botones */}
                      <td className="py-2 px-4 flex justify-center">
                        {Array.isArray(row[row.length - 1]) ? (
                          row[row.length - 1].map((button, buttonIndex) => (
                            <span key={buttonIndex}>{button}</span>
                          ))
                        ) : (
                          <span>Sin acceso a acciones</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-buttons hidden"></div>
    </>
  );
}
export default WriteTable;
