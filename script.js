async function checkDNCStatus() {
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const output = document.getElementById("output");
    const resultDiv = document.getElementById("result");

    if (!isValidPhoneNumber(phoneNumber)) {
        output.textContent = "❌ Invalid phone number format. Please enter a valid number.";
        resultDiv.style.display = "block";
        return;
    }

    output.textContent = "⏳ Checking...";
    resultDiv.style.display = "block";
    
    try {
        const response = await fetch(`https://api.uspeoplesearch.net/tcpa/v1?x=${phoneNumber}`);
        const data = await response.json();
        
        if (data.status === "ok") {
            output.textContent = `✅ Phone Number: ${data.phone}\nState: ${data.state}\nNDNC: ${data.ndnc}\nSDNC: ${data.sdnc}`;
        } else {
            output.textContent = "⚠️ Unable to fetch DNC status. Please try again later.";
        }
    } catch (error) {
        output.textContent = "❌ Error fetching data. Check your connection and try again.";
    }
}

function isValidPhoneNumber(number) {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(number);
}
