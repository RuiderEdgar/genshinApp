import styles from './Birthday.module.css'

const Birthday = ({ birthday }) => (
    <aside className={styles.container}>
        <h1 className={styles.title}>Birthday</h1>
        <p className={styles.birthday}>
            {birthday ? birthday?.substring(5) : 'Unknown'}
        </p>
    </aside>
);

export default Birthday