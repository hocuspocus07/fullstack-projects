const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
const daysContainer = document.getElementById("days");
const datesContainer = document.getElementById("dates");
const calendermonth = document.getElementById("calender");
const yearselect = document.getElementById("year-selector");
const timeselectdiv = document.getElementById('time-select');
const today = new Date();
const todayDate = today.getDate();
yearselect.value = today.getFullYear();
calendermonth.value = today.getMonth();

daysOfWeek.forEach(day => {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;
    daysContainer.appendChild(dayElement);
});

function generateCalendar(year, month) {
    datesContainer.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement("div");
        datesContainer.appendChild(emptyDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateDiv = document.createElement("div");
        dateDiv.textContent = day;
        dateDiv.className = "h-8 w-full p-2 hover:bg-blue-900 hover:text-white cursor-pointer";
        if (day === todayDate) {
            dateDiv.classList.add("bg-blue-700", "text-white");
        }
        datesContainer.appendChild(dateDiv);
    }
}

generateCalendar(today.getFullYear(), today.getMonth());

calendermonth.addEventListener('change', () => {
    const valuemonth = calendermonth.value;
    const valueyear = yearselect.value;
    generateCalendar(valueyear, valuemonth)
});
yearselect.addEventListener('change', () => {
    const valuemonth = calendermonth.value;
    const valueyear = yearselect.value;
    generateCalendar(valueyear, valuemonth)
});

function updateClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    timeselectdiv.value = timeString;

    const secondHandAngle = (seconds / 60) * 360;
    const minuteHandAngle = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourHandAngle = (hours % 12) / 12 * 360 + (minutes / 60) * 30;

    document.getElementById('second').style.transform = `translate(-50%, -100%) rotate(${secondHandAngle}deg)`;
    document.getElementById('minute').style.transform = `translate(-50%, -100%) rotate(${minuteHandAngle}deg)`;
    document.getElementById('hour').style.transform = `translate(-50%, -100%) rotate(${hourHandAngle}deg)`;
}

const clock = document.getElementById("clock");

function addHours() {
    const clockDiameter = clock.offsetWidth;
    const clockRadius = clockDiameter / 2;
    const remSize = clockDiameter / 16;
    const markerRadius = clockRadius / remSize - 0.5;

    for (let i = 0; i < 12; i++) {
        const marker = document.createElement("div");
        marker.className = "absolute bg-[#54A8A9] border-2 border-white";

        marker.style.width = "0.5rem";
        marker.style.height = "0.5rem";
        marker.style.borderRadius = "2px";

        const angle = (i * 30) * (Math.PI / 180);

        const x = (markerRadius * Math.cos(angle)) - 0.25;
        const y = (markerRadius * Math.sin(angle)) - 0.25;

        marker.style.left = `calc(50% + ${x}rem)`;
        marker.style.top = `calc(50% + ${y}rem)`;

        clock.appendChild(marker);
    }
}

addHours();
setInterval(updateClock, 1000);
updateClock();