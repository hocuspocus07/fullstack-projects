let tabCount = 0;
const openedtab = document.getElementById('tab-opened');
const timeSetter = () => {
    const date = new Date();
    const hoverTime = date.toLocaleString();
    document.getElementById('hover-time').innerText = hoverTime;
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

// games menu and children elements 

const games = document.getElementById('games');
const gamesmenu = document.getElementById('games-menu');

const tools = document.getElementById('tools');
const toolsmenu = document.getElementById('tools-menu');

function showToolMenu() {
    toolsmenu.classList.remove('hidden');
    toolsmenu.classList.add('flex');
}

// Function to hide the tools menu
function hideToolMenu() {
    toolsmenu.classList.add('hidden');
    toolsmenu.classList.remove('flex');
}

tools.addEventListener('mouseenter', showToolMenu);
toolsmenu.addEventListener('mouseenter', showToolMenu);

tools.addEventListener('mouseleave', hideToolMenu);
toolsmenu.addEventListener('mouseleave', hideToolMenu);

const timediv = document.getElementById('time-div');
const hovertime = document.getElementById('hover-time');
timediv.addEventListener('mouseenter', () => {
    hovertime.classList.remove('hidden');
});
timediv.addEventListener('mouseleave', () => {
    hovertime.classList.add('hidden');
});

function showGameMenu() {
    gamesmenu.classList.remove('hidden');
    gamesmenu.classList.add('flex');
}

// Function to hide the games menu
function hideGameMenu() {
    gamesmenu.classList.add('hidden');
    gamesmenu.classList.remove('flex');
}


games.addEventListener('mouseenter', showGameMenu);
gamesmenu.addEventListener('mouseenter', showGameMenu);

games.addEventListener('mouseleave', hideGameMenu);
gamesmenu.addEventListener('mouseleave', hideGameMenu);

//function to run programs

function runProgram(program) {
    const tabContainer = document.getElementById('tab-container');
    const startmenu = document.getElementById('start-menu');
    startmenu.classList.add("hidden");
    const startimage = document.getElementById('start-image');
    startimage.src = "./assets/start-button.gif";
    tabCount++;
    const newTab = openedtab.cloneNode(true);
    const tabId = `tab-${program.toLowerCase()}`;
    newTab.id = tabId;
    newTab.classList.remove('hidden');
    newTab.classList.add('flex', `tab-${tabCount}`);
    newTab.querySelector('.tab-content').textContent = program;
    newTab.querySelector('#tab-icon').src = `./assets/${program.toLowerCase()}.png`;
    tabContainer.appendChild(newTab);
    const closeButton = document.getElementById('close-iframe');
    closeButton.onclick = function() {
        closeWindow(tabId);
    };

    document.getElementById('tab-container').appendChild(newTab);

    const multipWindow = document.getElementById('multip-window');
    multipWindow.classList.remove('hidden');
    multipWindow.classList.add('flex', 'z-20');
    if (`./assets/${program.toLowerCase()}.png`) {
        document.getElementById('program-icon').src = `./assets/${program.toLowerCase()}.png`;
        document.getElementById('program-name').textContent = program;
    }
    const iframe = document.getElementById('window-iframe');
    iframe.src = "";

    if (program === "MineSweeper") {
        iframe.src = "https://hocuspocus07.github.io/Minesweeper/";
    } else if (program === "WaterSort") {
        iframe.src = "https://hocuspocus07.github.io/WaterSortGame/";
    } else if (program === "Resume") {
        iframe.src = "./assets/resume.pdf";
        document.getElementById('program-icon').src = './assets/pdficon.png';
    } else if (program === "Contact Me") {
        iframe.src = "./components/contact.html";
        document.getElementById('program-icon').src = './assets/contact.png';
    } else if (program === "Techstack") {
        iframe.src = "./components/techstack.html";
    } else if (program === "Date/Time Properties") {
        iframe.src = "./components/datentime.html";
        document.getElementById('program-icon').src = './assets/clock.png';
    }
}

let isMaximized = false;

function operateIframe(operation) {
    const multipWindow = document.getElementById('multip-window');

    if (operation === "minimise") {
        multipWindow.classList.add('hidden');
        isMaximized = false;
    } else if (operation === "maximise") {
        if (!isMaximized) {
            multipWindow.classList.add("maximized");
            multipWindow.classList.remove("top-1/4", "left-1/3", "w-1/3", "h-96");
        } else {
            multipWindow.classList.remove("maximized");
            multipWindow.classList.add("top-1/4", "left-1/3", "w-1/3", "h-96");
        }
        isMaximized = !isMaximized;
    }
}



function toggleTab(event) {
    event.stopPropagation();

    const tab = event.currentTarget;
    const window = document.getElementById('multip-window');

    if (tab.classList.contains('hidden')) {
        tab.classList.remove('hidden');
        tab.classList.add('flex');
        tab.style.zIndex = 10;
    }

    // Remove the window visibility control from here
    window.classList.toggle('hidden');
    if (!window.classList.contains('hidden')) {
        window.classList.add('flex');
    }
}

function closeWindow(tabId) {
    console.log("Attempting to close tab with ID:", tabId); // Log tabId
    const window = document.getElementById('multip-window');

    // Close the multipurpose window
    window.classList.remove('flex');
    window.classList.add('hidden');

    const tab = document.getElementById(tabId);
    console.log("Tab found:", tab); // Log the found tab

    if (tab) {
        console.log(true);
        tab.remove();
    } else {
        console.log("No tab found with that ID."); // Log if tab is not found
    }
}


function startToggle() {
    const startmenu = document.getElementById('start-menu');
    const startimage = document.getElementById('start-image');
    startimage.src = "./assets/win-clicked.jpg";

    // Toggle start menu visibility
    startmenu.classList.toggle("hidden");
    if (!startmenu.classList.contains('hidden')) {
        startmenu.classList.add("flex");
    } else {
        startmenu.classList.remove("flex");
        startimage.src = "./assets/start-button.gif";
    }

    // Ensure the multipurpose window remains visible when the start menu is toggled
    const multipWindow = document.getElementById('multip-window');
    if (!multipWindow.classList.contains('hidden')) {
        multipWindow.classList.remove('hidden');
        multipWindow.classList.add('flex');
    }
}
timeSetter()
addEventListener('DOMContentLoaded', () => {
    timeSetter();
})