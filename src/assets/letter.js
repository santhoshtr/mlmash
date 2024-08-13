const setupLetterSVGPath = (path, animatationTime) => {
    const length = path.getTotalLength();
    // Clear any previous transition
    path.style.transition = "none";
    // Set up the starting positions
    path.style.strokeDasharray = length + " " + length;
    path.style.strokeDashoffset = `${length}`;
    path.style.strokeLinecap = "round";
    path.style.strokeLinejoin = "round";
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    path.getBoundingClientRect();
    // Define our transition
    path.style.transition = `stroke-dashoffset ${animatationTime}s ease-in-out`;
};

const animatePath = (path) =>
    (path.style.strokeDashoffset = "0");

const animateLetter = (letterElement) => {
    const paths = letterElement.querySelectorAll("path");
    const endTime = [];
    const speed = 0.001; // Relative to path length
    for (let i = 0; i < paths.length; i++) {
        const animatationDuration = paths[i].getTotalLength() * speed;
        setupLetterSVGPath(paths[i], animatationDuration);

        if (i == 0) {
            animatePath(paths[i]);
            endTime[i] = animatationDuration;
            continue;
        }
        endTime[i] = endTime[i - 1] + animatationDuration;

        setTimeout(() => {
            animatePath(paths[i]);
        }, endTime[i - 1] * 1000);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const letterElement = document.querySelector(".letter-svg.foreground");
    animateLetter(letterElement);
});
