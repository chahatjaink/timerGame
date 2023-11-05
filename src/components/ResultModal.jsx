import { forwardRef, useImperativeHandle, useRef } from "react"

const ResultModal = forwardRef(function ResultModal(props, ref) {
    const dialog = useRef()
    const userLost = props.remainingTime <= 0
    const formattedRemainingTime = (props.remainingTime / 1000).toFixed(2)
    const score = Math.round((1 - (props.remainingTime / (props.targetTime * 1000))) * 100)

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal()
            }
        }
    })

    return (
        <dialog ref={dialog} className="result-modal">
            <h2> {userLost ? 'You lost!' : `Your score: ${score}`}</h2>
            <p>The target time was <strong>{props.targetTime} seconds.</strong></p>
            <p>You stopped the timer in <strong>In {formattedRemainingTime} seconds left</strong></p>
            <form method="dialog" onSubmit={props.onReset}>
                <button >Close</button>
            </form>
        </dialog>
    )
})

export default ResultModal