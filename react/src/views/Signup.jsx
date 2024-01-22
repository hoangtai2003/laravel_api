import {Link} from "react-router-dom";
import {useRef} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const {setUser, setToken} = useStateContext()
    const onSubmit = (ev) => {
        ev.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            passwordConfirm: passwordConfirmRef.current.value
        };
        console.log(payload);
        axiosClient.post('/signup', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422){
                    console.log(response.data.errors);
                }
            })
    }


    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">
                Sign for free
            </h1>
            <input ref={nameRef} placeholder="Full Name" required/>
            <input ref={emailRef} type="email" placeholder="Email Address" required/>
            <input ref={passwordRef} type="password" placeholder="Password" required/>
            <input ref={passwordConfirmRef} type="password" placeholder="Confirm Password" required/>
            <button className="btn btn-block">Sign up</button>
            <p className="message">
                Already Registered? <Link to="/login">Sign in</Link>
            </p>
        </form>
    )
}
