import { useRef, useState } from "react"
import ResultModal from "./ResultModal"

export default function TimerChallenge(props) {
    const [timeRemaining, setTimeRemaining] = useState(props.targetTime * 1000)
    const isActiveTime = timeRemaining > 0 && timeRemaining < props.targetTime * 1000
    const timer = useRef()
    const dialog = useRef()

    if (timeRemaining <= 0) {
        clearInterval(timer.current)
        dialog.current.open()
    }

    function handleReset() {
        setTimeRemaining(props.targetTime * 1000)
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10)
        }, 10);
    }

    function handleStop() {
        dialog.current.open()
        clearInterval(timer.current)
    }

    return (
        <>
            <ResultModal ref={dialog} onReset={handleReset} targetTime={props.targetTime} remainingTime={timeRemaining} />
            <section className="challenge">
                <h2>{props.title}</h2>
                <p className="challenge-time">
                    {props.targetTime} second{props.targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={isActiveTime ? handleStop : handleStart}>{isActiveTime ? 'Stop' : 'Start'} Challenge</button>
                </p>
                <p className={isActiveTime ? "active" : undefined}>
                    {isActiveTime ? 'Time is running...' : 'Time inactive'}
                </p>
            </section>
        </>
    )

}