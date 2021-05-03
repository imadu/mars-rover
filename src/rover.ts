export type Point = [number, number];

export enum Direction {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
}

export interface State {
  x: number;
  y: number;
  direction: Direction;
}

/**
 * NextDirection Map holds all the full combinations of change of direction of the State machine(i.e. the mars rover is a state machine)
 */

const NextDirection = new Map([
  [`${Direction.NORTH}-L`, Direction.WEST],
  [`${Direction.SOUTH}-L`, Direction.EAST],
  [`${Direction.WEST}-L`, Direction.SOUTH],
  [`${Direction.EAST}-L`, Direction.NORTH],
  [`${Direction.NORTH}-R`, Direction.EAST],
  [`${Direction.SOUTH}-R`, Direction.WEST],
  [`${Direction.WEST}-R`, Direction.NORTH],
  [`${Direction.EAST}-R`, Direction.SOUTH],
]);

/**
 * Delta Map holds all the full change of valuez of both x and y axis of the State machine
 */
const Delta = new Map([
  [`${Direction.NORTH}-F`, [0, 1]],
  [`${Direction.WEST}-F`, [-1, 0]],
  [`${Direction.EAST}-F`, [1, 0]],
  [`${Direction.SOUTH}-F`, [0, -1]],
  [`${Direction.NORTH}-B`, [0, -1]],
  [`${Direction.WEST}-B`, [1, 0]],
  [`${Direction.EAST}-B`, [-1, 0]],
  [`${Direction.SOUTH}-B`, [0, -1]],
]);

export class MarsRover {
  state: State;
  obstacles: Set<string>;

  constructor(x: number, y: number, direction: Direction, obstacles?: Point[]) {
    this.state = { x, y, direction };
    this.obstacles = obstacles ? new Set(obstacles.map(p => p.toString())): new Set();
  }

  private NextState(command: string, state: State): State {
    //treat for both L, R, F and B commands
    if (command === "L" || command === "R") {
      const newDirection = NextDirection.get(`${state.direction}-${command}`);
      if (newDirection) {
        return {
          ...state,
          direction: newDirection,
        };
      }
      throw new Error(`Invalid command found in Direction ${command}`);
    }

    if (command === "F" || command === "B") {
      const locationDelta = Delta.get(`${state.direction}-${command}`);
      if (locationDelta) {
        const newState = {
          ...state,
          x: state.x + locationDelta[0],
          y: state.y + locationDelta[1],
        };
        return newState;
      }
    }
    throw new Error(`Invalid command ${command} found in command string`);
  }

  Move(commands: string) {
    let newState: State;
    for (let i = 0; i < commands.length; i++) {
      newState = this.NextState(commands[i], this.state);
      if (this.obstacles.has(`${newState.x},${newState.y}`)) {
          // We have a collision; stop processing commands:
          return `(${this.state.x},${this.state.y}) ${this.state.direction} STOPPED`;
      }
      this.state = newState;
    }
    return `(${this.state.x},${this.state.y}) ${this.state.direction}`;
  }
}