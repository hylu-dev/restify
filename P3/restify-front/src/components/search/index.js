const Search = ({ colorClass, value, handler, styles }) => {
    var color = colorClass ? colorClass : "is-primary"
    var customStyles = styles ? styles : ""
    return <>
        <div className="field">
            <p className="control is-expanded has-icons-right">
                <input className="input" type="search" placeholder="Search..." />
                <span className="icon is-small is-right"><i className="fas fa-search"></i></span>
            </p>
        </div>
    </>
}

export default Search;