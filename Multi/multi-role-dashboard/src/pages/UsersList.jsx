import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function UsersList() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user.role === "admin") {
      fetch("https://reqres.in/api/users?page=1")
        .then(res => res.json())
        .then(data => setUsers(data.data));
    } else {
      fetch("https://reqres.in/api/users/2")
        .then(res => res.json())
        .then(data => setUsers([data.data]));
    }
  }, [user]);

  return (
    <div>
      <h2>User List</h2>
      {users.map(u => (
        <div key={u.id}>
          <p>{u.first_name} {u.last_name}</p>
          <img src={u.avatar} alt="avatar" />
        </div>
      ))}
    </div>
  );
}
