import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Exercise = ({ exercise, deleteExercise }) => (
  <tr>
    <td>{exercise.username}</td>
    <td>{exercise.description}</td>
    <td>{exercise.duration}</td>
    <td>{exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + exercise._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          deleteExercise(exercise._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2000/exercises/")
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteExercise = (id) => {
    axios.delete("http://localhost:2000/exercises/" + id).then((response) => {
      console.log(response.data);
    });

    setExercises(exercises.filter((el) => el._id !== id));
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.length > 0 &&
            exercises.map((exercise) => {
              return (
                <Exercise
                  exercise={exercise}
                  deleteExercise={deleteExercise}
                  key={exercise._id}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ExerciseList;
