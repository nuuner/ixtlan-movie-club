export enum Step {
    Explanation = "Explanation",
    Voting = "Voting",
}

export let step = $state({current: Step.Explanation});