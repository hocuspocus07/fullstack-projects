const timeSetter = () => {
    const date = new Date();
    let hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    let timeString = "";
    if (hours === 0) {
        hours = 12;
        timeString = `${hours}:${minutes} AM`;
    } else if (hours === 12) {
        timeString = `${hours}:${minutes} PM`;
    } else if (hours > 12) {
        hours = hours % 12;
        timeString = `${hours}:${minutes} PM`;
    } else {
        timeString = `${hours}:${minutes} AM`;
    }
    document.getElementById('time-div').textContent = timeString;
}
setInterval(timeSetter, 1000);

const startToggle = () => {
    const startmenu = document.getElementById('start-menu');
    const startimage = document.getElementById('start-image')
    startimage.src = "./assets/win-clicked.jpg";
    startmenu.classList.toggle("hidden");
    if (!startmenu.classList.contains('hidden')) {
        startmenu.classList.add("flex");
    } else {
        startmenu.classList.remove("flex");
        startimage.src = "./assets/start-button.gif";
    }
}
timeSetter()
addEventListener('DOMContentLoaded', () => {
    timeSetter()
})