import { useState } from "react";
import "./style.css";

const calculateWinner = (squares) => {
    let indexes = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let index = 0; index < indexes.length; index++) {
        const [a, b, c] = indexes[index];
        if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
            const btn1 = document.getElementById(a);
            const btn2 = document.getElementById(b);
            const btn3 = document.getElementById(c);

            btn1.style.background = "#4bb543";
            btn2.style.background = "#4bb543";
            btn3.style.background = "#4bb543";

            return squares[a];
        }
    }

    if(!squares.includes(null)){
       return "Draw";
    }

    return null;
}

const Square = ({ value, onSquareClick, id }) => {
    return <button className="square" onClick={onSquareClick} id={id}>{value}</button>
}

const Board = () => {
    const [turn, setTurn] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));

    let winner = calculateWinner(squares);

    const handleClick = (i) => {
        if (squares[i] !== null || calculateWinner(squares)) {
            return;
        }

        let newSquares = [...squares];
        setTurn(!turn);
        newSquares[i] = turn ? "X" : "O";
        setSquares(newSquares);
    }

    const reset = () => {
        for(let i = 0;i < 9;i++){
            document.getElementById(i).style.background = "white";
        }

        setSquares(Array(9).fill(null));
        setTurn(true);
    }

    return (
        <>
            {winner === "X" ? <h2 className="text winner">X wins</h2> : winner === "O" ? <h2 className="text winner">O wins</h2> : winner === "Draw" ? <h2 className="text draw">Game Draw</h2> : <h2 className="text">Player : {turn ? "X" : "O"}</h2>}

            <div className="board">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} id={0} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} id={1} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} id={2} />
            </div>

            <div className="board">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} id={3} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} id={4} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} id={5} />
            </div>

            <div className="board">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} id={6} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} id={7} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} id={8} />
            </div>

            {
                squares.includes("X") || squares.includes("O") ?
                    <button className="btn" onClick={() => reset()}>Start new game</button>
                    :
                    ""
            }
        </>
    )
}

export default Board;
