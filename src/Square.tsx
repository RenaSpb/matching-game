import React, {useState} from 'react';
import {ISquare} from "./Board"

interface IProps{
    square: ISquare
    changeSquareSide: (id: number, img: string) => void;
}

const Square = (props:IProps) => {
       return (
        <div className={`square ${props.square.isOpen ? 'flipped' : ''}`}
             onClick={() => props.changeSquareSide(props.square.id, props.square.img)}>
            {props.square.isOpen ? props.square.img : ''}
        </div>
    );
};

export default Square;