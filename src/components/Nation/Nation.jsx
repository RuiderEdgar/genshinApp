import styles from './Nation.module.css'
const Nation = ({nation}) => (
    <section className={styles.container}>
        <h1 className={styles.title}>{nation}</h1>
    </section>
)

export default Nation