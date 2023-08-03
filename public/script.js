// script.js

document.addEventListener('DOMContentLoaded', function () {
    const waterQualityForm = document.getElementById('waterQualityForm');
    const resultDiv = document.getElementById('result');
  
    waterQualityForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const formData = new FormData(waterQualityForm);
  
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
  
      fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(result => {
        const prediction = result.prediction;
        const message = prediction === 1 ? 'The water is potable.' : 'The water is not potable.';
        resultDiv.textContent = message;
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.textContent = 'An error occurred. Please try again later.';
      });
    });
  });
  