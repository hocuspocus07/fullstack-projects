let tabCount = 0;
const openedtab = document.getElementById('tab-opened');

//function to set the time in time-div
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

//hovering effect over various elements
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

//creates a window for a programname,icon link, and a source as its parameters
function createProgramWindow(programName, programIconSrc, iframeSrc) {
    tabCount++;
    const programWindow = document.createElement('div');
    const id = `win-${tabCount}`;
    programWindow.id = id;
    programWindow.className = "xs:w-full xs:h-2/3 cs:h-2/3 cs:w-full cs:left-0 xs:left-0 fixed top-0 left-1/3 w-1/3 h-4/5 flex-col bg-[#BEC7C9] p-1 overflow-auto resize z-50 font-win95font";

    //setting up control-div
    const controls = document.createElement('div');
    controls.className = "w-full h-6 bg-[#0000A9] flex justify-between p-1";
    programWindow.appendChild(controls);

    const leftControls = document.createElement('div');
    leftControls.className = "w-28 h-full flex items-center";
    controls.appendChild(leftControls);

    const icon = document.createElement('img');
    icon.src = programIconSrc;
    icon.className = "h-6 w-8 pr-1";
    leftControls.appendChild(icon);

    const name = document.createElement('p');
    name.textContent = programName;
    name.className = "text-white";
    leftControls.appendChild(name);

    const rightControls = document.createElement('div');
    rightControls.className = "h-full flex";
    controls.appendChild(rightControls);

    const minimizeButton = document.createElement('img');
    minimizeButton.src = "assets/minimise.png";
    minimizeButton.className = "h-full w-6 hover:cursor-pointer";
    minimizeButton.onclick = () => programWindow.style.display = 'none';
    rightControls.appendChild(minimizeButton);

    const maximizeButton = document.createElement('img');
    maximizeButton.src = "assets/maximise.png";
    maximizeButton.className = "h-full w-6 hover:cursor-pointer";
    maximizeButton.onclick = () => programWindow.classList.toggle('maximized');
    rightControls.appendChild(maximizeButton);

    const closeButton = document.createElement('img');
    closeButton.src = "assets/close.png";
    closeButton.className = "h-full w-6 hover:cursor-pointer";
    closeButton.onclick = () => closeWindow(id);
    rightControls.appendChild(closeButton);

    const iframe = document.createElement('iframe');
    iframe.src = iframeSrc;
    iframe.className = "w-full h-full xs:w-screen xs:h-screen cs:h-screen cs:w-screen";
    programWindow.appendChild(iframe);

    document.body.appendChild(programWindow);
    dragElement(programWindow);

    //creating a tab which corresponds to the particular window in the tab container

    const tabContainer = document.getElementById('tab-container');
    const newTab = document.createElement('div');
    const tabId = `tab-${tabCount}`;
    newTab.id = tabId;
    newTab.className = "tabs h-full xs:w-32 lg:w-48 bg-[#BEBEBE] border-2 border-black flex justify-center items-center";
    newTab.onclick = toggleTab;

    const tabIcon = document.createElement('img');
    tabIcon.className = "h-8 w-8 xs:ml-10";
    tabIcon.src = `./assets/${programName.toLowerCase()}.png`;
    newTab.appendChild(tabIcon);

    const tabContent = document.createElement('p');
    tabContent.className = "tab-content";
    tabContent.textContent = programName;
    newTab.appendChild(tabContent);

    const closeTabButton = document.createElement('span');
    closeTabButton.className = "right-0 ml-12 bg-gray-600 h-6 w-6 hover:cursor-pointer";
    closeTabButton.innerHTML = `<img src="assets/close.png">`;
    closeTabButton.onclick = () => closeWindow(id);
    newTab.appendChild(closeTabButton);

    tabContainer.appendChild(newTab); //append the created tab into the div

    newTab.classList.remove('hidden');
    newTab.classList.add('flex');
}

//closes the window and tab when any of the close button is clicked
function closeWindow(windowId) {

    const tabId = `tab-${windowId.replace('win-', '')}`;
    const tabToClose = document.getElementById(tabId);

    const windowToClose = document.getElementById(windowId);
    if (windowToClose) {
        windowToClose.remove();
    }

    if (tabToClose) {
        tabToClose.remove();
    }
    tabCount--;
}

//toggling the start button
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
}

//hiding the start menu when we click anywhere outside the startmenu or button
document.addEventListener('click', (event) => {
    const startmenu = document.getElementById('start-menu');
    const startButton = document.getElementById('start-image');

    if (!startmenu.contains(event.target) && !startButton.contains(event.target)) {
        startmenu.classList.add('hidden');
        startmenu.classList.remove('flex');

        startButton.src = "./assets/start-button.gif";
    }
});

//adding a custom context menu(right click)
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

//minimising and reopening the window from its tab
function toggleTab(event) {
    event.stopPropagation();

    const tab = event.currentTarget;
    const windowId = `win-${tab.id.slice(4,tab.length)}`;
    const window = document.getElementById(windowId);

    if (window.classList.contains('hidden')) {
        window.classList.remove('hidden');
        window.classList.add('flex');
        window.style.zIndex = 10;
    } else {
        window.classList.add('hidden');
    }
}

//tell the user to switch to laptop
function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

if (isMobile()) {
    alert("For the best experience, please access this website on a larger screen(laptop/desktop).");
}

//sets the time
timeSetter()
addEventListener('DOMContentLoaded', () => {
    timeSetter();
})