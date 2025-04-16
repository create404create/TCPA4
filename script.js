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
        console.log("API Response Data:", data);

        document.getElementById("result").innerHTML = `
            <p><strong>Status:</strong> ${data.status || "Unknown"}</p>
            <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
            <p><strong>Blacklist:</strong> ${data.listed ?? "Not Available"}</p>
            <p><strong>Litigator:</strong> ${data.type ?? "Not Available"}</p>
            <p><strong>State:</strong> ${data.state || "Invalid"}</p>
            <p><strong>DNC National:</strong> ${data.hasOwnProperty("dnc_national") ? data.dnc_national : "Not Available"}</p>
            <p><strong>DNC State:</strong> ${data.hasOwnProperty("dnc_state") ? data.dnc_state : "Not Available"}</p>
        `;
    } catch (error) {
        console.error("API Error:", error);
        document.getElementById("result").innerHTML = "<p style='color: red;'>Error fetching data</p>";
    }
}
