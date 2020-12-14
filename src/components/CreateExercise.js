import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Select from "react-select";

const CreateExercise = (props) => {
  useEffect(() => {
    axios
      .get("http://localhost:2000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          setUsers(response.data.map((user) => user.username));
          setUsername(response.data[0].username);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  const history = useHistory();

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  const onChangeDate = (date) => {
    setDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username: username,
      description: description,
      duration: parseInt(duration),
      date: date,
    };

    axios
      .post("http://localhost:2000/exercises/add", exercise)
      .then((res) => console.log(res.data))
      .then(() => {
        setUsername([]);
        setDescription("");
        setDuration(0);
        setDate(new Date());
      })
      .then(() => history.push("/"));
  };

  const options =
    users.length > 0
      ? users.map((user) => {
          return { value: user, label: user };
        })
      : [];

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <Select
            options={options}
            onChange={(option) => setUsername(option.value)}
          ></Select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            onChange={(e) => onChangeDescription(e)}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => onChangeDuration(e)}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={onChangeDate} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateExercise;
