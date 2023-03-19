import { useState, useEffect } from "react";
import Bow from "../../assets/images/Bow.webp";
import Catalyst from "../../assets/images/Catalyst.webp";
import Claymore from "../../assets/images/Claymore.webp";
import Polearm from "../../assets/images/Polearm.webp";
import Sword from "../../assets/images/Sword.webp";
import styles from './CharacterCard.module.css'

const CharacterCard = ({ info, character, onHandle }) => {
    const [characterInfo, setCharacterInfo] = useState();
    const [image, setImage] = useState();

    async function getCharacterInfo() {
        const response = await info;
        setCharacterInfo(response);
    }

    const weaponImage = [
        <img className={styles.imageWeapon} src={Bow} alt={Bow} />,
        <img className={styles.imageWeapon} src={Catalyst} alt={Catalyst} />,
        <img className={styles.imageWeapon} src={Claymore} alt={Claymore} />,
        <img className={styles.imageWeapon} src={Polearm} alt={Polearm} />,
        <img className={styles.imageWeapon} src={Sword} alt={Sword} />,
    ];

    const arrayWeapons = ["Bow", "Catalyst", "Claymore", "Polearm", "Sword"];

    const index = arrayWeapons.indexOf(characterInfo?.weapon);

    const handleClick = () => {
        onHandle(character);
    }

    useEffect(() => {
        if (characterInfo?.weapon) {
            setImage(weaponImage[index]);
        }
    }, [characterInfo?.weapon]);

    useEffect(() => {
        getCharacterInfo();
    }, []);

    if (!characterInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.card_container} onClick={handleClick}>
            <header className={styles.header}>{characterInfo.name}</header>
            <main className={styles.main}>
                <img
                    className={styles.image}
                    src={`https://api.genshin.dev/characters/${character}/card`}
                    alt="image card character"
                />
            </main>
            <footer className={styles.footer}>
                <aside>
                    <img className={styles.imageElement}
                        src={`https://api.genshin.dev/elements/${characterInfo.vision.toLowerCase()}/icon`}
                        alt="element icon"
                    />
                </aside>
                <aside>
                    <p className={styles.nation}>{characterInfo.nation}</p>
                </aside>
                {image}
            </footer>
        </div>
    );
};

export default CharacterCard;
