import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const cellStyle = {
    border: "1px solid black",
    padding: "8px",
    textAlign: "center"
  };

  const displayusers = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/viewallusers`);
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users.. " + err.message);
    }
  };

  useEffect(() => {
    displayusers();
  }, []);

  const deleteUser = async (cid) => {
    try {
      const response = await axios.delete(`${config.url}/admin/deleteuser?cid=${cid}`);
      alert(response.data);
      displayusers();
    } catch (err) {
      setError("Unexpected Error Occurred... " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ textAlign: "center", color: "black", fontWeight: "bolder" }}>
        <u>Manage Users</u>
      </h3>

      {error ? (
        <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>
          {error}
        </p>
      ) : users.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>
          No User Data Found
        </p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              {["ID", "Name", "Gender", "Email", "Username", "Contact", "Role", "Delete"].map((heading) => (
                <th key={heading} style={cellStyle}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={cellStyle}>{user.id}</td>
                <td style={cellStyle}>{user.name}</td>
                <td style={cellStyle}>{user.gender}</td>
                <td style={cellStyle}>{user.email}</td>
                <td style={cellStyle}>{user.username}</td>
                <td style={cellStyle}>{user.contact}</td>
                <td style={cellStyle}>{user.role}</td>
                <td style={cellStyle}>
                  <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => deleteUser(user.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;
