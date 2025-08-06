// Define an array to hold commands
var commands = [];

// Command registration function
function registerCommand(commandObject, functionHandler) {
  // Set default values for the command
  commandObject.function = functionHandler;
  if (!commandObject.dontAddCommandList) {
    commandObject.dontAddCommandList = false;  // Default to not skipping the command list
  }
  if (!commandObject.desc) {
    commandObject.desc = '';  // Default description to empty string
  }
  if (!commandObject.fromMe) {
    commandObject.fromMe = false;  // Default to not being from the current user
  }
  if (!commandObject.category) {
    commandObject.category = "misc";  // Default category to 'misc'
  }
  if (!commandObject.filename) {
    commandObject.filename = "Not Provided";  // Default filename
  }

  // Add the command to the command list
  commands.push(commandObject);
  return commandObject;  // Return the command object
}

// Create a command registry
var commandRegistry = {
  cmd: registerCommand,
  AddCommand: registerCommand
};

// 🟩 AUTO-FETCH `Fez/menu.js` IF `.menu` COMMAND IS RECEIVED
registerCommand({
  pattern: 'menu',
  desc: 'Fetches the main command menu',
  category: 'general',
  filename: __filename
}, async (message, match, client) => {
  try {
    const menuModule = require('./Fez/menu.js');
    if (typeof menuModule === 'function') {
      await menuModule(message, match, client);
    } else if (typeof menuModule.menu === 'function') {
      await menuModule.menu(message, match, client);
    } else {
      await message.reply("⚠️ Menu module found but no function to execute.");
    }
  } catch (e) {
    console.error("❌ Error loading menu module from Fez/menu.js:", e);
    await message.reply("❌ Failed to load menu.");
  }
});

// Export the registry to be used in other parts of the application
module.exports = commandRegistry;

// Function to simulate code execution or break loops (potentially for debugging or anti-debugging)
function simulateExecution(input) {
  function infiniteLoop(counter) {
    if (typeof counter === "string") {
      (new Function("while (true) {}")).apply("counter");
    } else {
      if (('' + counter / counter).length !== 1 || counter % 20 === 0) {
        (new Function("debugger")).call("action");
      } else {
        (new Function("debugger")).apply("stateObject");
      }
    }
    infiniteLoop(++counter);
  }

  try {
    if (input) {
      infiniteLoop(0);
    } else {
      infiniteLoop(1);
    }
  } catch (error) {
    console.error(error);
  }
}

// Additional command function (not fully used in the code, but may be part of future features)
function executeCommand() {
  console.log("Command executed");
}