
document.addEventListener('DOMContentLoaded', () => {
    const frames = document.querySelectorAll('.frame');
    const buttons = document.querySelectorAll('.color-btn');
    let currentIndex = 0;
    const intervalTime = 4000; // 4 seconds
    let intervalId;

    function switchFrame(nextIndex) {
        const activeFrame = document.querySelector('.frame.active');
        const nextFrame = frames[nextIndex];

        if (activeFrame !== nextFrame) {
            const activeCloud = activeFrame.querySelector('.cloud');
            const activeToothbrush = activeFrame.querySelector('.toothbrush');

            activeCloud.classList.add('slide-out');
            activeToothbrush.style.opacity = '0';

            setTimeout(() => {
                activeFrame.classList.remove('active');
                activeCloud.classList.remove('slide-out');

                nextFrame.classList.add('active');
                const nextToothbrush = nextFrame.querySelector('.toothbrush');
                nextToothbrush.style.opacity = '0';

                setTimeout(() => {
                    nextToothbrush.style.opacity = '1';
                }, 10); // delay for the fade-in effect

                currentIndex = nextIndex;
            }, 1000); // time for slide-out effect
        }
    }

    function startInterval() {
        intervalId = setInterval(() => {
            const nextIndex = (currentIndex + 1) % frames.length;
            switchFrame(nextIndex);
        }, intervalTime);
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const color = button.getAttribute('data-color');
            const nextFrame = document.getElementById(`${color}-frame`);
            const nextIndex = Array.from(frames).indexOf(nextFrame);

            if (currentIndex !== nextIndex) {
                // Disable all buttons
                buttons.forEach(btn => btn.disabled = true);

                switchFrame(nextIndex);

                // Re-enable buttons after animation
                setTimeout(() => {
                    buttons.forEach(btn => btn.disabled = false);
                }, 1010); // slightly longer than the animation duration

                // Reset interval
                clearInterval(intervalId);
                startInterval();
            }
        });
    });

    startInterval(); // Start the interval when the page loads
});
