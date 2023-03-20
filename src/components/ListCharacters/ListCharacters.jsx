import { useEffect, useState } from "react";
import CharacterCard from "../CharacterCard/CharacterCard";
import { GenshinAPI } from "../../api/genshin";
import styles from "./ListCharacters.module.css";

const ListCharacters = ({ characters, onHandle }) => {
    const [characterInfoResponses, setCharacterInfoResponses] = useState([]);

    async function fetchCharacterInfo(characters) {
        const characterInfoPromises = characters.map((character) => {
            return GenshinAPI.fetchCharacterInfo(character);
        });
        const characterInfoResponses = await Promise.all(characterInfoPromises);
        return characterInfoResponses;
    }

    useEffect(() => {
        async function fetchCharacterData() {
            const response = await fetchCharacterInfo(characters);
            setCharacterInfoResponses(response);
        }
        fetchCharacterData();
    }, [characters]);

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Characters</h2>
            <main className={styles.characterList_container}>
                {characters.map((character, i) => (
                    <CharacterCard
                        key={character}
                        character={character}
                        info={characterInfoResponses[i]}
                        onHandle={onHandle}
                    />
                ))}
            </main>
        </section>
    );
};

export default ListCharacters;
