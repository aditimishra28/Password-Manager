document.addEventListener("DOMContentLoaded", () => {
  const qrcodeContainer = document.getElementById("qrcode");
  const messageContainer = document.getElementById("message");

  const UNIQUE_ID = "ID_" + Math.random().toString(36).slice(2, 10);

  const BASE_URL = "https://armacwan.pythonanywhere.com/"

  // Get the current tab's URL
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      try {
        const url = new URL(tabs[0].url); // Extract the URL
        const websiteName = url.hostname;

        // Display the message
        messageContainer.textContent = UNIQUE_ID;

        fetch(BASE_URL + "send_data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UID: UNIQUE_ID,
            SITE: websiteName,
          }),
        })
          .then((response) => response.text())
          .then((data) => {
            console.log(data);

            // Generate the QR code with the message
            const QR = new QRCode(qrcodeContainer, {
              text: `${UNIQUE_ID},${websiteName}`,
              width: 128,
              height: 128,
            });

            pollForCredentials(BASE_URL, UNIQUE_ID);

          })
          .catch((error) => {
            console.log(error);
          });

      } catch (error) {
        console.log("Error generating QR Code:", error);
      }
    }
  });
});


function pollForCredentials(BASE_URL, UID) {
  function checkCredentials() {
    fetch(`${BASE_URL}/get_data`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ UID: UID })
    })
      .then(response => response.text())
      .then(data => {
        // Skip if we get error messages
        if (data === "UID NOT FOUND" || data === "CREDS NOT FOUND") {
          return;
        }

        // If we got valid data, clear interval and handle response
        clearInterval(intervalId);
        console.log(data);
        // const credentials = JSON.parse(data);
      })
      .catch(error => console.error('Error:', error));
  }

  // Run immediately and then every 5 seconds
  checkCredentials();
  const intervalId = setInterval(checkCredentials, 5000);
}
