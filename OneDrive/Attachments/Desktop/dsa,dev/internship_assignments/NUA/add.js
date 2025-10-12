// seed.js

const axios = require('axios');
const pool = require('./config/db');

async function add_records() {
    try {
        console.log('Fetching user data from the API...');
        const response = await axios.get('https://randomuser.me/api/?results=1000&inc=name,email,location,login');

        const users = response.data.results;
        console.log(`Successfully fetched ${users.length} users.`);

        const formattedUsers = users.map(user => [

            user.name.first,
            user.name.last, 
            user.email,     
            user.location.city,
            user.login.uuid    
        ]);

        console.log('Inserting users into the database...');
        const sql = 'INSERT INTO User_details (first_name, last_name, email, location_city, user_id) VALUES ?';        
        const [result] = await pool.query(sql, [formattedUsers]);
        console.log(`Database seeded successfully! ${result.affectedRows} users were inserted into User_details.`);

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            console.error('Error: A duplicate entry was found. The API may have provided a duplicate email or user_id. Please try running the script again.');
        } else {
            console.error('An error occurred during the seeding process:', error.message);
        }
    } finally {
        await pool.end();
        console.log('Database connection closed.');
    }
}

add_records();