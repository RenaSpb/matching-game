import React, {useEffect, useState} from 'react';
import './App.css';
import Board from "./Board";
import {Modal, Button, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const emoji1 = ['🍉', '🍍', '🥒', '🥕', '🥥', '🍆', '🍈', '🥑', '🍒', '🍑'];
  const emoji2 = ['🚁', '🚢', '🚀', '🛴', '🚜', '🚲', '🚗', '🚕', '🚒', '🚂'];
  const emoji3 = ['🦋', '🐹', '🦇', '🐼', '🦎', '🐥', '🐢', '🐌', '🐞', '🐳'];


  const initialSquares = new Array(20).fill(
      {
          id: 0,
          img: '',
          isOpen: false
      }).map(el => ({...el, id: Math.random() }) )

  const[squares, setSquares] = useState(initialSquares)
  const[history, setHistory] = useState<string[]>([])
  const[countForPause, setCountForPause] = useState(0);
  const[countMoves, setCountMoves] = useState(0);
  const[countStop, setCountStop] = useState(0);
  const[showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    useEffect(() => {
        fillBoard()
    }, []);

    useEffect(() => {
        checkMove()
    }, [history]);

    useEffect(() => {
        if (countStop === emoji1.length) {
            handleShowModal();
        }
    }, [countStop]);

function fillBoard(){
    const emoji = getRandomEmojiSet()
      const doubleEmoji = [...emoji, ...emoji].sort(() =>
          Math.random()- 0.5);
      const newSquares = squares.map((el, index) =>
          ({...el, img: doubleEmoji[index], isOpen: false,}))
    setSquares(newSquares)
}

function getRandomEmojiSet(){
    const sets = [emoji1, emoji2, emoji3];
    const randomIndex = Math.floor(Math.random() * sets.length);
    return sets[randomIndex]
}
    function changeSquareSide(id: number, img: string)  {
        const isOpenSquare = squares.find(square => square.id === id)?.isOpen;
        if (isOpenSquare || countForPause >= 2) return;
        const updatedSquares = squares.map((el) =>
            el.id === id? {...el, isOpen: true } : el
        );

        setHistory([...history, img])
        setSquares(updatedSquares);
        setCountForPause(countForPause + 1);
    }


    function startNewGame() {
       setHistory([])
       fillBoard()
       setCountForPause(0);
       setCountMoves(0);
       setCountStop(0);
}
    function checkMove(){
        if(history.length % 2 === 0 && history.length !== 0 &&
            history[history.length -1] === history[history.length -2]){
            setTimeout(() => {
                setCountStop(countStop + 1)
                setCountForPause(0)
                setCountMoves(countMoves + 1)
            }, 700)

        }
        if(history.length % 2 === 0 &&
            history[history.length -1] !== history[history.length -2]){
            setTimeout(() => {
                const newSquares = squares.map(el =>
                    el.img === history[history.length -1] ||
                    el.img === history[history.length -2]
                        ? {...el, isOpen: false } : el
                )
                setCountForPause(0);
                setSquares(newSquares);
                setCountMoves(countMoves + 1)
            }, 700)

        }
    }
    console.log(history)
    return (
        <Container className="App">
            <h1 className='heading'>Matching</h1>
            <Board
                squares={squares}
                changeSquareSide={changeSquareSide}
            />
            <div className="text-center mt-5">
                 <Button  variant="secondary"
                          size="lg"
                          className="shadow-sm border-dark">
                     Moves: {countMoves}
                 </Button>
                    <Button
                        size="lg"
                        variant="warning"
                        onClick={startNewGame}
                        className="shadow-sm border-dark"
                        style={{ marginLeft: '80px' }}
                    >
                        Reset
                    </Button>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>You won!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Congratulations! Want to play again?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={() => {
                        handleCloseModal();
                        startNewGame();
                    }}>
                        Sure! One more :)
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default App;

