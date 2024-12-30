import './CreateUserForm.css';

function CreateUserForm() {
    return(
        <form action="post">
            <label className="form-lable" htmlFor="email">Email:</label><br/>
            <input type="text" id="email" name="email"/><br/>
            <label className="form-lable" htmlFor="password">Password:</label><br/>
            <input type="text" id="password" name="password"/><br/>
            <label htmlFor="first-name" className="form-lable">First Name</label>
            <input type="text" id="first-name" name="first-name"/>
            <label htmlFor="last-name" className="form-lable">Last Name</label>
            <input type="text" id="last-name" name="last-name"/>
            <input type="submit" value="Submit"/>
        </form>
    )
}

export default CreateUserForm;