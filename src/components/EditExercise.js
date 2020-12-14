import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const EditExercise = () => {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  let history = useHistory();

  const path = useParams();
  useEffect(() => {
    axios.get("http://localhost:2000/users/").then((response) => {
      if (response.data.length > 0) {
        setUsers(response.data.map((user) => user.username));
      }
    });

    axios
      .get("http://localhost:2000/exercises/" + path.id)
      .then((response) => {
        setUsername(response.data.username);
        setDescription(response.data.description);
        setDuration(response.data.duration);
        setDate(new Date(response.data.date));
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date,
    };

    console.log(exercise);

    axios
      .post("http://localhost:2000/exercises/update/" + path.id, exercise)
      .then((res) => {
        console.log(res.data);
        history.push("/");
      });
  };

  const options =
    users.length > 0
      ? users.map((user) => {
          return { value: user, label: user };
        })
      : [];

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <Select
            options={options}
            onChange={(option) => setUsername(option.value)}
            value={{ value: username, label: username }}
          ></Select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
