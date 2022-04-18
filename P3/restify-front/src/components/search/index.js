const Search = ({ }) => {
    const [query, setQuery] = useState("");

    return <>
        <div className="field">
            <p className="control is-expanded has-icons-right">
                <input className="input" type="search" placeholder="Search..." onChange={e => setQuery(e.target.value)} />
                <span className="icon is-small is-right"><i className="fas fa-search"></i></span>
            </p>
        </div>
    </>
}

export default Search;