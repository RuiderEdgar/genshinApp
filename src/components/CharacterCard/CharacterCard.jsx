import { useState, useEffect } from "react";
import styles from './CharacterCard.module.css'

const CharacterCard = ({ info }) => {
    const [characterInfo, setCharacterInfo] = useState();

    async function getCharacterInfo() {
        const response = await info;
        setCharacterInfo(response);
    }
    useEffect(() => {
        getCharacterInfo();
    }, []);

    if (!characterInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.card_container}>
            <header>{characterInfo.name}</header>
            <main></main>
            <footer></footer>
        </div>
    );
};

export default CharacterCard;
