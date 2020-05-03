const yargs = require("yargs");
const games = require("./games.js");

yargs.version = "1.1.0";

yargs.command({
  command: "add",
  describe: "Adding a chess game to the file",
  builder: {
    opening: {
      describe: "Name of the opening",
      demandOption: true,
      type: "string",
    },
    game: {
      describe: "Notation of the game",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    games.addGame(argv.opening, argv.game);
  },
});

yargs.command({
  command: "list",
  describe: "List all games in the file",
  handler() {
    games.listGames();
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a chess game",
  builder: {
    id: {
      describe: "Id of the game",
      demandOption: true,
      type: "number",
    },
  },
  handler(argv) {
    games.removeGame(argv.id);
  },
});

yargs.command({
  command: "read",
  describe: "read chess games of a specific opening",
  builder: {
    opening: {
      describe: "Name of the opening",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    games.readGames(argv.opening);
  },
});

yargs.parse();
