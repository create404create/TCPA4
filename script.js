async function checkStatus() {
    const phone = document.getElementById("phoneNumber").value.trim();
    if (!phone) {
        alert("Please enter a valid USA number");
        return;
    }

    const apiUrl = `https://tcpa.api.uspeoplesearch.net/tcpa/v1?x=${phone}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log("API Response:", data); // Debugging ke liye

        // Show response on the website
        document.getElementById("result").innerHTML = `
            <strong>Status:</strong> ${data.status || "Unknown"} <br>
            <strong>Phone:</strong> ${data.phone || "N/A"} <br>
            <strong>Blacklist:</strong> ${data.listed || "Not Available"} <br>
            <strong>Litigator:</strong> ${data.type || "Not Available"} <br>
            <strong>State:</strong> ${data.state || "Invalid"} <br>
            <strong>DNC National:</strong> ${data.ndnc || "Not Available"} <br>
            <strong>DNC State:</strong> ${data.sdnc || "Not Available"} <br>
        `;
    } catch (error) {
        console.error("API Error:", error);
        document.getElementById("result").innerHTML = "<p style='color: red;'>Error fetching data</p>";
    }
}
