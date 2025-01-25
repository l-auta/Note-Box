import React,{useState} from "react";

function CreateUser(){
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword] = useState("");
    const [password2, setConfirmPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted:", { username, email, password1, password2});

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password1, password2 }),
        };
        fetch("http://127.0.0.1:5000/signup", requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))  // You can handle the response here
            .catch(error => window.alert('Error:', error));  // Handle any errors

        // handle the errors in the fields
        if(username === "" || email === "" || password1 === "" || password2 === ""){
            window.alert("Please fill all fields");
            return;
        }
        if(password1!== password2){
            window.alert("Passwords do not match");
            return;
        }
        if(!email.includes("@")){
            window.alert("Invalid email address");
            return;
        }
        if(password1.length < 5){
            window.alert("Password should be at least 5 characters long");
            return;
        }
        

        // clear the form after a successful submission
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div >
                <label  class="form-label">
                    Username:
                    <input type="text" class="form-control" id="floatingInput" name="username" value={username} onChange={(e) => setName(e.target.value)} />
                </label>
            </div>
            <div >
                <label>
                    Email:
                    <input type="email" class="form-control" id="floatingInput" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
            </div>
            <div > 
                <label>
                    Password:
                    <input type="password" class="form-control" id="floatingPassword" name="password1" value={password1} onChange={(e) => setPassword(e.target.value)} />
                </label>
            </div>
            <div >
                <label>
                    Confirm Password:
                    <input type="password" class="form-control" id="floatingPassword" name="password2" value={password2} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
            </div>
            <input class="btn" type="submit" value="Submit" />
        </form>
    );
}

export default CreateUser;