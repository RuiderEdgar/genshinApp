import { useEffect, useState } from "react"
import axios from "axios"
import Logo from "../Logo/Logo"
import SearchBar from "../SearchBar/SearchBar"
import Description from "../Description/Description"
import Stars from "../Stars/Stars"
import Birthday from "../Birthday/Birthday"
import Weapon from "../Weapon/Weapon"
import Nation from "../Nation/Nation"
import { GenshinAPI } from "../../api/genshin"
import { BASE_URL } from "../../config"
import styles from './ShowCharacter.module.css'

const ShowCharacter = ({characters}) => {
    const [getCharacter, setGetCharacter] = useState()
    const [imageLink, setImageLink] = useState()
    const [characterInfo, setCharacterInfo] = useState()

    //Para hacer aparecer cualquier personaje por defecto al principio y no solo uno en especifico
    const getRandomCharacter = () => {
        const randomNumber = Math.floor(Math.random() * characters.length)
        setGetCharacter(characters[randomNumber])
    }

    //No todos los personajes tienen este tipo de imagen, por lo tanto se verifica y si no lo tiene, se usa otro tipo de imagen que todos tienen
    async function verifyCharacterImage () {
        try{
            await axios.get(
                `${BASE_URL}characters/${getCharacter}/gacha-splash`
            );
            setImageLink(`${BASE_URL}characters/${getCharacter}/gacha-splash`);
        }catch(error){
            console.warn(error.message)
            if (error.response.status === 404) {
                console.warn(
                    "This character doesn't have gacha-splash image, we'll use the card image instead");
                    setImageLink(
                        `${BASE_URL}characters/${getCharacter}/card`
                    );
            }
        }
    }

    async function fetchCharacterInfo() {
        const characterInfoResponse = await GenshinAPI.fetchCharacterInfo(getCharacter);
        if (characterInfoResponse) {
            setCharacterInfo(characterInfoResponse);
        }
    }

    useEffect(() => {
        if (characters) {
            getRandomCharacter()
        }
    }, [characters])

    useEffect(() => {
        if (getCharacter) {
            verifyCharacterImage()
            fetchCharacterInfo()
        }
    }, [getCharacter])
    
    return (
        <main
            className={styles.background_container}
            style={{
                background: getCharacter
                    ? `linear-gradient(0deg, #000 0.65%, rgba(27, 127, 131, 0) 100%),
                    url('${imageLink}') no-repeat center / cover`
                    : "black",
            }}
        >
            <section className={styles.header_container}>
                <Logo />
                <SearchBar />
            </section>
            <section className={styles.info_container}>
                <Description name={characterInfo?.name} information={characterInfo?.description}/>
                <Stars rarity={characterInfo?.rarity}/>
                <Birthday birthday={characterInfo?.birthday}/>
                <Weapon weapon={characterInfo?.weapon}/>
                <Nation nation={characterInfo?.nation}/>
            </section>
            <footer></footer>
        </main>
    );
}

export default ShowCharacter