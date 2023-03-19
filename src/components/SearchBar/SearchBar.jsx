import { Search } from "react-bootstrap-icons"
import styles from "./SearchBar.module.css"
import { useState } from "react"
const SearchBar = ({ characters, onSubmit }) => {
    const [searchCharacter, setSearchCharacter] = useState();
    const submit = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            const filteredCharacters = characters.filter((character) =>
                character.toLowerCase().includes(e.target.value.toLowerCase())
            )
            onSubmit(
              filteredCharacters.length ? filteredCharacters[0] : null
            )
        }
    };

    return (
        <section className={styles.search_container}>
            <input type="text" className={styles.input} onKeyUp={submit} placeholder="Search a character"/>
            <Search size={19} />
        </section>
    );
};

export default SearchBar