import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from 'react-bootstrap';

const TimeSpentOnTasksChart = () => {
    const [timeData, setTimeData] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8000/api/time-spent-on-tasks/')
          .then(response => {
              const formattedData = response.data.map(item => ({
                  name: item.title,
                  value: item.total_time_spent // Zachowujemy czas w sekundach do obliczeń
              }));
              setTimeData(formattedData);
          })
          .catch(error => console.error("Error fetching time spent on tasks data:", error));
  }, []);

    // Generowanie kolorów dla segmentów wykresu
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#660099'];

    const formatTimeSpent = (timeSpent) => {
      if (timeSpent >= 3600) {
          return `${(timeSpent / 3600).toFixed(2)}h`;
      } else {
          return `${Math.round(timeSpent / 60)}m`;
      }
  };

  return (
    <Card className="mb-3">
        <Card.Body>
            <Card.Title>Time Spent on Tasks</Card.Title>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        dataKey="value"
                        data={timeData}
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={false}
                    >
                        {timeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatTimeSpent(value)} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Card.Body>
    </Card>
);
};

export default TimeSpentOnTasksChart;

