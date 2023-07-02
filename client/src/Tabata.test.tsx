import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Root } from './modules/Root';
import { Settings } from "./pages/Settings";

describe("Успешные рендеры", () => {
    test("Успешный рендер компонента Root", () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Root/>
            </MemoryRouter>
        )
        expect(screen.getByText(/ABOUT/i)).toBeInTheDocument()
        expect(screen.getByText(/TIMER/i)).toBeInTheDocument()
        expect(screen.getByText(/SETTINGS/i)).toBeInTheDocument()
        expect(screen.getByText(/PROGRAMS/i)).toBeInTheDocument()
    })
    test("Успешный рендер Input Program Name", () => {
        render(<Settings/>)
        expect(screen.getByText(/Program name/i)).toBeInTheDocument()
    })
    test("Успешный рендер кнопки SAVE PROGRAM", () => {
        render(<Settings/>)
        expect(screen.getByText(/SAVE PROGRAM/i)).toBeInTheDocument()
    })
})

describe("Работа функционала", () => {
    test("Кнопка SAVE PROGRAM в начале недоступна", () => {
        render(<Settings/>)
        expect(screen.getByText(/SAVE PROGRAM/i)).toBeDisabled()
    })
    test("Удаление второго упражнения из массива упражнений", () => {
        render(<Settings/>)

        const addExerciseButton = screen.getByText(/ADD EXERCISE/i)
        fireEvent.click(addExerciseButton)

        const deleteButton = screen.getAllByText(/Delete/i)[1]

        const exercise2 = screen.getByText(/Exercise 2:/i)
        expect(exercise2).toBeInTheDocument()

        fireEvent.click(deleteButton)
        expect(exercise2).not.toBeInTheDocument()
    })
})
