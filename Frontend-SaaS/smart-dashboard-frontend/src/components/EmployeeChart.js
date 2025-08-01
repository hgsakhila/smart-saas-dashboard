import React from "react";
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

function EmployeeChart({ data }) {
  // Safety check for data
  if (!Array.isArray(data)) {
    return <p>Loading or invalid chart data...</p>;
  }

  const chartData = data.map(item => ({
    month: item.month,
    count: item.count,
  }));

  return (
    <div style={{ height: 300 }}>
      <h4>Employees Per Month</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EmployeeChart;
