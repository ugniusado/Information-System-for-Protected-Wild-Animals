const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const animalKeywords = [
    'animal',
    'species',
    'wildlife',
    'gyvunas',
    'gyvunai',
    // Add more animal-related keywords as needed
];

function isAnimalRelated(text) {
    const lowerText = text.toLowerCase();
    return animalKeywords.some(keyword => lowerText.includes(keyword));
}

app.post('/api/gpt3', async (req, res) => {
    const inputText = req.body.text;
    const openaiApiKey = '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';

    if (!isAnimalRelated(inputText)) {
        return res.json({
            output: "Sorry, I am programmed to answer questions about animals only.",
        });
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-002/completions', {
            prompt: inputText,
            max_tokens: 100,
            n: 1,
            stop: null,
            temperature: 1,
        }, {
            headers: {
                'Authorization': `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json',
            },
        });

        res.json({ output: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error('Error:', error.response.data); // Log error details
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
