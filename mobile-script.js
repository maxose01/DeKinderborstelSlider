document.addEventListener('DOMContentLoaded', (event) => {
    let currentIndex = 0;
    let previousColorIndex = -1;
    let previousTextIndex = -1;
    const frames = document.querySelectorAll('.frame');
    const totalFrames = frames.length;
    const cloudText = document.getElementById('cloud-text');
    const minicloud = document.querySelector('.minicloud');
    const colors = ['#FFDE4D', '#C1E1F4'];
    const texts = ['Gezonde glimlach', 'Plezier bij poetsen', 'Gemakkelijk in gebruik', 'Langdurige batterij', 'Kindvriendelijk ontwerp', 'Effectieve reiniging', 'Tandvleesbescherming', 'Duurzaam en betrouwbaar', 'Gratis verzending', 'Minder tandplak', 'Beter poetsen'];

    if (!cloudText || !minicloud) {
        console.error('Required elements are not found in the DOM.');
        return;
    }

    function getRandomIndex(previousIndex, arrayLength) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * arrayLength);
        } while (randomIndex === previousIndex);
        return randomIndex;
    }

    function showFrame(index) {
        frames.forEach((frame, i) => {
            frame.classList.toggle('active', i === index);
        });
    }

    function updateCloud() {
        const newColorIndex = getRandomIndex(previousColorIndex, colors.length);
        const newTextIndex = getRandomIndex(previousTextIndex, texts.length);

        previousColorIndex = newColorIndex;
        previousTextIndex = newTextIndex;

        minicloud.style.backgroundColor = colors[newColorIndex];
        cloudText.textContent = texts[newTextIndex];

        // Update ::before and ::after pseudo-elements via dynamic stylesheet rule
        let styleSheet = document.styleSheets[0];
        let rules = styleSheet.cssRules || styleSheet.rules;
        let beforeRule, afterRule;

        for (let i = 0; i < rules.length; i++) {
            if (rules[i].selectorText === '.minicloud:before') {
                beforeRule = rules[i];
            } else if (rules[i].selectorText === '.minicloud:after') {
                afterRule = rules[i];
            }
        }

        if (!beforeRule) {
            styleSheet.insertRule('.minicloud:before { content: ""; position: absolute; background: #FFF7D3; z-index: -1; transition: background 1s ease-in-out; }', rules.length);
            beforeRule = styleSheet.cssRules[styleSheet.cssRules.length - 1];
        }

        if (!afterRule) {
            styleSheet.insertRule('.minicloud:after { content: ""; position: absolute; background: #FFF7D3; z-index: -1; transition: background 1s ease-in-out; }', rules.length);
            afterRule = styleSheet.cssRules[styleSheet.cssRules.length - 1];
        }

        beforeRule.style.backgroundColor = colors[newColorIndex];
        afterRule.style.backgroundColor = colors[newColorIndex];
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