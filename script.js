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
        const responses = await Promise.all([
            fetch(`https://api.uspeoplesearch.net/tcpa/v1?x=${phoneNumber}`).then(res => res.json()),
            fetch(`https://api.uspeoplesearch.net/tcpa/report?x=${phoneNumber}`).then(res => res.json())
        ]);
        
        const data1 = responses[0];
        const data2 = responses[1];
        
        if (data1.status === "ok" && data2.status === "ok") {
            output.textContent = `✅ Phone Number: ${data1.phone}\nState: ${data1.state}\nNDNC: ${data1.ndnc}\nSDNC: ${data1.sdnc}\n\n🔹 Report: ${data2.listed ? "Listed" : "Not Listed"}`;
        } else {
            output.textContent = "⚠️ Unable to fetch complete DNC status. Please try again later.";
        }
    } catch (error) {
        output.textContent = "❌ Error fetching data. Check your connection and try again.";
    }
}

function isValidPhoneNumber(number) {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(number);
}
