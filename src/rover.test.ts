import { MarsRover } from "./rover";

describe("Mars Rover", () => {
  it("should initialize mars rover", () => {
    const rover = new MarsRover(4, 2, "EAST");
    expect(rover).toBeTruthy();
    expect(rover.xAxis).toBe(4);
    expect(rover.yAxis).toBe(2);
    expect(rover.direction).toBe("EAST");
  });

  it("should throw an invalid command error", () => {
    const rover = new MarsRover(4, 2, "EAST");
    expect(() => rover.MoveRover("FGFFFRLB")).toThrow(
      Error
    );
  });
});
