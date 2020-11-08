const setupBackgroundSVG = (bgSVGElement: Element) => {
  const bgPaths = bgSVGElement.querySelectorAll("path");
  for (let i: number = 0; i < bgPaths.length; i++) {
    bgPaths[i].style.stroke = "#002D38";
  }
};

const setupLetterSVGPath = (path: SVGPathElement, animatationTime: number) => {
  const length: number = path.getTotalLength();
  // Clear any previous transition
  path.style.transition = "none";
  // Set up the starting positions
  path.style.strokeDasharray = length + " " + length;
  path.style.strokeDashoffset = `${length}`;
  path.style.strokeWidth = "8";
  path.style.stroke = "#00a7d0";
  // Trigger a layout so styles are calculated & the browser
  // picks up the starting position before animating
  path.getBoundingClientRect();
  // Define our transition
  path.style.transition = `stroke-dashoffset ${animatationTime}s ease-in-out`;
};

const animatePath = (path: SVGPathElement) =>
  (path.style.strokeDashoffset = "0");

const animateLetter = (
  backgroundLetterElement: Element,
  letterElement: Element,
  animatationTime: number
) => {
  setupBackgroundSVG(backgroundLetterElement);
  const paths: NodeListOf<SVGPathElement> = letterElement.querySelectorAll(
    "path"
  );
  for (let i: number = 0; i < paths.length; i++) {
    setupLetterSVGPath(paths[i], animatationTime);
    if (i == 0) {
      animatePath(paths[i]);
      continue;
    }
    setTimeout(() => {
      animatePath(paths[i]);
    }, animatationTime * 1000);
  }
};

export { animateLetter };
