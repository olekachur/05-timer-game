import { useState, useRef } from "react"
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef();
    const dialog = useRef();

    const [timerReamaining, setTimerRemaining] = useState(targetTime * 1000);

    const timerIsActive = timerReamaining > 0 && timerReamaining < targetTime * 1000;

    if (timerReamaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset() {
        setTimerRemaining(targetTime * 1000); 
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimerRemaining(prev => prev - 10);
        }, 10);
    }

    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current);
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timerReamaining} onReset={handleReset} />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? "active" : undefined}>
                    {timerIsActive ? 'Time is rinning...' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}
