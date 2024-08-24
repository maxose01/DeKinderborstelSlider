document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    let previousColorIndex = -1;
    let previousTextIndex = -1;
    const frames = document.querySelectorAll('.frame');
    const totalFrames = frames.length;
    const minicloud = document.querySelector('.minicloud');
    const cloudText = document.getElementById('cloud-text');
    const drawArrows = document.querySelectorAll('.draw-arrow');
    const colors = ['#FFDE4D', '#C1E1F4'];
    const texts = ['Gezonde glimlach', 'Plezier bij poetsen', 'Gemakkelijk in gebruik', 'Langdurige batterij', 'Kindvriendelijk ontwerp', 'Effectieve reiniging', 'Tandvleesbescherming', 'Duurzaam en betrouwbaar', 'Gratis verzending', 'Minder tandplak', 'Beter poetsen'];

    setInterval(fadeCloud, 5000); // Change cloud color and text every 5 seconds

    if (!cloudText || !minicloud || drawArrows.length === 0) {
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
        drawArrows.forEach(arrow => {
            arrow.style.opacity = 0; // Fade out
        });
        setTimeout(() => {
            drawArrows.forEach(arrow => {
                arrow.classList.add("hidden");
                console.log(arrow)
            });
            updateCloud(); // Update color and text while invisible
            minicloud.style.opacity = 1; // Fade in
        
            setTimeout(function (){
                drawArrows.forEach(arrow => {
                    arrow.style.opacity = 1; // Fade out
                    arrow.classList.remove("fade-out");
                    arrow.classList.remove("hidden");
                    });                        
            }, 1000);               

        }, 1000); // Wait for fade out to complete before updating
    }
    
    function applyScreenWidthStyles() {
        var screenWidth = window.screen.width;
        console.log("screenWidth = ", screenWidth);
        if (screenWidth >= 750 && screenWidth <= 1200) {
            document.querySelector('.top-cloud-container').style.display = 'none';
        } else {
            document.querySelector('.top-cloud-container').style.display = 'block';
        }
    }
    
    // Call the function on page load
    applyScreenWidthStyles();
    
    // Call the function on window resize
    window.addEventListener('resize', applyScreenWidthStyles);
    
});