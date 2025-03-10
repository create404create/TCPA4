function checkDNCStatus() {
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
    
    setTimeout(() => {
        const status = getRandomStatus();
        output.textContent = `✅ Phone Number: ${phoneNumber}\nStatus: ${status}`;
    }, 2000);
}

function isValidPhoneNumber(number) {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(number);
}

function getRandomStatus() {
    const statuses = ["Not in DNC List", "In DNC List", "Pending Verification"];
    return statuses[Math.floor(Math.random() * statuses.length)];
}
