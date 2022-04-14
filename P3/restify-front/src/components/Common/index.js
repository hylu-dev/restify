const Button = ({ color, value, handler }) => {
    return <button
        style={{ backgroundColor: color }}
        onClick={handler}
    >
        {value}
    </button>
}

export default Button;