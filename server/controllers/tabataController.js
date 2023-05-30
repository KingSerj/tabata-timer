const TabataModel = require("../models/TabataModels")

class TabataController {
    async getTabataTitles(req,res) {
        try {
            const tabata = await TabataModel.find({}, { title: true })
            res.status(200).json(tabata)
        } catch (e) {
            res.status(400).json({message: "Произошла ошибка при получении названий программ"})
        }
    }

    async getTabataSettings(req,res) {
        try {
            const tabata = await TabataModel.findById(req.body._id, { title: true, rounds: true, workTime: true, restTime: true, exercises: true })
            res.status(200).json(tabata)
        } catch (e) {
            res.status(400).json({message: "Произошла ошибка при получении настроек программы"})
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
            res.status(400).json({message: "Произошла ошибка при добавлении программы"})
        }
    }

    async deleteTabataProgram(req, res) {
        try {
            const tabata = await TabataModel.findByIdAndRemove(req.body._id)
            res.status(200).json(tabata)
        } catch (e) {
            res.status(400).json({message: "Произошла ошибка при удалении программы"})
        }
    }

    async editTabataProgram (req, res) {
        try {
            if (!req.body._id) {
                res.status(400).json({message: "Пожалуйста, проверьте id"})
            }

            await TabataModel.findByIdAndUpdate(req.body._id, {
                title: req.body.title,
                rounds: req.body.rounds,
                workTime: req.body.workTime,
                restTime: req.body.restTime,
                exercises: req.body.exercises
            }, { new: true })

            res.status(200).json({message: "Программа была успешна отредактирована"})

        } catch (e) {
            res.status(400).json({message: "Произошла ошибка при редактировании программы"})
        }
    }
}

module.exports = new TabataController()