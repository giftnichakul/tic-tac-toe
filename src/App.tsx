import React, { useEffect, useState } from 'react';
import { TicTacToe } from './components/TicTacToe';
import { FiMoon, FiSun } from "react-icons/fi";

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if(window.matchMedia(('prefers-color-schme-dark')).matches){
      setTheme('dark');
    }else{
      setTheme('light');
    }
  }, [])

  useEffect(() => {
    if(theme==='dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme])

  const handleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className='h-screen dark:bg-black bg-white'>
      <nav className='flex justify-between px-6 py-4'>
        <h1 className='text-2xl font-bold text-center text-black dark:text-white'>TicTacToe 💖</h1>
        <button onClick={handleTheme} className='bg-white rounded-full bg-zinc-300 p-2'>
          <div className=''>
            { theme === 'dark' ? <FiMoon className='text-2xl bg-inherit'/> : <FiSun className='text-2xl'/>}
          </div>
        </button>
      </nav>
      <hr />
      <div className='px-10 md:px-20 py-8'>
        <TicTacToe />
      </div>
    </div>
  );
}

export default App;
