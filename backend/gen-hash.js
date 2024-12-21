const bcrypt = require('bcrypt');

const originalPassword = 'adminganteng'; // Password yang ingin diuji

const testBcrypt = async () => {
    try {
        // Generate hash dari password
        const generatedHash = await bcrypt.hash(originalPassword, 10);
        console.log('Generated Hash:', generatedHash);

        // Coba bandingkan kembali dengan password asli
        const isMatch = await bcrypt.compare(originalPassword, generatedHash);
        console.log('Password Match:', isMatch ? '✅ Password matches' : '❌ Password does not match');
    } catch (err) {
        console.error('Error:', err.message);
    }
};

testBcrypt();
