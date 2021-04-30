export class MarsRover {
  xAxis: number;
  yAxis: number;
  direction: string;
  constructor(xAxis: number, yAxis: number, direction: string) {
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.direction = direction;
  }

  MoveRover(command: string) {
    const moveCommands: {[key: string]:string} = {
      F: "MOVE FORWARD",
      B: "MOVE BACKWARD",
      L: "ROTATE LEFT",
      R: "ROTATE RIGHT",
    };
    const commands = command.split("");
    //check for illegal character commands and throw an error
    for (let i = 0; i < commands.length; i++) {
        const element = commands[i];
        if(!moveCommands[element]){
            throw new Error(`Invalid command ${element} in command string`)
        }
        
    }
  }
}
