const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const circle = document.querySelector("circle");

const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);
circle.setAttribute("stroke", "hsl(360,50%,70%)");

let duration;
const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart(totalDuration) {
    duration = totalDuration - 0.05;
  },
  onTick(timeRemaining) {
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );

    // NEW COLOR SCHEME
    circle.setAttribute(
      "stroke",
      `hsl(${
        ((perimeter * timeRemaining) / duration / perimeter) * 360
      },50%,70%`
    );
  },
  onComplete() {
    console.log("Timer is completed");
    // console.log(`Time remaining is: ${this.timeRemaining}`);
    // console.log(`This is the perimeter ${perimeter}`);
    // console.log(
    //   `This is the stroke-dashoffset: ${circle.getAttribute(
    //     "stroke-dashoffset"
    //   )}`
    // );
  },
});
