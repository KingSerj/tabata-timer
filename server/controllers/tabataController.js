const TabataModel = require("../models/TabataModels")

class TabataController {
    async getTabataPrograms(req,res) {
        try {
            const tabata = await TabataModel.find({}, { title: true, rounds: true, workTime: true, restTime: true, exercises: true })
            res.status(200).json(tabata)
        } catch (e) {
            res.status(400).json({message: "Произошла ошибка при получении"})
        }
    }

    async addTabataProgram(req, res) {

        try {
            if (!req.body.title) {
                res.status(400).json({message: "Пожалуйста, добавьте заголовок программы"})
            }

            const tabataModel = new TabataModel({
                title: req.body.title,
                rounds: req.body.rounds,
                workTime: req.body.workTime,
                restTime: req.body.restTime,
                exercises: req.body.exercises
            });

            await tabataModel.save()
            res.status(200).json({message: "Программа успешно добавлена"})

        } catch (e) {
            res.status(400).json({message: "Произошла ошибка при добавлении"})
        }
    }

    // async deleteTabataProgram(req, res) {
    //     try {
    //
    //     } catch (e) {
    //         res.status(400).json({message: "Произошла ошибка при удалении"})
    //     }
    // }

    // async editTabataProgram(req, res) {
    //     try {
    //
    //     } catch (e) {
    //         res.status(400).json({message: "Произошла ошибка при редактировании"})
    //     }
    // }
}

module.exports = new TabataController()