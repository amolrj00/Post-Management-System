import React, { useEffect, useState , useContext} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';



function Profile() {

    let { id } = useParams();
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts ] = useState([]);
    let history = useHistory();
    const { authState } = useContext(AuthContext);




    useEffect(() => {
      axios.get(`http://localhost:6060/auth/basicinfo/${id}`)
      .then((response) => {
        setUsername(response.data.username);

      });

      axios.get(`http://localhost:6060/posts/byUserid/${id}`)
      .then((response) => {
        setListOfPosts(response.data.username);

      });
    }, []);

  return (
    <div className='profilePageContainer'>
      <div className='basiCInfo'> 
      <h1> Username: {username}</h1>
      {authState.username === username && (
        <button onClick={() => {
          history.push('/changepassword')
        }}>Change My Password</button>)}
      </div>
      <div className='listOfPosts'>
      { listOfPosts.map((value, key) => {
        return <div key={key} className="post" >
        <div className='title' onClick={() => {history.push(`/post/${value.id}`)}}> {value.title } </div>
        <div className='body' onClick={() => {history.push(`/post/${value.id}`)}}> {value.postText} </div>
        <div className='footer' > 
        <div className='username'>{value.username}</div>

     
         <div className='buttons'><label> {value.Likes.length} </label></div>
         </div>
        </div>;
      })}  
      </div>

    </div>
  )
}

export default Profile
