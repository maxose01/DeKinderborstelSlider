document.addEventListener('DOMContentLoaded', (event) => {
    let currentIndex = 0;
    let previousIndex = -1;
    const frames = document.querySelectorAll('.frame');
    const totalFrames = frames.length;
    const cloudText = document.getElementById('cloud-text');
    const minicloud = document.querySelector('.minicloud');
    const colors = ['#FFF7D3', '#D7F0FF', '#FFEBF2'];
    const texts = ['Speels karakter', 'Frisse kleur', 'Zacht gevoel'];

    function getRandomIndex() {
        let randomIndex = Math.floor(Math.random() * colors.length);
        while (randomIndex === previousIndex) {
            randomIndex = Math.floor(Math.random() * colors.length);
        }
        previousIndex = randomIndex;
        return randomIndex;
    }

    function showFrame(index) {
        frames.forEach((frame, i) => {
            frame.classList.toggle('active', i === index);
        });
    }

    function updateCloud() {
        const randomIndex = getRandomIndex();
        minicloud.style.backgroundColor = colors[randomIndex];
        cloudText.textContent = texts[randomIndex];
        document.styleSheets[0].addRule('.minicloud:before', `background-color: ${colors[randomIndex]} !important`);
        document.styleSheets[0].addRule('.minicloud:after', `background-color: ${colors[randomIndex]} !important`);
    }

    function fadeCloud() {
        minicloud.style.opacity = 0; // Fade out
        setTimeout(() => {
            updateCloud(); // Update color and text while invisible
            minicloud.style.opacity = 1; // Fade in
        }, 1000); // Wait for fade out to complete before updating
    }

    function nextFrame() {
        currentIndex = (currentIndex + 1) % totalFrames;
        showFrame(currentIndex);
    }

    setInterval(nextFrame, 4000);
    setInterval(fadeCloud, 5000); // Change cloud color and text every 5 seconds

    let startX = 0;
    let endX = 0;

    function handleTouchStart(event) {
        startX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        endX = event.touches[0].clientX;
    }

    function handleTouchEnd() {
        if (startX > endX + 50) {
            nextFrame();
        } else if (startX < endX - 50) {
            currentIndex = (currentIndex - 1 + totalFrames) % totalFrames;
            showFrame(currentIndex);
        }
    }

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
});
