const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'weatherdb'
});

const provinces = ['Central', 'Eastern', 'Northern', 'Southern', 'Western', 'North Western', 'North Central', 'Uva', 'Sabaragamuwa'];

const generateRandomData = () => {
    const temperature = (Math.random() * (35 - 20) + 20).toFixed(2);
    const humidity = (Math.random() * (100 - 60) + 60).toFixed(2);
    const airPressure = (Math.random() * (1020 - 1000) + 1000).toFixed(2);
    const province = provinces[Math.floor(Math.random() * provinces.length)]; // Randomly select a province

    const query = 'INSERT INTO weather (temperature, humidity, air_pressure, province) VALUES (?, ?, ?, ?)';
    connection.query(query, [temperature, humidity, airPressure, province], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
        } else {
            console.log('Weather data inserted successfully');
        }
    });
};

// Generate data every 5 minutes
setInterval(generateRandomData, 5 * 60 * 1000);

// Generate initial data immediately
generateRandomData();
