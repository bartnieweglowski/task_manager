// TotalCards.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalCards = () => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        axios.get('/api/total-cards-count/')
            .then(response => {
                setTotal(response.data.total);
            })
            .catch(error => console.error("Error fetching total cards:", error));
    }, []);

    return (
        <div className="total-cards">
            <h3>Total Cards</h3>
            <p>{total}</p>
        </div>
    );
};

export default TotalCards;
