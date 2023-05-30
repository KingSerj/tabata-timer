const { Router } = require("express")
const tabataController = require("../controllers/tabataController")

const tabataRoutes = new Router()

tabataRoutes.get("/titles", tabataController.getTabataTitles);
tabataRoutes.post("/settings", tabataController.getTabataSettings)
tabataRoutes.post("/add", tabataController.addTabataProgram);
tabataRoutes.put("/edit", tabataController.editTabataProgram);
tabataRoutes.delete("/delete", tabataController.deleteTabataProgram);

module.exports = tabataRoutes