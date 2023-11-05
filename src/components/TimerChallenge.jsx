import { useRef, useState } from "react"

export default function TimerChallenge(props) {
    const [timeExpired, setTimeExpired] = useState(false)
    const [timeStarted, setTimeStarted] = useState(false)
    const timer = useRef()

    function handleStart() {
        timer.current = setTimeout(() => {
            setTimeExpired(true)
            setTimeStarted(false)
        }, props.targetTime * 1000)
        setTimeStarted(true)
    }

    function handleStop() {
        clearTimeout(timer.current)
    }

    return (
        <section className="challenge">
            <h2>{props.title}</h2>
            {timeExpired && <p>Time is up! You lost!</p>}
            <p className="challenge-time">
                {props.targetTime} second{props.targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timeStarted ? handleStart : handleStop}>{timeStarted ? 'Stop' : 'Start'} Challenge</button>
            </p>
            <p className={timeStarted ? "active" : undefined}>
                {timeStarted ? 'Time is running...' : 'Time inactive'}
            </p>
        </section>
    )

}