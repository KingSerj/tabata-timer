import React, {useEffect, useState} from "react";
import {Box} from "../../components/ui/Box";
import {Typo} from "../../components/ui/Texts/Typo";
import {MainText} from "../../components/ui/Texts/Main";
import {Input} from "../../components/ui/Input";
import {Exercise} from "../../components/Exercise";
import {Button} from "../../components/ui/Button";
import {useFetchTabata} from "../../hooks/useFetchTabata";
import {Modal} from "../../components/ui/Modal";

export const Settings = () => {
    const [programSettings, setProgramSettings] = useState({
        title: "",
        rounds: "",
        workTime: "",
        restTime: "",
        exercises: [""]
    });
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const { title, workTime, restTime, rounds, exercises } = programSettings;

    useEffect(() => {
        console.log(programSettings, "Изменение");
    }, [programSettings]);

    const handleAddExercise = () => {
        setProgramSettings((prevSettings) => ({
            ...prevSettings,
            exercises: [...prevSettings.exercises, ""],
        }));
    };

    const handleDeleteExercise = (index) => {
        const updatedExercises = [...exercises];
        updatedExercises.splice(index, 1);
        setProgramSettings((prevSettings) => ({
            ...prevSettings,
            exercises: updatedExercises,
        }));
    };

    const handleExerciseChange = (event, index) => {
        const updatedExercises = [...exercises];
        updatedExercises[index] = event.target.value;
        setProgramSettings((prevSettings) => ({
            ...prevSettings,
            exercises: updatedExercises
        }));
    };

    const handleTitleAdd = (event) => {
        setProgramSettings((prevSettings) => ({
            ...prevSettings,
            title: event.target.value
        }));
    };

    const handleWorkoutTimeAdd = (event) => {
        setProgramSettings((prevSettings) => ({
            ...prevSettings,
            workTime: parseInt(event.target.value)
        }));
    };

    const handleRestTimeAdd = (event) => {
        setProgramSettings((prevSettings) => ({
            ...prevSettings,
            restTime: parseInt(event.target.value)
        }));
    };

    const handleRoundsAdd = (event) => {
        setProgramSettings((prevSettings) => ({
            ...prevSettings,
            rounds: parseInt(event.target.value),
        }));
    };

    const savedProgram = useFetchTabata("http://localhost:3002/api/tabata/add", "POST")
    const onSave = async (e) => {
        e.preventDefault();
        await savedProgram({
            title: title,
            rounds: rounds,
            exercises: exercises,
            workTime: workTime,
            restTime: restTime,
        });
        setProgramSettings({
            title: "",
            rounds: "",
            workTime: "",
            restTime: "",
            exercises: [""]
        })
        setShowSuccessModal(true)

        setTimeout(() => {
            setShowSuccessModal(false)
        }, 1000)
    };

    const disabled = !title || !rounds || !workTime || !restTime || exercises.some((exercise) => exercise.trim() === "")

    return (
        <Box>
            <Typo>Settings</Typo>
            <br />
            <MainText>Time should be in seconds, ex: 1 min = 60s.</MainText>
            <Input
                label={"Program name:"}
                type={"text"}
                value={title}
                onChange={handleTitleAdd}
            />
            <Input
                label={"Workout Time:"}
                type={"number"}
                value={workTime}
                onChange={handleWorkoutTimeAdd}
            />
            <Input
                label={"Rest Time:"}
                type={"number"}
                value={restTime}
                onChange={handleRestTimeAdd}
            />
            <Input
                label={"Rounds:"}
                type={"number"}
                value={rounds}
                onChange={handleRoundsAdd}
            />
            <Typo>Exercises:</Typo>
            <Button onClick={handleAddExercise}>ADD EXERCISE</Button>
            <Button onClick={onSave} disabled={disabled}>SAVE PROGRAM</Button>
            {showSuccessModal && <Modal>Программа успешно сохранена</Modal>}
            {exercises.map((exercise, index) => (
                <Exercise
                    key={index}
                    index={index + 1}
                    value={exercise}
                    onChange={(event) => handleExerciseChange(event, index)}
                    onClick={() => handleDeleteExercise(index)}
                />
            ))}
        </Box>
    );
};