import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchDataComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/categories');
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    return (
        <div>
            <h2>Course Categories</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}