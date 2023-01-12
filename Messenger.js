import axios from 'axios';

const MESSENGER_API_URL = 'https://graph.facebook.com/vX.X/';
const ACCESS_TOKEN = '7cc6fab4df33239334bb9523c268e9da';

async function sendMessage(recipientId, message) {
    try {
        const response = await axios.post(`${MESSENGER_API_URL}me/messages`, {
            recipient: {
                id: recipientId
            },
            message: {
                text: message
            }
        }, {
            params: {
                access_token: ACCESS_TOKEN
            }
        });
        console.log('Message sent successfully');
    } catch (error) {
        console.error('Error sending message: ', error);
    }
}

// Envoyer un message à un utilisateur Facebook spécifié
sendMessage('user_id', 'Hello');
