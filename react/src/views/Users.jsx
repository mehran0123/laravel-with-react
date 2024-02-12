import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";


export default function Users () {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setMsg} = useStateContext();

  useEffect(() => {
      getUsers();
  },[])

  const onDelete = (user) => {
    setLoading(true)
    if(!window.confirm('Are you sure you want to delete this user ?')){
      return ;
    }

    axiosClient.delete(`/users/${user.id}`).then(() => {
      //TODO Show Notification
      setMsg("User Successfully Deleted.");
      setLoading(false)
      getUsers();
    })
  }
  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users').then(({data}) => {
      setLoading(false)
      setUsers(data.data)
     // console.log(data);
    })
      .catch(() => {
        setLoading(false)
      })
  }


    return (
        <div>
          <div style={{display:'flex',justifyContent:'space-between', alignItems:'center' }}>
            <h1>Users</h1>
            <Link to="/users/new" className="btn-add">Add New</Link>
          </div>

          <div className="card animated fadeInDown">
            <table>
              <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
              </thead>
              { loading && <tbody>
              <tr>
                <td colSpan={'5'} className={'text-center'}>
                  Loading...
                </td>
              </tr>
              </tbody>
              }
              { !loading && <tbody>
              {users.map(U => (
                <tr key={U.id}>
                  <td>{U.id}</td>
                  <td>{U.name}</td>
                  <td>{U.email}</td>
                  <td>{U.created_at}</td>
                  <td>
                    <Link className={'btn-edit'} style={{'margin':'2px'}} to={'/users/'+U.id}>Edit</Link>
                    <button onClick={env => onDelete(U) }  className={'btn-delete'}>Delete</button>
                  </td>
                </tr>
              ))}
              </tbody>
              }
            </table>
          </div>
        </div>
    )
}
