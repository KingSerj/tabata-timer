const { Router } = require("express")
const tabataController = require("../controllers/tabataController")

const tabataRoutes = new Router()

tabataRoutes.get('/list', tabataController.getTabataPrograms);
tabataRoutes.post('/add', tabataController.addTabataProgram);
// tabataRoutes.put('/edit', tabataController.editTabataProgram);
// tabataRoutes.delete('/delete', tabataController.deleteTabataProgram);

module.exports = tabataRoutes