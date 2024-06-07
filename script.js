document.addEventListener('DOMContentLoaded', () => {
    const frames = document.querySelectorAll('.frame');
    const buttons = document.querySelectorAll('.color-btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const color = button.getAttribute('data-color');
            const activeFrame = document.querySelector('.frame.active');
            const nextFrame = document.getElementById(`${color}-frame`);

            // Disable all buttons
            buttons.forEach(btn => btn.disabled = true);

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
                        // Enable all buttons after animation
                        buttons.forEach(btn => btn.disabled = false);
                    }, 10); // delay for the fade-in effect
                }, 1000); // time for slide-out effect
            } else {
                // Enable all buttons if no transition
                buttons.forEach(btn => btn.disabled = false);
            }
        });
    });
});
