import { useCallback, useEffect, useMemo, useState } from "react"
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

const ShowCharacter = ({ characters, selectCharacter, onSubmit }) => {
    const [getCharacter, setGetCharacter] = useState();
    const [imageLink, setImageLink] = useState();
    const [characterInfo, setCharacterInfo] = useState();

    //Para hacer aparecer cualquier personaje por defecto al principio y no solo uno en especifico
    //*useCallback version
    //Este useCallback dependerá de dos props, ya que se ejecutará en funcion de si cambia el array de characters o si cambia el personaje seleccionado selectCharacter
    const getRandomCharacter = useCallback(() => {
        if (selectCharacter === null) {
            const randomNumber = Math.floor(Math.random() * characters.length);
            setGetCharacter(characters[randomNumber]);
        } else {
            setGetCharacter(selectCharacter);
        }
    }, [characters, selectCharacter]);

    //No todos los personajes tienen la imagen tipo splash art, por lo tanto se verifica y si no lo tiene, se usa el tipo de imagen card que todos tienen
    //*useCallback version
    const verifyCharacterImage = useCallback(async () => {
        try {
            await axios.get(
                `${BASE_URL}characters/${getCharacter}/gacha-splash`
            );
            setImageLink(`${BASE_URL}characters/${getCharacter}/gacha-splash`);
        } catch (error) {
            console.warn(error.message);
            if (error.response.status === 404) {
                console.warn(
                    "This character doesn't have gacha-splash image, we'll use the card image instead"
                );
                setImageLink(`${BASE_URL}characters/${getCharacter}/card`);
            }
        }
    }, [getCharacter]);

    //*useMemo version
    const fetchCharacterInfo = useMemo(() => {
        return async () => {
            const characterInfoResponse = await GenshinAPI.fetchCharacterInfo(
                getCharacter
            );
            if (characterInfoResponse) {
                setCharacterInfo(characterInfoResponse);
            }
        };
    }, [getCharacter]);

    useEffect(() => {
        if (characters) {
            getRandomCharacter();
        }
    }, [characters, selectCharacter]);

    useEffect(() => {
        if (getCharacter) {
            verifyCharacterImage();
            fetchCharacterInfo();
        }
    }, [getCharacter]);

    if (!characterInfo) {
        return (
            <div className={styles.loader_container}>
                <div className={styles.loader}></div>
            </div>
        );
    }

    return (
      <>
        {/* //*Cambiando el orden colocando primero un header que contiene el logo y la barra de busqueda */}
        <header
          className={styles.header_container}
          alt="Name of the page and search bar"
        >
          <Logo />
          <SearchBar characters={characters} onSubmit={onSubmit} />
        </header>

        {/* //*Posteriormente, debajo del encabezado colocamos la imagen del personaje, con su informacion */}
        <section
          className={styles.background_container}
          style={{
            background: getCharacter
              ? `linear-gradient(0deg, #000 0.65%, rgba(27, 127, 131, 0) 100%),
            url('${imageLink}') no-repeat center top / cover`
              : "black",
          }}
        >
          {/* //*Recolocando los componentes de la informacion del personaje* */}
          <section
            className={styles.character_container}
            alt="character information"
          >
            <section alt="character information">
              <Description
                name={characterInfo?.name}
                information={characterInfo?.description}
              />
              <Birthday birthday={characterInfo?.birthday} />
              <Weapon weapon={characterInfo?.weapon} />
            </section>
            <footer>
              <Nation nation={characterInfo?.nation} />
              <Stars rarity={characterInfo?.rarity} />
            </footer>
          </section>
        </section>
      </>
    );
};

export default ShowCharacter