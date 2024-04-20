import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment'; // Potrzebne do formatowania dat
import { Card } from 'react-bootstrap';

const Throughput = () => {
    const [data, setData] = useState([]);

    function generateTicks(data) {
        const maxValue = Math.max(...data.map(item => item.count));
        const minValue = Math.min(...data.map(item => item.count));
        const ticks = [];
        for (let i = minValue; i <= maxValue; i++) {
          ticks.push(i);
        }
        return ticks;
      }

      useEffect(() => {
        const fetchData = async () => {
            // Obliczanie daty początkowej i końcowej bieżącego tygodnia
            const startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
            const endOfWeek = moment().endOf('week').format('YYYY-MM-DD');
    
            try {
                // Uaktualnienie URL, aby zawierał dynamiczne daty początku i końca tygodnia
                const response = await axios.get(`/api/throughput/?start_date=${startOfWeek}&end_date=${endOfWeek}`);
                const formattedData = response.data.map(item => {
                    // Formatowanie daty
                    const date = moment(item.date).format('MM/DD');
                    // Konwersja count z sekund na godziny lub minuty
                    let countFormatted;
                    if(item.count >= 3600) { // Powyżej godziny
                        countFormatted = `${(item.count / 3600).toFixed(2)}h`;
                    } else { // Poniżej godziny, wyświetl w minutach
                        countFormatted = `${Math.round(item.count / 60)}m`;
                    }
    
                    return {
                        ...item,
                        date,
                        countFormatted, // Dodajemy przekonwertowaną wartość
                        originalCount: item.count // Zachowujemy oryginalną wartość dla tooltip i dalszej logiki
                    };
                });
                setData(formattedData);
            } catch (error) {
                console.error("Error fetching throughput data:", error);
            }
        };
        fetchData();
    }, []);
    
    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>Throughput</Card.Title>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart 
                      data={data}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis tickFormatter={tick => Math.round(tick)} ticks={generateTicks(data)} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" name="Completed Tasks" />
                    </BarChart>
                </ResponsiveContainer>
            </Card.Body>
        </Card>
    );
};
export default Throughput;