import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Bow from "../../assets/images/Bow.webp";
import Catalyst from "../../assets/images/Catalyst.webp";
import Claymore from "../../assets/images/Claymore.webp";
import Polearm from "../../assets/images/Polearm.webp";
import Sword from "../../assets/images/Sword.webp";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import styles from './CharacterCard.module.css'

const CharacterCard = ({ info, character, onHandle }) => {
    const [characterInfo, setCharacterInfo] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [weaponImage, setWeaponImage] = useState()

    async function getCharacterInfo() {
        const response = await info;
        setCharacterInfo(response);
        setIsLoading(false)
    }

    const weapons = {
        'Bow': Bow,
        'Catalyst': Catalyst,
        'Claymore': Claymore,
        'Polearm': Polearm,
        'Sword': Sword,
    }

    const handleClick = () => {
        onHandle(character);
    }
    
    useEffect(() => {
        if (characterInfo?.weapon) {
            setWeaponImage(weapons[characterInfo?.weapon]);
        }
    }, [characterInfo]);

    useEffect(() => {
        if (info) {
            setIsLoading(true);
            getCharacterInfo();
        }
    }, [info]);

    if (isLoading) {
        return (
            <div className={styles.loader_container}>
                <div className={styles.loader}></div>
            </div>
        )
    }

    return (
        <div className={styles.card_container} onClick={handleClick}>
            <header className={styles.header}>{characterInfo.name}</header>
            <main className={styles.main}>
                <LazyLoadImage
                    className={styles.image}
                    alt={`${character} card image`}
                    src={`https://api.genshin.dev/characters/${character}/card`}
                    effect="blur"
                />
            </main>
            <footer className={styles.footer}>
                <aside>
                    <LazyLoadImage
                        className={styles.imageElement}
                        src={`https://api.genshin.dev/elements/${characterInfo.vision.toLowerCase()}/icon`}
                        alt={`${characterInfo.vision} element icon`}
                        effect="black-and-white"
                    />
                </aside>
                <aside>
                    <p className={styles.nation}>{characterInfo.nation}</p>
                </aside>
                <aside>
                    <LazyLoadImage
                        className={styles.imageWeapon}
                        src={weaponImage}
                        alt={`${characterInfo.weapon} weapon`}
                        effect="black-and-white"
                    />
                </aside>
            </footer>
        </div>
    );
};

export default CharacterCard;
