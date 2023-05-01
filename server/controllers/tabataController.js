const TabataModel = require("../models/TabataModels")

class TabataController {
    async getTabataPrograms(req,res) {
        try {
            //res.send("Test")
        } catch (e) {
            res.status(400).json({message: "Произошла ошибка при получении"})
        }
    }

    async addTabataProgram(req, res) {
        try {
            if (!req.body.title) {
                res.status(400).json({message: "Пожалуйста, добавьте заголовок программы"})
            }

            const { title, rounds, workoutTime, restTime, exercises } = req.body

            const tabataModel = new TabataModel({title, rounds, workoutTime, restTime, exercises})

            await tabataModel.save()

        } catch (e) {
            res.status(400).json({message: "Произошла ошибка при добавлении"})
        }
    }

    async editTabataProgram(req, res) {
        try {

        } catch (e) {
            res.status(400).json({message: "Произошла ошибка при редактировании"})
        }
    }

    async deleteTabataProgram(req, res) {
        try {

        } catch (e) {
            res.status(400).json({message: "Произошла ошибка при удалении"})
        }
    }
}

module.exports = new TabataController()