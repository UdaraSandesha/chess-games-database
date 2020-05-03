const chalk = require("chalk");
const fs = require("fs");

const addGame = (opening, game) => {
  const games = loadGames();
  games.push({
    opening: opening,
    game: game,
  });

  writeGames(games);
  console.log(chalk.green.inverse("Game added to the file successfully!"));
};

const listGames = () => {
  const games = loadGames();
  games.forEach((game, index) => {
    console.log(
      `${chalk.green.inverse("Id :")} ${index} ${chalk.green.inverse(
        "Opening :"
      )} ${game.opening} ${chalk.green.inverse("Notation :")} ${game.game}`
    );
  });
};

const removeGame = (id) => {
  const games = loadGames();

  if (id < games.length && id >= 0) {
    const gamesToKeep = games.filter((game, index) => {
      if (index !== id) {
        return game;
      }
    });

    writeGames(gamesToKeep);
    console.log(chalk.green.inverse("Sucessfully removed the game!"));
  } else {
    console.log(chalk.red.inverse("Please enter a valid game id to remove!"));
  }
};

const readGames = (opening) => {
  const games = loadGames();
  let found = false;
  games.forEach((game, index) => {
    if (game.opening === opening) {
      found = true;
      console.log(
        `${chalk.green.inverse("Id :")} ${index}  ${chalk.green.inverse(
          "Notation :"
        )} ${game.game}`
      );
    }
  });
  if (!found) {
    console.log(chalk.inverse.red("No games found for the given opening!"));
  }
};

const loadGames = () => {
  try {
    const dataBuffer = fs.readFileSync("games.json");
    const gamesJSON = dataBuffer.toString();
    return JSON.parse(gamesJSON);
  } catch (e) {
    return [];
  }
};

const writeGames = (games) => {
  const gamesJSON = JSON.stringify(games);
  fs.writeFileSync("games.json", gamesJSON);
};

module.exports = {
  addGame: addGame,
  listGames: listGames,
  removeGame: removeGame,
  readGames: readGames,
};
