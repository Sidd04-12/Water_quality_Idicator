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
        // Redirect to the '/result' page with the prediction message as a URL parameter
        window.location.href = '/result?prediction=' + result.prediction;
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.textContent = 'An error occurred. Please try again later.';
      });
  });
});
