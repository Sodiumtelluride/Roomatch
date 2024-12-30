import './CreateUserForm.css';

function CreateUserForm() {
    return(
        <form id='create-user-form' action="post">
            <h1>Create An Account</h1>
            <div className="name">
                <div className="first-name">
                    <label htmlFor="first-name" className="form-lable">First Name</label>
                    <input type="text" id="first-name" name="first-name" required/>
                </div>
                <div className="last-name">
                    <label htmlFor="last-name" className="form-lable">Last Name</label>
                    <input type="text" id="last-name" name="last-name" required/>
                </div>
            </div>
            <label className="form-lable" htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required/>
            <label className="form-lable" htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required/>
            <button type='submit'>Create Account</button>
        </form>
    )
}

export default CreateUserForm;