import React, { useContext }  from 'react';
import axios from "axios";
import { useEffect, useState } from 'react'; 
import { useHistory } from 'react-router-dom';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { AuthContext } from '../helpers/AuthContext';
import { Link } from '@mui/material';



function Home() {

  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  let history = useHistory();

    useEffect(() => {
      if (!sessionStorage.getItem("accessToken")){
        history.push("/login");
      }
      else{
      axios.get(
        "http://localhost:6060/posts",
        { headers: { accessToken: sessionStorage.getItem("accessToken") }, 
      })
      .then((response) => {
        setListOfPosts(response.data.listOfPosts);
        setLikedOfPosts(
          response.data.likedPosts.map((like) => {
            return like.PostId;
          })
        );
        });
      }
    
    }, []);
  
  


  
 

  const likeAPost = (postId) => {
    axios.post("http://localhost:6060/likes" , 
    { PostId:postId },
    { headers:{ accessToken: sessionStorage.getItem("accessToken") } }
    ).then((response) => {
      //alert(response.data);
      setListOfPosts(listOfPosts.map((post) => {
        if(post.id === postId){
          if(response.data.liked){
            return {...post, Likes: [...post.Likes, 0]};
        }
        else{
          const likesArray = post.Likes;
          likesArray.pop();
          return {...post, Likes: [...post.Likes, likesArray]};
        }
        }
        else{
          return post;  
        }
      })
      );

      if(likedPosts.includes(postId)){
        setLikedOfPosts(
          likedPosts.filter((id) => {
            return id != postId;
          })
        );
      }
      else{
        setLikedOfPosts([...likedPosts, postId]);
      }

    });
  };

  return (
    <div>
      { listOfPosts.map((value, key) => {
        return <div key={key} className="post" >
        <div className='title' onClick={() => {history.push(`/post/${value.id}`)}}> {value.title } </div>
        <div className='body' onClick={() => {history.push(`/post/${value.id}`)}}> {value.postText} </div>
        <div className='footer' > 
        <Link to={`/profile/${value.UserId}`}>{value.username} </Link>
        <div className='buttons'>
        <ThumbUpAltIcon 
         onClick={() => {likeAPost(value.id)}}
         className={likedPosts.includes(value.id) ? "unlikePostBtn": "likeBtn"}
         />
     
         <label className='likes'>{value.Likes.length}</label>
         </div>
         </div>
        </div>;
      })}  
    </div>
  )
}

export default Home
