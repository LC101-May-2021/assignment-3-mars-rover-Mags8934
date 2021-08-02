const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  // 7 tests here!

  // Test 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(1127)
    expect(rover.position).toEqual(1127);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  })

// Test 8

it("response returned by receiveMessage contains name of message", function() {
    let rover = new Rover(1127);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message("TDD is Fun", commands);
    let response = rover.receiveMessage(message).message;
    // console.log(response);

    expect(response).toEqual(message.name);
  });


//  Test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let rover = new Rover(1127);
    let commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('STATUS_CHECK')];
    let message = new Message("TDD is Fun", commands);
    let response = rover.receiveMessage(message).results.length;
// console.log(response);
    expect(response).toEqual(message.commands.length)
  })


// Test 10
  it("responds correctly to status check command", function() {
    let rover = new Rover(1127);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message("TDD is Fun", commands);
    let response = rover.receiveMessage(message).results[0];
    let results = {completed: true,
                        roverStatus: {
                        mode: "NORMAL",
                        generatorWatts: 110,
                        position: 1127
                        }};
// console.log(response);
    expect(response).toEqual(results);
  })

 
// Test 11
    it("responds correctly to mode change command", function() {
    let rover = new Rover(1127)
    let commands = [new Command('MODE_CHANGE', 'NORMAL')];
    let message = new Message("TDD is Fun", commands);
    let response = rover.receiveMessage(message).results[0];
    let results = {completed: true}
// console.log(response)
    expect(response).toEqual(results);
  })


// Test 12
    it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
      let rover = new Rover(1127)
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 240)];
    let message = new Message("TDD is Fun", commands);
    let response = rover.receiveMessage(message).results[0];
    let results = { completed: false}
// console.log(response);
    expect(response).toEqual(results);
  })

 
// // Test 13
    it("responds with position for move command", function() {
      let rover = new Rover(1127)
      let commands = [new Command('MOVE', 240)];
      let message = new Message("TDD is Fun", commands);
      let response = rover.receiveMessage(message).results[0];
      let results = { completed: true, 
                      position: 240}
// console.log(response);
    expect(response).toEqual(results);
  })
    });
  