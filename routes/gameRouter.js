const express = require("express");
const router = express.Router();
const uuidv4 = require("uuid").v4;

let games = [
  {
    id: "adowb1b3bb",
    game: "League of Legends",
    description: "League of Legends is a team-based game with over 140 champions to make epic plays with."
  },
  {
    id: "kd7b9ks2nda",
    game: "PlayerUnknown's Battlegrounds",
    description: "PLAYERUNKNOWN'S BATTLEGROUNDS is a last-man-standing shooter being developed with community feedback."
  }
];

router.get("/get-all-games", function (req, res) {
  res.json({games});
});

router.get("/get-game-by-id/:id", function (req, res) {
  const id = req.params.id;
  let foundGame;
  games.forEach(function (game) {
    if (game.id === id) {
      foundGame = game;
    }
  });
  if (!foundGame) {
    res.json({ message: "The game with the id does not exist, please check id" });
  } else {
    res.json({ foundGame });
  }
});

router.get("/get-todos-by-done/:boolean", function (req, res) {
  const boolean = req.params.boolean;
  let newDoneArray = [];
  todos.forEach(function (element) {
    if (element.done === boolean) {
      newDoneArray.push(element);
    }
  });
  res.json(newDoneArray);
});

// extra credit!!!!
router.get("/get-game-by-name/:name", function (req, res) {
  console.log(req.params.name)
  let foundGame;
  let name = req.params.name;
  games.forEach(function (item) {
    if (item.game === name) {
      foundGame = item;
      console.log('working')
    }
  });
  if (!foundGame) {
    res.json({ message: "The game does not exist, please check name" });
  } else {
    res.json({ foundGame });
  }
});

router.post("/create-new-game", function (req, res) {
  let newGame = {
    id: uuidv4(),
    game: req.body.game,
    description:req.body.description
  };
  if(newGame.game === '' || newGame.description === ''|| newGame.game === undefined || newGame.description === undefined){
    res.json({ message: "cannot leave text area blank"});
  }
  let isTrue = true;
  games.forEach((game)=>{ 
    if (newGame.game === game.game){
      res.json({ message: "Game already exists, cannot add game"});
      isTrue = false;
    }
  });
  if(isTrue){
    games.push(newGame);
    res.json({ games });
   }
});

router.put("/update-game/:id", function (req, res) {
  let canUpdate = false;
  let foundGame;

  games.forEach(function (game) {
    if (game.id === req.params.id) {
      canUpdate = true;
      foundGame = game;
    }
  });

  if(!canUpdate){
    res.json({ message: "game not found, cannot update"});
  }
  if (req.body.updatedName !== undefined && req.body.updatedName !== "" ) {
    foundGame.game = req.body.updatedName;
  } 
  if (req.body.updatedDescription !== undefined && req.body.updatedDescription !== ""){
    foundGame.description = req.body.updatedDescription;
  }
  res.json({ games });
});

router.delete("/delete-game/:id", function (req, res) {
  let isFound = games.findIndex((game) => game.id === req.params.id);
  if (isFound === -1) {
    res.json({ message: "game not found, cannot delete" });
  } else {
    games.splice(isFound, 1);
    res.json({ games });
  }
});

module.exports = router;
