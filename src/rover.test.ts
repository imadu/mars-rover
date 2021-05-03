import { Direction, MarsRover, Point, State } from "./rover";

type TestCase = [State, string, string];
type SecondTestCase = [State, string, State, Point[]];

describe("Mars Rover", () => {
  it("should initialize mars rover", () => {
    const rover = new MarsRover(4, 2, Direction.EAST);
    expect(rover).toBeTruthy();
    expect(rover.state.x).toBe(4);
    expect(rover.state.y).toBe(2);
    expect(rover.state.direction).toBe("EAST");
  });

  it("should throw an invalid command error", () => {
    const rover = new MarsRover(4, 2, Direction.EAST);
    expect(() => rover.Move("FGFFFRLB")).toThrow(Error);
  });

  it("should move the rover and return coordinates", () => {
    

    const testCases: TestCase[] = [
      [{ x: 4, y: 2, direction: Direction.EAST }, "FLFFFRFLB", "(6,4) NORTH"],
      [{ x: 6, y: 4, direction: Direction.NORTH }, "FBBLFFLLRF", "(4,2) SOUTH"],
      [{ x: 5, y: 6, direction: Direction.SOUTH }, "BBBRFFLLBFF", "(4,3) EAST"],
      [{ x: 6, y: 4, direction: Direction.NORTH }, "FFFLLFFRRRRBB", "(6,3) SOUTH"],
      [{ x: 6, y: 4, direction: Direction.NORTH }, "LFFFRFLR", "(3,5) NORTH"],
    ];

    for (let i = 0; i < testCases.length; i++) {
      const [initalState, commands, expectedState]: TestCase = testCases[i];
      const newRover = new MarsRover(
        initalState.x,
        initalState.y,
        initalState.direction
      );
      expect(newRover.Move(commands)).toBe(expectedState);
    }
  });

  it("should return the previous state when  obstacle hit", () => {
    const testCases: SecondTestCase[] = [
      [{ x: 0, y: 3, direction: Direction.EAST }, "FLF", {x:1, y:3, direction: Direction.NORTH}, [[1,4]]],
    ];

    for (let i = 0; i < testCases.length; i++) {
      const [
        initalState,
        commands,
        finalState,
        obstacle,
      ]: SecondTestCase = testCases[i];
      const newRover = new MarsRover(
        initalState.x,
        initalState.y,
        initalState.direction,
        obstacle
      );
      expect(newRover.Move(commands)).toBe(`(${finalState.x},${finalState.y}) ${finalState.direction} STOPPED`)
    }
  });
});
