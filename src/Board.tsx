import React from 'react';
import Square from "./Square";

export interface ISquare {
    id: number,
    img: string,
    isOpen: boolean
}
interface IProps {
    squares: ISquare[],
    changeSquareSide: (id: number, img: string) => void;
   }

const Board = (props: IProps) => {
    return (
        <div className="board">
            {
                props.squares.map(square => (
                    <Square
                    square={square}
                    key={square.id}
                    changeSquareSide={props.changeSquareSide}
                    />
                ))
            }
        </div>
    );
};

export default Board;