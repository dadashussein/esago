import { Link } from "react-router-dom"

const Personal = ({
    changeName,
    changeLastname,
    changeJobtitle,
    changePhone,
    changeEmail,
    changeAdress,
    changeBio,
}) => {
    return (
        <div className="personal-container">
            <h1>Personal Details</h1>
            <span>Get started with the basics: your name and contact information.</span>
            <form>
                <label htmlFor="firstname">First Name</label>
                <input onChange={(e) => changeName(e)} type="text" name="firstname" />
                <label htmlFor="lastname">Last Name</label>
                <input type="text" name="lastname" onChange={(e) => changeLastname(e)} />
                <label htmlFor="jobtitle">Job Title</label>
                <input type="text" name="jobtitle" onChange={(e) => changeJobtitle(e)} />
                <label htmlFor="adress">Address</label>
                <input type="text" name="adress" onChange={(e) => changeAdress(e)} />
                <label htmlFor="phone">Phone</label>
                <input type="text" name="phone" onChange={(e) => changePhone(e)} />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={(e) => changeEmail(e)} />
                <label htmlFor="bio"></label>
                <input type="textarea" name="bio"
                    id="bio" placeholder="Write down your bio"
                    onChange={(e) => changeBio(e)} />
                {/* <button>Next</button> */}
            </form>
        </div>
    )
}

export default Personal