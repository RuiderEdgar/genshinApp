import CharacterCard from "../CharacterCard/CharacterCard";
import { GenshinAPI } from "../../api/genshin";
import styles from './ListCharacters.module.css'

const ListCharacters = ({ characters }) => {
    
    async function fetchCharacterInfo(character) {
        const characterInfoResponse = await GenshinAPI.fetchCharacterInfo(character);
        if (characterInfoResponse) {
            return characterInfoResponse
        }s
    }

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Characters</h2>
            <main className={styles.characterList_container}>
                {
                    characters.map((character) => <CharacterCard key={character} character={character} info={fetchCharacterInfo(character)}/>
                    )
                }
            </main>
        </section>
    );
};

export default ListCharacters;
