function Button({
                    type = 'button',
                    title = '',
                    classes = '',
                    onClick = () => {},
                    id = null,
                    children
                }) {
    return (
        <button type={type}
                id={id}
                title={title}
                className={classes ? classes : 'py-2 md:py-4 px-4 md:px-8 hover:bg-sky-600 text-indigo-100 rounded hover:text-gray-900 transition'}
                onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button;