import styles from './Description.module.css'

const Description = ({name, information}) => (
    <aside className={styles.container}>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.info}>{information}</p>
    </aside>
)

export default Description