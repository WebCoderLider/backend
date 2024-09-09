const axios = require('axios');

// Function to send SMS with a static phone number
const sendVerificationCode = async (phone) => {
    // Generate a verification code
    const code = Math.floor(1000 + Math.random() * 8999);

    // Define request options
    const options = {
        method: 'POST',
        url: 'http://91.204.239.44/broker-api/send',
        headers: {
            'Authorization': 'Basic ' + Buffer.from('247time:Z6f597VcrPpD').toString('base64'),
            'Content-Type': 'application/json'
        },
        data: {
            "messages": [
                {
                    "recipient": "+" + phone.replace(/[^0-9]/g, ""),
                    "message-id": new Date().getTime().toString(),
                    "sms": {
                        "originator": "3700",
                        "content": {
                            "text": "salomlaa brother"
                        }
                    }
                }
            ]
        }
    };

    try {
        const response = await axios(options);
        console.log({ status: true, timestamp: new Date().getTime(), code });
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
};
const staticPhoneNumber = '+998900190829';
sendVerificationCode(staticPhoneNumber);
