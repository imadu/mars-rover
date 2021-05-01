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

const nextDirection = new Map([
  [`${Direction.NORTH}-L`, Direction.WEST],
  [`${Direction.SOUTH}-L`, Direction.EAST],
  [`${Direction.WEST}-L`, Direction.SOUTH],
  [`${Direction.EAST}-L`, Direction.NORTH],
  [`${Direction.NORTH}-R`, Direction.EAST],
  [`${Direction.SOUTH}-R`, Direction.WEST],
  [`${Direction.WEST}-R`, Direction.NORTH],
  [`${Direction.EAST}-R`, Direction.SOUTH],
]);

function nextState(command: string, state: State): State {
  //treat for both L, R, F and B commands
  if (command === "L" || command === "R") {
    const newDirection = nextDirection.get(`${state.direction}-${command}`);
    if (newDirection) {
      return {
        ...state,
        direction: newDirection,
      };
    }
    throw new Error(`Invalid command found in Direction ${command}`)
  }

  if (state.direction === Direction.NORTH && command === "F") {
    return { ...state, y: state.y + 1 };
  }
  if (state.direction === Direction.WEST && command === "F") {
    return { ...state, x: state.x - 1 };
  }
  if (state.direction === Direction.EAST && command === "F") {
    return { ...state, x: state.x + 1 };
  }

  if (state.direction === Direction.SOUTH && command === "F") {
    return { ...state, y: state.y - 1 };
  }

  if (state.direction === Direction.NORTH && command === "B") {
    return { ...state, y: state.y - 1 };
  }

  if (state.direction === Direction.SOUTH && command === "B") {
    return { ...state, y: state.y - 1 };
  }

  if (state.direction === Direction.EAST && command === "B") {
    return { ...state, x: state.x - 1 };
  }

  if (state.direction === Direction.WEST && command === "B") {
    return { ...state, x: state.x - 1 };
  }
  //Throw new error 
  throw new Error(`Invalid command ${command} found in command string`)
}

export class MarsRover {
  state: State;
  constructor(x: number, y: number, direction: Direction) {
    this.state = { x, y, direction };
  }

  Move(command: string) {
    const commands = command.split("");
    let newState = this.state;
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      //check for invalid character commands and throw an error
      newState = nextState(command, newState);
    }
    return `(${newState.x},${newState.y}) ${newState.direction}`
  }
}


