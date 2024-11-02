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

const closeButton = document.getElementById('close-iframe');

function runProgram(program) {
    const tabContainer = document.getElementById('tab-container');
    const startmenu = document.getElementById('start-menu');
    startmenu.classList.add("hidden");
    const startimage = document.getElementById('start-image');
    startimage.src = "./assets/start-button.gif";

    const newTab = openedtab.cloneNode(true);
    const tabId = `tab-${program.toLowerCase()}`;
    newTab.id = tabId;
    newTab.classList.remove('hidden');
    newTab.classList.add('flex');

    newTab.querySelector('.tab-content').textContent = program;
    newTab.querySelector('#tab-icon').src = `./assets/${program.toLowerCase()}.png`;
    document.getElementById('program-icon').src = `./assets/${program.toLowerCase()}.png`;
    if (program === "Resume") {
        document.getElementById('program-icon').src = `./assets/pdficon.png`;
        newTab.querySelector('#tab-icon').src = `./assets/pdficon.png`;
    } else if (program === "Contact Me") {
        document.getElementById('program-icon').src = `./assets/contact.png`;
        newTab.querySelector('#tab-icon').src = `./assets/contact.png`;

    } else if (program === "Achievements") {
        document.getElementById('program-icon').src = `./assets/achievements-icon.png`;
        newTab.querySelector('#tab-icon').src = `./assets/achievements-icon.png`;

    } else if (program === "Projects") {
        document.getElementById('program-icon').src = `./assets/projects-icon.png`;
        newTab.querySelector('#tab-icon').src = `./assets/projects-icon.png`;

    } else if (program === "Date/Time Properties") {
        document.getElementById('program-icon').src = `./assets/clock.png`;
        newTab.querySelector('#tab-icon').src = `./assets/clock.png`;
    }
    document.getElementById('program-name').textContent = program;
    tabContainer.appendChild(newTab);

    const closeTabButton = newTab.querySelector('.right-0 img');
    closeTabButton.onclick = () => closeWindow(tabId);
    closeButton.onclick = () => closeWindow(tabId);

    const multipWindow = document.getElementById('multip-window');
    multipWindow.style.display = "block";
    multipWindow.classList.remove('hidden');
    multipWindow.classList.add('flex', 'z-20');

    const iframe = document.getElementById('window-iframe');
    iframe.src = getIframeSource(program);
}

function getIframeSource(program) {
    switch (program) {
        case "MineSweeper":
            return "https://hocuspocus07.github.io/Minesweeper/";
        case "WaterSort":
            return "https://hocuspocus07.github.io/WaterSortGame/";
        case "Resume":
            return "./assets/resume.pdf";
        case "Contact Me":
            return "./components/contact.html";
        case "Techstack":
            return "./components/techstack.html";
        case "Date/Time Properties":
            return "./components/datentime.html";
        case "Projects":
            return "./components/projects.html";
        case "WaterGame":
            return "https://owaismohammad.github.io/TeamAqua/watergame.html";
        case "Drawings":
            return "./components/drawings.html";
        case "Achievements":
            return "./components/achievements.html";
        default:
            return "";
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
            multipWindow.classList.remove("top-1/5", "left-1/3", "w-1/3", "h-4/5");
        } else {
            multipWindow.classList.remove("maximized");
            multipWindow.classList.add("top-1/5", "left-1/3", "w-1/3", "h-4/5");
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

    window.classList.toggle('hidden');
    if (!window.classList.contains('hidden')) {
        window.classList.add('flex');
    }
}

function closeWindow(tabId) {
    const tab = document.getElementById(tabId);
    if (tab) {
        tab.remove();
    }

    const tabContainer = document.getElementById('tab-container');
    const remainingTabs = tabContainer.querySelectorAll('.tabs.flex');
    const multipWindow = document.getElementById('multip-window');
    if (remainingTabs.length === 0) {
        multipWindow.style.display = "none";
        multipWindow.classList.remove('flex', 'z-20', 'maximized');
    }

}


function startToggle() {
    const startmenu = document.getElementById('start-menu');
    const startimage = document.getElementById('start-image');
    startimage.src = "./assets/win-clicked.jpg";

    startmenu.classList.toggle("hidden");
    if (!startmenu.classList.contains('hidden')) {
        startmenu.classList.add("flex");
    } else {
        startmenu.classList.remove("flex");
        startimage.src = "./assets/start-button.gif";
    }

    const multipWindow = document.getElementById('multip-window');
    if (!multipWindow.classList.contains('hidden')) {
        multipWindow.classList.remove('hidden');
        multipWindow.classList.add('flex');
    }
}

document.addEventListener('click', (event) => {
    const startmenu = document.getElementById('start-menu');
    const startButton = document.getElementById('start-image');

    if (!startmenu.contains(event.target) && !startButton.contains(event.target)) {
        startmenu.classList.add('hidden');
        startmenu.classList.remove('flex');

        startButton.src = "./assets/start-button.gif";
    }
});
customMenu = document.getElementById('context-menu');
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    customMenu.classList.remove('hidden');
    customMenu.classList.add('flex');
    customMenu.style.top = `${event.clientY / 16}rem`;
    customMenu.style.left = `${event.clientX / 16}rem`;
})
document.addEventListener('click', () => {
    customMenu.classList.add('hidden');
    customMenu.classList.remove('flex');
});
timeSetter()
addEventListener('DOMContentLoaded', () => {
    timeSetter();
})