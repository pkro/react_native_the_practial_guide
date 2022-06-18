import { GoalType } from '../types';

function uniqueKey() {
    return Math.random().toString();
}

export function createEmptyGoal(): GoalType {
    return { text: '', id: uniqueKey() };
}
