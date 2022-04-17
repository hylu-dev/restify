const Button = ({ colorClass, value, handler, styles }) => {
    var color = colorClass ? colorClass : "is-primary"
    var customStyles = styles ? styles : ""
    return <button
        className={`button ${color} ${customStyles}`}
        onClick={handler}
    >
        {value}
    </button>
}

export default Button;