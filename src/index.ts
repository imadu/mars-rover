import { start, get, Schema } from "prompt";
import { Direction, MarsRover, Point } from "./rover";

const cliSchema: Schema = {
  properties: {
    x: {
      pattern: /(^-?[0-9]+)|([0-9]+)/,
      description: "Please enter an x coordinate for the rover",
      message: "coordinate can  be positive or negative",
      required: true,
    },
    y: {
      pattern: /(^-?[0-9]+)|([0-9]+)/,
      description: "Please enter a y coordinate for the rover",
      message: "coordinate can  be positive or negative",
      required: true,
    },
    direction: {
      pattern: /NORTH|SOUTH|EAST|WEST/,
      description: "Please enter a direction for the rover",
      message: "Direction must be one of either NORTH, SOUTH, EAST or WEST",
      required: true,
    },
    command: {
      pattern: /[LRFB]+/,
      description:
        "Please enter a set of commands for the rover to navigate after it's been initialized",
      message:
        "coordinate must be a combination of the following chatacters 'L', 'F', 'R', 'B'",
      required: true,
    },
    obstacles: {
      pattern: /(^-?[0-9]+)|([0-9]+):(^-?[0-9]+)|([0-9]+)/,
      description:
        "Please enter a combination of obstacles in the format 'x:y,x:y,x:y' where x and y are positive integers",
      message: "",
      required: false,
    },
  },
};

start();

//@ts-ignore
get(cliSchema, function (err, result) {
  const newMarsRover = new MarsRover(
    Number(result.x),
    Number(result.y),
    result.direction as Direction,
    convertToArray(result.obstacles as string)
  );
  console.log(newMarsRover.Move(result.command as string))
});

function convertToArray(obstacles: string): Point[] {
  const obstaclesArray = obstacles.trim().split(",")
  const newObstacle = obstaclesArray.map((obstacle)=> obstacle.trim().split(":"))
  return newObstacle.map((axis) => Number(axis) as unknown as Point)
}
