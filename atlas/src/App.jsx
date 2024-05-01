import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [users, setUsers] = useState([]);

  const retrieveUsers = () => {
    fetch('http://localhost:3001/api/users')
      .then(response => {
        if(!response.ok){
          throw new Error("Error retreiving users");
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error("Could not fetch data");
      });
  };


  return (
    <>
      <button onClick = {retrieveUsers}>Retreive Users</button>
      <ul>
        {users.map(user => (
          <li key = {user.id}>{user.username}</li>
        ))}
      </ul>
    </>
  )
}

export default App
