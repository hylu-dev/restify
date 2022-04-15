const Button = ({ colorClass, value, handler }) => {
    var color = colorClass ? colorClass : "is-primary"
    return <button
        className={`button ${color}`}
        onClick={handler}
    >
        {value}
    </button>
}

export default Button;