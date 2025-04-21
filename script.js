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
      const resultBox = document.getElementById("result");
      resultBox.innerText = `
Status: ${data.status}
Phone: ${data.phone}
Blacklist: ${data.listed}
Litigator: ${data.type}
State: ${data.state}
DNC National: ${data.ndnc}
DNC State: ${data.sdnc}
      `.trim();

      document.getElementById("copyBtn").style.display = "inline-block";
      document.getElementById("pdfBtn").style.display = "inline-block";
    })
    .catch(error => {
      console.error("API Error:", error);
      document.getElementById("result").innerHTML = "<p style='color:red;'>Error fetching data</p>";
      document.getElementById("copyBtn").style.display = "none";
      document.getElementById("pdfBtn").style.display = "none";
    });
}

function copyResult() {
  const resultText = document.getElementById("result").innerText;
  navigator.clipboard.writeText(resultText).then(() => {
    alert("Result copied to clipboard!");
  });
}

function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const resultText = document.getElementById("result").innerText;
  doc.text(resultText, 10, 10);
  doc.save("phone-result.pdf");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
