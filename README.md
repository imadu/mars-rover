# New Store MARS ROVER code challenge

## Installing

Clone the project from github and run `yarn` to install dependencies.

## Testing 

Run `yarn run test`

## Start Application

To start the application run `yarn run start`

### Build Docker

run `docker build -t mars-rover .` in your terminal to build a new container image.

### Run app from container

run `docker run -it mars-rover` in your terminal to start the app from the container image.

## Using the app

You will need to enter the  coordinates(x and y), positions(north, south, east or west),obstacles and  commands for the app to run
- x: refers to the x axis of the rover. it should be an integer.
- y: refers to the y axis of the rover. it should be an integer.
- direction: should either be 'north', 'south', 'east' or 'west'.
- obstacle (optional): obstacles are optional, but they should be in the format - 'x:y,x:y,x:y'. e.g 3:3,1:1,1:3
- command: this is a string combination of 'L', 'R', 'F' and 'B' in  any  order that tells the rover to either move forward, backwards, rotate left (L) or right (R)

Enjoy playing with the rover :) 