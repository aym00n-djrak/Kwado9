import axios from 'axios';

const WHATSAPP_API_URL = 'https://api.whatsapp.com/v1/';
const TOKEN = 'your_token';

async function sendMessage(to, text) {
    try {
        const response = await axios.post(`${WHATSAPP_API_URL}messages`, {
            to,
            text
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        console.log('Message sent successfully');
    } catch (error) {
        console.error('Error sending message: ', error);
    }
}

// Envoyer un message à un numéro de téléphone spécifié
sendMessage('whatsapp:+1234567890', 'Hello');