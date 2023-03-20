import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setuser] = useState({});
  const [usertrue, setusertrue] = useState(false);
  const [initial, setinitial] = useState(true);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setinitial(false);
      const resp = await axios.get(
        `http://localhost:3002/users/${password}/${username}`
      );
      setuser(resp.data[0]);
      setusertrue(true);
      if (!resp.data[0]) {
        setuser({});
        setusertrue(false);
      }
    } catch (error) {}
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <div className="user-info">
        {initial ? "" : usertrue ? "user exists" : "user doesnt exist"}
        {usertrue && (
          <div>
            <p>user_id : {user.id}</p>
            <p>first_name : {user.first_name}</p>
            <p>last_name : {user.second_name}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
