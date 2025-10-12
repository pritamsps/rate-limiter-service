const express = require('express');
const pool = require('./config/db');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to the User API!');
});

app.get('/api/users', async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const offset = (page - 1) * limit;

        const [countResult] = await pool.query('SELECT COUNT(*) as total FROM User_details');
        const totalUsers = countResult[0].total;
        const totalPages = Math.ceil(totalUsers / limit);

        const sql ='SELECT user_id, first_name, last_name, email, location_city FROM User_details ORDER BY first_name LIMIT ? OFFSET ?';
        const [rows] = await pool.query(sql, [limit, offset]);

        res.status(200).json({
            data: rows,
            pagination: {
                totalItems: totalUsers,
                totalPages: totalPages,
                currentPage: page,
                itemsPerPage: limit
            }
        });

    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
app.get('/api/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const sql = 'SELECT * FROM User_details WHERE user_id = ?';
        const [rows] = await pool.query(sql, [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(rows[0]);

    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.post('/api/users', async (req, res) => {
    try {
        const { first_name, last_name, email, location_city, user_id } = req.body;
        
        if (!first_name || !last_name || !email || !location_city || !user_id) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const sql = 'INSERT INTO User_details (first_name, last_name, email, location_city, user_id) VALUES (?, ?, ?, ?, ?)';
        await pool.query(sql, [first_name, last_name, email, location_city, user_id]);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.put('/api/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { first_name, last_name, email, location_city } = req.body;

        const sql = 'UPDATE User_details SET first_name = ?, last_name = ?, email = ?, location_city = ? WHERE user_id = ?';
        const [result] = await pool.query(sql, [first_name, last_name, email, location_city, userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.delete('/api/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const sql = 'DELETE FROM User_details WHERE user_id = ?';
        const [result] = await pool.query(sql, [userId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


const { v4: uuidv4 } = require('uuid'); 

app.post('/api/users', async (req, res) => {
    try {
        const { first_name, last_name, email, location_city } = req.body;
        const user_id = uuidv4(); // Generate a new UUID on the server

        if (!first_name || !last_name || !email || !location_city) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const sql = 'INSERT INTO User_details (first_name, last_name, email, location_city, user_id) VALUES (?, ?, ?, ?, ?)';
        await pool.query(sql, [first_name, last_name, email, location_city, user_id]);

        res.status(201).json({ user_id, first_name, last_name, email, location_city });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.delete('/api/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const sql = 'DELETE FROM User_details WHERE user_id = ?';
        const [result] = await pool.query(sql, [userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});