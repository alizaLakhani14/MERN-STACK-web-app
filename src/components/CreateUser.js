import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: username,
    };
    console.log(user);
    axios
      .post("http://localhost:2000/users/add", user)
      .then((res) => console.log(res.data))
      .then(() => setUsername(""));
  };

  const onChangeUsername = (e) => setUsername(e.target.value);

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label>Username: </label>
          <input
            value={username}
            type="text"
            required
            className="form-control"
            onChange={(e) => onChangeUsername(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
