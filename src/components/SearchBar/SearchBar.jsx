import { Search } from "react-bootstrap-icons"
import styles from "./SearchBar.module.css"
const SearchBar = () => {
  return (
      <section className={styles.search_container}>
          <input type="text" className={styles.input}/>
          <Search size={19} />
      </section>
  );
}

export default SearchBar