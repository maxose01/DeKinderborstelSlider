document.addEventListener('DOMContentLoaded', (event) => {
    let currentIndex = 0;
    let previousColorIndex = -1;
    let previousTextIndex = -1;
    const frames = document.querySelectorAll('.frame');
    const totalFrames = frames.length;

    function nextFrame() {
        currentIndex = (currentIndex + 1) % totalFrames;
        showFrame(currentIndex);
    }

    setInterval(nextFrame, 4000);
    
    function showFrame(index) {
        frames.forEach((frame, i) => {
            frame.classList.toggle('active', i === index);
        });
    }

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