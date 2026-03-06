import backspace from './assets/backspace-icon.jpg'; 

export default function Keypad({ usedKeys }) {
    const topRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]
    const middleRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"]
    const bottomRow = ["z", "x", "c", "v", "b", "n", "m"]

    return (
        <div className='keypad'>
            {topRow.map((l) => {
                const color = usedKeys[l]
                return (
                    <div key={l} className={color}>{l}</div>
                )
            })}
            <br />
            {middleRow.map((l) => {
                const color = usedKeys[l]
                return (
                    <div key={l} className={color}>{l}</div>
                )
            })}
            <br />
            <div key="Enter" style={{ width: "15%", fontSize: "13px" }}>Enter</div>
            {bottomRow.map((l) => {
                const color = usedKeys[l]
                return (
                    <div key={l} className={color}>{l}</div>
                )
            })}
            <div key="Backspace" style={{
                width: "15%", textAlign: "center", whiteSpace: "nowrap"
            }}
                onClick={() => handleKeyupVirtual("Backspace")}>

                <span className="helper" style={{
                    display: "inline-block", height: "100%", verticalAlign: "middle"
                }}>
                </span>
                <img src={backspace} alt = "backspace-icon"
                    style={{ width: "20px", verticalAlign: "middle" }}>
                </img>
            </div>        
        </div>
    )
}