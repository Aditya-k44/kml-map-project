import React from "react";

const KMLSummary = ({ summaryData }) => {
  return (
    <div className="summary-page">
      <h3>Element Type Summary</h3>
      <table>
        <thead>
          <tr>
            <th>Element Type</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(summaryData).map(([type, count]) => (
            <tr key={type}>
              <td>{type}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KMLSummary;
