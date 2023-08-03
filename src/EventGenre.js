import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const colors = ['#FFA500', '#33A9AC', '#73BE6E', '#FFB94E', '#FFC107'];
const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];

const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);
    useEffect(() => { 
        setData(() => getData(events)); 
    }, [events]);

    const getData = (events) => {
        const data = genres.map((genre) => {
            const value = events.filter(({ summary }) => summary.includes(genre)).length;
            return { name: genre, value };
        });
        return data.filter((entry) => entry.value > 0);
    }
    
    return (
        <ResponsiveContainer height={400}>
            <PieChart key={data} width={400} height={400}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index]} />
                        ))
                    }
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}
export default EventGenre;