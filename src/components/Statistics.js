import React from "react";

export default function Statistics({turn, isCorrect}) {

    const objStatistics = localStorage.wordlestruckStatistics //statistics from localstorage
        ? JSON.parse(localStorage.wordlestruckStatistics)
        : Array(7).fill(0);

    //remove first element (losses) to avoid confusing the original array
    let objStatisticsWithout0 = [...objStatistics]; //create a copy
    objStatisticsWithout0.shift(); //remove losses

    const totalGames = objStatisticsWithout0.reduce((sum, stat) => sum + stat, 0);

    return(
        <div className="statistics">
            <h5>Guess Distribution</h5>
            <table style={{ width: "100%" }}><tbody>
                {objStatisticsWithout0.map((stat, index) => {
                    let guessDistIndex = index + 1;

                    let barWidth = (stat === 0) ? "4"
                        : (Math.floor((stat / totalGames) * 80) + 8).toString();

                    let barColor = isCorrect && (guessDistIndex === turn) ? "green"
                        : "rgb(107, 107, 109)";
                        
                    return (
                        <tr key={guessDistIndex}>
                            <td>{guessDistIndex}</td>
                            <td>
                                <div className="barChart" style={{
                                width: `${barWidth}%`,
                                backgroundColor: `${barColor}`
                            }}>
                                {stat}
                            </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody></table>
        </div>

    );
}
