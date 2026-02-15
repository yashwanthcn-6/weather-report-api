function getWeather() {
    const location = document.getElementById("locationInput").value;

    if (location === "") {
        alert("Please enter a location")
        return;
    }

    // Show loading and disable inputs
    document.getElementById("loading").style.display = "block";
    document.getElementById("locationInput").disabled = true;
    document.querySelector("button").disabled = true;

    const apiKey = "0c681a6620684a54976160057261701";
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const placeEl = document.getElementById("place");
            const tempEl = document.getElementById("temp");
            const condEl = document.getElementById("condition");
            const airEl = document.getElementById("airQuality");

            // Make sure elements are visible
            placeEl.style.display = "block";
            tempEl.style.display = "block";
            condEl.style.display = "block";
            airEl.style.display = "block";

            // Hide elements for animation
            placeEl.style.opacity = 0;
            placeEl.style.transform = "translateY(20px)";
            tempEl.style.opacity = 0;
            tempEl.style.transform = "translateY(20px)";
            condEl.style.opacity = 0;
            condEl.style.transform = "translateY(20px)";
            airEl.style.opacity = 0;
            airEl.style.transform = "translateY(20px)";

            // Set the text
            placeEl.innerText = "Place: " + data.location.name + ", " + data.location.country;
            tempEl.innerText = "Temperature: " + data.current.temp_c + " °C";
            condEl.innerText = "Condition: " + data.current.condition.text;
            airEl.innerText = "Country: " + data.location.country + ", Region: " + data.location.region;

            // Trigger animation
            setTimeout(() => {
                placeEl.style.opacity = 1;
                placeEl.style.transform = "translateY(0)";
                setTimeout(() => {
                    tempEl.style.opacity = 1;
                    tempEl.style.transform = "translateY(0)";
                    setTimeout(() => {
                        condEl.style.opacity = 1;
                        condEl.style.transform = "translateY(0)";
                        setTimeout(() => {
                            airEl.style.opacity = 1;
                            airEl.style.transform = "translateY(0)";
                            // Show back button after results are displayed
                            setTimeout(() => {
                                document.getElementById("backBtn").style.display = "block";
                            }, 200);
                        }, 100);
                    }, 100);
                }, 100);
            }, 100);

            // Hide loading and enable inputs
            document.getElementById("loading").style.display = "none";
            document.getElementById("locationInput").disabled = false;
            document.querySelector("button").disabled = false;
        })
        .catch(error => {
            alert("Location not found!");
            console.log(error);

            // Hide loading and enable inputs
            document.getElementById("loading").style.display = "none";
            document.getElementById("locationInput").disabled = false;
            document.querySelector("button").disabled = false;
        });
}

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById("time").innerText = "Current Time: " + timeString;
}

// Update time every second
setInterval(updateTime, 1000);

// Update time on page load
updateTime();

function goBack() {
    // Hide weather results
    document.getElementById("place").style.display = "none";
    document.getElementById("temp").style.display = "none";
    document.getElementById("condition").style.display = "none";
    document.getElementById("airQuality").style.display = "none";
    // Hide back button
    document.getElementById("backBtn").style.display = "none";
    // Clear the input
    document.getElementById("locationInput").value = "";
}
