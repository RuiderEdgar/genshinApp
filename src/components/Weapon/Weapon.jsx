import { useEffect, useState } from "react";
import Bow from "../../assets/images/Bow.webp";
import Catalyst from "../../assets/images/Catalyst.webp";
import Claymore from "../../assets/images/Claymore.webp";
import Polearm from "../../assets/images/Polearm.webp";
import Sword from "../../assets/images/Sword.webp";
import styles from "./Weapon.module.css";

const Weapon = ({ weapon }) => {
    const [image, setImage] = useState();

    const weaponImage = [
        <img className={styles.image} src={Bow} alt={Bow} />,
        <img className={styles.image} src={Catalyst} alt={Catalyst} />,
        <img className={styles.image} src={Claymore} alt={Claymore} />,
        <img className={styles.image} src={Polearm} alt={Polearm} />,
        <img className={styles.image} src={Sword} alt={Sword} />,
    ];
    const arrayWeapons = ["Bow", "Catalyst", "Claymore", "Polearm", "Sword"];
    const index = arrayWeapons.indexOf(weapon);
    useEffect(() => {
        if (weapon) {
            setImage(weaponImage[index]);
        }
    }, [weapon]);

    return (
        <aside className={styles.container}>
            {image}
            <h1 className={styles.title}>{weapon}</h1>
        </aside>
    );
};

export default Weapon;
