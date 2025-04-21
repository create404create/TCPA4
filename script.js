function checkStatus() {
  const phone = document.getElementById("phoneNumber").value.trim();
  if (!phone) {
    alert("Please enter a phone number");
    return;
  }

  const apiUrl = `https://tcpa.api.uspeoplesearch.net/tcpa/v1?x=${phone}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      console.log("Full API Response:", data); // Debugging

      document.getElementById("result").innerHTML = `
        <p><strong>Status:</strong> ${data.status}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Blacklist:</strong> ${data.listed}</p>
        <p><strong>Litigator:</strong> ${data.type}</p>
        <p><strong>State:</strong> ${data.state}</p>
        <p><strong>DNC National:</strong> ${data.ndnc}</p>
        <p><strong>DNC State:</strong> ${data.sdnc}</p>
      `;
    })
    .catch(error => {
      console.error("API Error:", error);
      document.getElementById("result").innerHTML = "<p style='color:red;'>Error fetching data</p>";
    });
}
