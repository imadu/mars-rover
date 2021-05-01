import { Direction, MarsRover, State } from "./rover";

type TestCase = [State, string, string]

describe("Mars Rover", () => {
  it("should initialize mars rover", () => {
    var EAST: Direction = Direction[Direction.EAST]
    const rover = new MarsRover(4, 2, EAST);
    expect(rover).toBeTruthy();
    expect(rover.state.x).toBe(4);
    expect(rover.state.y).toBe(2);
    expect(rover.state.direction).toBe("EAST");
  });

  it("should throw an invalid command error", () => {
    var EAST: Direction = Direction[Direction.EAST]
    const rover = new MarsRover(4, 2, EAST);
    expect(() => rover.Move("FGFFFRLB")).toThrow(
      Error
    );
  });

  it("should move the rover and return coordinates", ()=> {
    var EAST: Direction = Direction[Direction.EAST]
    var NORTH: Direction = Direction[Direction.NORTH]
    var WEST: Direction = Direction[Direction.WEST]
    var SOUTH: Direction = Direction[Direction.SOUTH]
   

      const testCases: TestCase[] = [
        [{x: 4, y: 2, direction: EAST}, "FLFFFRFLB",  "(6,4) NORTH"],
         [{x: 6, y: 4, direction: NORTH}, "FBBLFFLLRF", "(4,2) SOUTH"],
        [{x: 5, y: 6, direction: SOUTH}, "BBBRFFLLBFF", "(4,3) EAST"],
        [{x: 6, y: 4, direction: NORTH}, "FFFLLFFRRRRBB", "(6,3) SOUTH"],
        [{x: 6, y: 4, direction: NORTH}, "LFFFRFLR", "(3,5) NORTH"]    
      ]

      for (let i = 0; i < testCases.length; i++) {
          const [initalState, commands, expectedState]: TestCase = testCases[i] 
         console.log(initalState)
         const newRover = new MarsRover(initalState.x, initalState.y, initalState.direction)
         console.log(newRover.Move(commands))
         expect(newRover.Move(commands)).toBe(expectedState)
      }
  })
});
