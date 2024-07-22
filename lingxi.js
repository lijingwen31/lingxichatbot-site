const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const intentName = req.body.queryResult.intent.displayName;

    let responseText = 'Sorry, I didn\'t get that. Could you say it again?';

    if (intentName === 'Feeling Down Intent') {
        const emotion = req.body.queryResult.parameters['Emotion'];
        responseText = `I understand you're feeling ${emotion}. Can you tell me more about what's making you feel this way?`;
    } else if (intentName === 'Greeting Intent') {
        responseText = 'Hello! How can I assist you today?';
    }

    res.json({
        fulfillmentText: responseText
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

