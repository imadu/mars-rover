import {MarsRover} from './rover'

describe('Mars Rover', () => {
    it('should initialize mars rover', ()=> {
        const rover = new MarsRover(4, 2, 'EAST');
        expect(rover.xAxis).toBe(4);
        expect(rover.yAxis).toBe(2);
        expect(rover.direction).toBe('EAST');
    })
})