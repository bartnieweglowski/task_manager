import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


const LeadTimeChart = () => {
    const [leadTimeData, setLeadTimeData] = useState({
        labels: [],
        datasets: []
      });

      useEffect(() => {
        axios.get('/api/average-lead-time/?start_date=2024-01-01&end_date=2024-04-30')
          .then(response => {
            const averageLeadTime = response.data.average_lead_time;
            if (averageLeadTime !== undefined) { // Sprawdź, czy dane są dostępne
              setLeadTimeData({
                labels: ['Średni Lead Time'],
                datasets: [{
                  label: 'Średni Lead Time (w godzinach)',
                  data: [averageLeadTime / 3600], // Konwersja na godziny
                  backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                  borderColor: ['rgba(54, 162, 235, 1)'],
                  borderWidth: 1,
                }],
              });
            }
          })
          .catch(error => console.error("Error fetching average lead time:", error));
      }, []);

    return (
        <div>
            <h2>Średni Czas Rozwiązania Zadania</h2>
            <Bar data={leadTimeData} options={{ scales: { y: { ticks: { beginAtZero: true } } } }} />

        </div>
    );
};

export default LeadTimeChart;
