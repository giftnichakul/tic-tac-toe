import React, { useState } from 'react';

const winCase =
  [ [0,1,2]
  , [3,4,5]
  , [6,7,8]
  , [0,3,6]
  , [1,4,7]
  , [2,5,8]
  , [0,4,8]
  , [2,4,6] ]

function findWinner(value: string[]){
  for (let i=0;i < winCase.length; i++){
    let win = winCase[i];
    if(!value[win[0]] || !value[win[1]] || !value[win[2]]) continue;
    if(value[win[0]] === value[win[1]] && value[win[0]] === value[win[2]]){
      return i;
    }
  }
  return -1;
}

export function TicTacToe() {

  const CIRCLE = 'O';
  const CROSS = 'X';

  const [player, setPlayer] = useState<boolean>(true);
  const [value, setValue] = useState<string[]>(Array(9).fill(''));
  const [color, setColor] = useState<string[]>(Array(9).fill('dark:text-white text-black'));
  const [result, setResult] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const [disable, setDisable] = useState<boolean[]>(Array(9).fill(false));


  const updateBoard = (index: number) => {
    const tmpValue = value;
    const tmpDisable = disable
    if(player) tmpValue[index] = CIRCLE;
    else tmpValue[index] = CROSS;

    tmpDisable[index] = true;

    setValue(tmpValue);
    setDisable(tmpDisable);
    setCount(count => count + 1);
    let winner = findWinner(tmpValue);
    if(winner !== -1){
      const tmpColor = color;
      for(let idx of winCase[winner]){
        tmpColor[idx] = 'text-rose-200';
      }
      setColor(tmpColor);
      setDisable(Array(9).fill(true));
      setResult(`${player ? CIRCLE : CROSS} wins, click restart to play again!!`);
    }else{
      setPlayer(!player);
      if(count === 8){
        setResult('The game ended in a tie, click restart to play again!!');
      }
    }
  }

  const restart = () => {
    setValue(Array(9).fill(''));
    setDisable(Array(9).fill(false));
    setResult('');
    setColor(Array(9).fill('dark:text-white text-black'));
    setPlayer(true);
    setCount(0);
  }

  function Square({ circle, index} : { circle: string, index: number }) {
    return (
      <button className={`${color[index]} dark:bg-black bg-white text-8xl h-24 md:h-36
      `}
      disabled={disable[index]}
      onClick={() => { updateBoard(index)}}>
        {circle}
      </button>
    )
  }

  function Player({ player, name } : { player: boolean, name: string}) {
    let style: string;
    if(result){
      style = 'bg-inherit text-gray-400';
    }else{
      if(player) style='bg-slate-200 text-black';
      else style='bg-inherit text-gray-400';
    }
    return (
      <div className={`p-4 rounded-md text-2xl ${style}`}>
        <h1>{name} Turns</h1>
      </div>
    )
  }

  return (
  <>
    <h1 className='text-black dark:text-white text-center pb-7 font-medium'>{result}</h1>
    <div className='flex justify-center'>
      <div className='grid grid-cols-3 gap-1 bg-black dark:bg-white w-[300px] md:w-[450px]'>
        {value.map((item, idx) => {
          return <Square key={idx} index={idx} circle={item} />
        })}
      </div>
    </div>
    <div className='mt-6 flex sm:flex-row flex-col justify-around items-center'>
      <div className='w-full sm:w-fit sm:gap-3 flex justify-around pb-8 sm:p-0'>
        <Player name={CIRCLE} player={player}/>
        <Player name={CROSS} player={!player}/>
      </div>
      <button className='dark:bg-sky-500/50 bg-rose-900 rounded-lg py-2 px-4 text-white'
        onClick={() => {restart()}}>Restart
      </button>
    </div>
  </>
  );
}
