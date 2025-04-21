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
      document.getElementById("result").innerHTML = `
        <p><strong>Status:</strong> ${data.status}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Blacklist:</strong> ${data.listed}</p>
        <p><strong>Litigator:</strong> ${data.type}</p>
        <p><strong>State:</strong> ${data.state}</p>
        <p><strong>DNC National:</strong> ${data.ndnc === true ? "Yes" : "No"}</p>
        <p><strong>DNC State:</strong> ${data.sdnc === true ? "Yes" : "No"}</p>
      `;
    })
    .catch(error => {
      console.error("API Error:", error);
      document.getElementById("result").innerHTML = "<p style='color:red;'>Error fetching data</p>";
    });
}

function copyResult() {
  const resultBox = document.getElementById("result");
  if (resultBox.innerText.trim() === "") {
    alert("No result to copy!");
    return;
  }

  const temp = document.createElement("textarea");
  temp.value = resultBox.innerText;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
  alert("Result copied to clipboard!");
}
