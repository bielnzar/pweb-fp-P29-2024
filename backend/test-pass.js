const bcrypt = require('bcrypt');

// Hash password dari database
const hashedPassword = '$2b$10$kfP8O2XB3/hrj1ZgI6Q8N.oOuGqedy5pkvcOXhYqEPY56OEuRCyYe';

// Password yang ingin Anda tes
const inputPassword = 'adminganteng';

// Fungsi untuk mencocokkan password
const testPassword = async (inputPassword, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
        console.log('Input Password:', inputPassword);
        console.log('Stored Hash:', hashedPassword);
        console.log('Password Match:', isMatch ? '✅ Password matches' : '❌ Password does not match');
    } catch (err) {
        console.error('Error during password comparison:', err.message);
    }
};

// Jalankan tes
testPassword(inputPassword, hashedPassword);
