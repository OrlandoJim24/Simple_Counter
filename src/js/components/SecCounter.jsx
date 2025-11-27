import { useEffect, useState } from "react"

export const SecCounter = (props) => {
    const [counter, setCounter] = useState(0)
    const [isRunning, setIsRunning] = useState(true)
    const [isCountingDown, setIsCountingDown] = useState(false)
    const [startValue, setStartValue] = useState("")

    useEffect(() => {
        let intervalId

        if (isRunning) {
            intervalId = setInterval(() => {
                setCounter(prev => {
                    // COUNTDOWN MODE
                    if (isCountingDown) {
                        if (prev <= 0) {
                            setIsRunning(false)
                            setIsCountingDown(false)
                            return 0
                        }

                        const next = prev - 1

                        if (next <= 0) {
                            setIsRunning(false)
                            setIsCountingDown(false)
                            return 0
                        }

                        return next
                    }

                    // COUNT UP MODE
                    return prev + 1
                })
            }, 100)
        }

        return () => {
            if (intervalId) clearInterval(intervalId)
        }
    }, [isRunning, isCountingDown])


    const handlePause = () => {
        setIsRunning(false)
    }

    const handleResume = () => {
        setIsRunning(true)
    }

    const handleReset = () => {
        setCounter(0)
        setIsRunning(false)
        setIsCountingDown(false)
        setStartValue("")
    }

    const handleStartCountdown = () => {
        const num = parseInt(startValue, 10)

        if (isNaN(num) || num < 0) return

        setCounter(num)
        setIsCountingDown(true)
        setIsRunning(true)
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-12">

                    {/* COUNTER DISPLAY */}
                    <div className="d-flex counterclass">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                            </svg>
                        </div>

                        <div>{Math.floor((counter / 100000) % 10)}</div>
                        <div>{Math.floor((counter / 10000) % 10)}</div>
                        <div>{Math.floor((counter / 1000) % 10)}</div>
                        <div>{Math.floor((counter / 100) % 10)}</div>
                        <div>{Math.floor((counter / 10) % 10)}</div>
                    </div>


                    {/* COUNTDOWN INPUT */}
                    <div className="mt-3">
                        <label className="form-label me-2">Countdown from:</label>

                        <input
                            type="number"
                            className="form-control d-inline-block w-auto me-2"
                            value={startValue}
                            onChange={(e) => setStartValue(e.target.value)}
                            placeholder="Enter a number"
                        />

                        <button onClick={handleStartCountdown} className="btn btn-primary">
                            Start Countdown
                        </button>
                    </div>


                    {/* CONTROLS */}
                    <div className="mt-3">
                        <button onClick={handlePause} className="btn btn-danger me-2">Stop</button>
                        <button onClick={handleResume} className="btn btn-success me-2">Resume</button>
                        <button onClick={handleReset} className="btn btn-secondary">Reset</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
