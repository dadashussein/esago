import { useContext, useState } from "react"
import "./signup.css"
import axios from "axios"
import { SignUpContext } from "../../context/ShowSignUpContext"


const SignUp = () => {
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(false)
    const { handleShowSignUp } = useContext(SignUpContext)


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        const { username, email, password, full_name } = Object.fromEntries(formData);
        const newUser = { username, email, password, full_name }
        setUser(newUser)
        try {
            const response = await axios.post('http://127.0.0.1:8000/users/register', newUser)
            console.log(response);
            setLoading(false)
            handleShowSignUp()
        } catch (error) {
            console.log(error.response.data);
        } finally {
            setLoading(false)
        }

    }
    return (
        <div className='signup'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" />
                <label htmlFor="fullName">Fullname</label>
                <input type="text" name="full_name" id="fullName" />
                <button type="submit">Sign up</button>

            </form>
            <div className="status">
                {loading && <p>loading...</p>}
                {user && <p>user {user.username} created successfully</p>}
            </div>
        </div>
    )
}

export default SignUp