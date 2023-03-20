import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Bow from "../../assets/images/Bow.webp";
import Catalyst from "../../assets/images/Catalyst.webp";
import Claymore from "../../assets/images/Claymore.webp";
import Polearm from "../../assets/images/Polearm.webp";
import Sword from "../../assets/images/Sword.webp";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "./Weapon.module.css";

const Weapon = ({ weapon }) => {
    const [weaponImage, setWeaponImage] = useState();
    const weapons = {
        'Bow': Bow,
        'Catalyst': Catalyst,
        'Claymore': Claymore,
        'Polearm': Polearm,
        'Sword': Sword,
    }

    useEffect(() => {
        if (weapon) {
            setWeaponImage(weapons[weapon]);
        }
    }, [weapon]);

    return (
        <aside className={styles.container}>
            <LazyLoadImage
                className={styles.image}
                src={weaponImage}
                alt={`${weapon} weapon`}
                effect="blur"
            />
            <h1 className={styles.title}>{weapon}</h1>
        </aside>
    );
};

export default Weapon;
