import styles from './Nation.module.css'
const Nation = ({nation}) => (
    <footer className={styles.container}>
        <h1 className={styles.title}>{nation}</h1>
    </footer>
)

export default Nation