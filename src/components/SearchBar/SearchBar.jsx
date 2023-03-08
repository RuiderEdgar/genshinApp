import { Search } from "react-bootstrap-icons"
import styles from "./SearchBar.module.css"
const SearchBar = () => {
  return (
    <section className={styles}>
        <input type="text" />
        <Search size={19}/>
    </section>
  )
}

export default SearchBar