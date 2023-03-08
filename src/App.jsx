import { useEffect, useState } from 'react'
import ShowCharacter from './components/ShowCharacter/ShowCharacter'
import { GenshinAPI } from './api/genshin'
import styles from './App.module.css'
//Orden
// 1. react, hooks librerias
// 2. otras librerias
// 3. componentes
// 4. js
// 5. assets
// 6. css
// Statefull - con estado / comportamiento

function App() {
  const [characters, setCharacters] = useState([])

  async function fetchCharacters(){
    const characterResponse = await GenshinAPI.fetchListCharacters();
    if (characterResponse.length > 0) {
      setCharacters(characterResponse);
    }
  }
  
  useEffect(() => {
    fetchCharacters()
  }, [])
  
  return (
    <div className="App">
      <ShowCharacter characters={characters}/>
    </div>
  )
}

export default App
