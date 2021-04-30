import {MarsRover} from './rover'

describe('Mars Rover', () => {
    it('should initialize mars rover', ()=> {
        const rover = new MarsRover();
        expect(rover).toBeTruthy();
    })
})