const iframeWindow = document.getElementById('certificate-viewer');
const iframeContent = document.getElementById('iframe-content');
const certificates = document.querySelectorAll('.certificate');
const name = document.getElementById('certificate-name');
certificates.forEach(certificate => {
    certificate.addEventListener('click', viewCertificate);
})

function viewCertificate(event) {
    const selectedDrawing = event.currentTarget;
    const targetIndex = selectedDrawing.getAttribute('id');
    const certificateURLs = {
        '1': '../assets/hackjmi.pdf',
    };
    if (targetIndex == 1) {
        name.innerText = "HackJMI";
    }

    if (certificateURLs[targetIndex]) {
        iframeContent.src = certificateURLs[targetIndex];
        iframeWindow.classList.remove('hidden');
    }
}

function closeIframe() {
    iframeWindow.classList.add('hidden');
}