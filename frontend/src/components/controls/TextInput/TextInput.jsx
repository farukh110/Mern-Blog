import './index.scss';

const TextInput = (props) => {

    return (
        <>
            <input {...props} />
            {props.error &&
                (<p className='text-danger'>{props.errormessage}</p>
                )}
        </>
    )
}

export default TextInput;