
const input = document.querySelector("#city");

const header = document.querySelector(".card .header");
const content = document.querySelector(".card .content .content-right");
const emptyMessage = document.querySelector(".empty-message");

const getWeather = async () => {

    console.log("API call");
    header.style.display = "none";
    document.querySelector(".content").style.display = "none";
    emptyMessage.style.display = "block";

    emptyMessage.textContent = "Loading...";
    if (input.value === "") {
        alert("Please enter a city name");
        return;
    }
    try {
        const api = `https://api.weatherapi.com/v1/current.json?key=980f18311d2448dfb6c55437252403&q=${input.value}&aqi=no`
        const response = await fetch(api);
        const data = await response.json();
        header.childNodes[1].textContent = data.current.condition.text;
        header.childNodes[3].src = `https:${data.current.condition.icon}`;
        content.childNodes[1].textContent = ": " + data.location.name;
        content.childNodes[3].textContent = ": " + (data.location.region || "N/A") + ", " + data.location.country;
        content.childNodes[5].textContent = ": " + data.current.temp_c + "°C";
        content.childNodes[7].textContent = ": " + data.current.wind_kph + " km/h";
        content.childNodes[9].textContent = ": " + data.current.humidity + "%";
        header.style.display = "flex";
        document.querySelector(".content").style.display = "flex";
        emptyMessage.style.display = "none";
    } catch (error) {
        console.log(error);
        alert("City not found");
        header.style.display = "none";
        document.querySelector(".content").style.display = "none";
        emptyMessage.style.display = "block";
        emptyMessage.textContent = "Enter a city name to get the weather";
        return;
    }
}

