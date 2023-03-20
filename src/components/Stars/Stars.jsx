import { StarFill } from "react-bootstrap-icons"
import styles from './Stars.module.css'
const Stars = ({rarity}) => {
    const numberStars = []
    for (let i = 0; i < rarity; i++) {
        numberStars.push(<StarFill key={i} className={styles.stars_size} fill="#FDCC37" />);
    }
  return (
    <aside className={styles.container_stars}>
        {
            numberStars.map((star) => star)
        }
    </aside>
  )
}

export default Stars