const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'weatherdb'
});

exports.getWeatherData = (req, res) => {
    const query = 'SELECT * FROM weather ORDER BY timestamp DESC LIMIT 1';
    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json(result);
        }
    });
};


exports.getWeatherByProvince = (req, res) => {
    const { province } = req.params;
    const query = 'SELECT * FROM weather WHERE province = ? ORDER BY timestamp DESC LIMIT 1';
    connection.query(query, [province], (err, result) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json(result[0] || { message: 'No data found for this province' });
        }
    });
};


exports.getHistoricalData = (req, res) => {
    const query = 'SELECT * FROM weather';
    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json(result);
        }
    });
};
