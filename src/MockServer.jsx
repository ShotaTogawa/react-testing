import React from "react";
import axios from "axios";

const MockServer = () => {
    const [clicked, setClicked] = React.useState(false);
    const [userName, setUserName] = React.useState("");
    const [error, setError] = React.useState("")
    const fetchUser = async() => {
        axios.get("https://jsonplaceholder.typicode.com/users/1")
        .then(res => {
            setUserName(res.data.username);
            setClicked(true);
        }).catch(e => {
            setError("Fetching failed!")
        })
    };
    const buttonText = clicked ? "Loaded" : "Start Fetch";
    return (
        <div>
          <button onClick={fetchUser} disabled={clicked}>
            {buttonText}
          </button>
          {userName && <h3>{userName}</h3>}
          {error && <p data-testid="error">{error}</p>}
        </div>
    )
}

export default MockServer;