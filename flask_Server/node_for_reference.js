const axios = require('axios');

async function getPrediction() {
    try {
        const response = await axios.get('http://localhost:5000/predict', {
            params: { states: [1.2, 3.4, 5.6] }  // Example input
        });
        console.log("Prediction:", response.data.prediction);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}

getPrediction();
