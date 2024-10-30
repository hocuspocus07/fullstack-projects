let tabCount = 0;
const openedtab = document.getElementById('tab-opened');
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

// games menu and children elements 

const games = document.getElementById('games');
const gamesmenu = document.getElementById('games-menu');

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

//function to play games
// Initialize tab counter

function runProgram(program) {
    tabCount++;

    // Clone and prepare the new tab
    const newTab = openedtab.cloneNode(true);
    newTab.classList.remove('hidden');
    newTab.classList.add('flex', `tab-${tabCount}`);
    newTab.querySelector('.tab-content').textContent = program;
    newTab.querySelector('#tab-icon').src = `./assets/${program.toLowerCase()}.png`;

    // Close button event to remove tab
    const closeButton = newTab.querySelector('span');
    closeButton.addEventListener('click', () => newTab.remove());

    document.getElementById('tab-container').appendChild(newTab);

    // Ensure multipurpose window appears right away
    const multipWindow = document.getElementById('multip-window');
    multipWindow.classList.remove('hidden');
    multipWindow.classList.add('flex', 'z-20');
    document.getElementById('program-icon').src = `./assets/${program.toLowerCase()}.png`;
    document.getElementById('program-name').textContent = program;

    const iframe = document.getElementById('window-iframe');
    iframe.src = "";

    // Set iframe source for specific programs
    if (program === "MineSweeper") {
        iframe.src = "https://hocuspocus07.github.io/Minesweeper/";
    } else if (program === "WaterSort") {
        iframe.src = "https://hocuspocus07.github.io/WaterSortGame/";
    } else if (program === "Resume") {
        iframe.src = "./assets/resume.pdf";
    }
}

function operateIframe(operation) {
    const multipWindow = document.getElementById('multip-window');
    if (operation === "minimise") {
        multipWindow.classList.add('hidden'); // Hide window on minimize
    } else if (operation === "maximise") {
        multipWindow.classList.toggle("top-1/4", "left-1/3", "w-1/3", "h-96");
        if (!multipWindow.classList.contains("top-1/4")) {
            multipWindow.classList.add("top-0", "left-0", "h-full", "w-full", "z-10");
        } else {
            multipWindow.classList.remove("top-0", "left-0", "h-full", "w-full", "z-10");
        }
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

function closeWindow() {
    const window = document.getElementById('multip-window');

    // Close the multipurpose window
    window.classList.remove('flex');
    window.classList.add('hidden');

    const tabIconSrc = document.getElementById('program-icon').src;
    const tabContainer = document.getElementById('tab-container');

    const tabs = tabContainer.querySelectorAll('.tabs');

    tabs.forEach(tab => {
        const tabIcon = tab.querySelector('#tab-icon');
        if (tabIcon && tabIcon.src === tabIconSrc) {
            tab.remove();
        }
    });
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