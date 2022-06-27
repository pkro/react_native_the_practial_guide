import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

let min = 1;
let max = 100;

type directionType = 'higher' | 'lower';

function rnd(min: number, max: number, exclude: number): number {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber === exclude ? rnd(min, max, exclude) : randomNumber;
}

export function useGame(
    userNumber: number,
    setRoundsNeeded: (rounds: number) => void,
    setGameOver: (gameOver: boolean) => void,
) {
    const [currentGuess, setCurrentGuess] = useState(() => rnd(1, 100, userNumber));
    const [guesses, setGuesses] = useState<number[]>([currentGuess]);

    useEffect(() => {
        min = 1;
        max = 100;
    }, []);

    const game = (direction: directionType) => {
        if (
            (direction === 'lower' && userNumber > currentGuess) ||
            (direction === 'higher' && userNumber < currentGuess)
        ) {
            Alert.alert("Don't cheat", 'Malo!');
            return;
        }
        if (direction === 'higher') {
            min = currentGuess + 1;
        } else {
            max = currentGuess - 1;
        }

        const nextGuess = rnd(min, max, currentGuess);

        if (nextGuess === userNumber) {
            Alert.alert('you won', 'you da man');
            setGameOver(true);
        }
        setCurrentGuess(() => nextGuess);
        setGuesses((guesses) => [nextGuess, ...guesses]);
        setRoundsNeeded(guesses.length);
        return;
    };

    return { guesses, currentGuess, game };
}
