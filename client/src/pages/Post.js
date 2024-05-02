import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';





function Post() {
    let {id} =  useParams();
    const [postObject , setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState([""]);
    const { authState } = useContext(AuthContext);

    let history = useHistory();
    
    useEffect(() => {
        axios.get(`http://localhost:6060/posts/byId/${id}`).then((response) => {
        setPostObject(response.data);
        });

        axios.get(`http://localhost:6060/comments/${id}`).then((response) => {
        setComments(response.data);
        });
    }, [id]);

    const addComment = () => {
        axios.post("http://localhost:6060/comments", {
            commentBody: newComment ,
            PostId: id,
        },
        {
            headers: {accessToken: sessionStorage.getItem("accessToken")}
        }
        
        )
        .then((response) => {
            if(response.data.error){
                alert(response.data.error);

                console.log(response.data.error);
            }
            else{
            const commentToAdd = {
                commentBody: newComment, 
                username: response.data.username
            };
            setComments([...comments, commentToAdd]);
            setNewComment("");
            }

        });
    };
/*
    const deleteComment = (id) => {
        axios.delete(`http://localhost:6060/comments/${id}`,{
            headers:{ accessToken: sessionStorage.getItem('accessToken'
            )}
    }).then(() => {
        setComments(
            comments.filter((val) => {
            return val.id != id;
        })
        );
    });
    };*/
/*
    const deleteComment = (id) => {
        if (id) {
          axios.delete(`http://localhost:6060/comments/${id}`, {
            headers: { accessToken: sessionStorage.getItem('accessToken') }
          })
            .then(() => {
              setComments(comments.filter((val) => val.id !== id));
            })
            .catch((error) => {
              console.error("Error deleting comment:", error);
            });
        } else {
          console.warn("Comment id is undefined.");
        }
      };
   */  
  
      const deleteComment = (id) => {
        if (id) {
          axios.delete(`http://localhost:6060/comments/${id}`, 
          {
            headers: { accessToken: sessionStorage.getItem('accessToken') }
          })
          .then(() => {
            setComments(comments.filter((val) => val.id !== id));
          });
        } else {
          console.warn("Comment id is undefined.");
        }
      };

      const deletePost = (id) => {
        axios.delete(`http://localhost:6060/posts/${id}`, {
          headers: {accessToken: sessionStorage.getItem("accessToken")}
      })
      .then(() => {
          history.push("/")
        })

      };


      const editPost = (option) => {
        if (option === "title"){
          let newTitle = prompt("Enter New Title: ");
          axios.put("http://localhost:6060/posts/title", 
          { newTitle: newTitle, id: id}, 
          {
            headers: {accessToken: sessionStorage.getItem("accessToken")}
          });
          setPostObject({...postObject, title: newTitle})
        }
        else{
          let newPostText = prompt("Enter New text: ");
          axios.put("http://localhost:6060/posts/postText", { newText: newPostText, id: id}, 
          {
            headers: {accessToken: sessionStorage.getItem("accessToken")}
          });
          setPostObject({...postObject, postText: newPostText})

        }
      }
      
      return (
        <div className='postPage'>
            <div className='leftSide'>

                <div className='post' id='individual'> 

                <div 
                className='title'
                onClick={ () => {
                  if(authState.username === postObject.username)
                  {
                    editPost("title");
                }
                }}
                >
                  {postObject.title}
                  </div>

                  <div 
                className='postText'
                onClick={ () => {
                  if(authState.username === postObject.username)
                  {
                    editPost("body");
                }
                }}
                >
                  {postObject.postText}
                  </div>  


                <div className='footer'>
                  {postObject.username}
                  {authState.username === postObject.username && (
              <button
                onClick={() => {
                  deletePost(postObject.id);
                  console.log("postObject.id - ", postObject.id);
                }}
                className="deletebtn"
              >
                Delete Post
              </button>
            )}
                </div>
            </div>
            </div>

            <div className='rightSide'>
                <div className='addCommentContainer'>
                    <input type="text"
                     placeholder='Comment..'
                     autoComplete="off"
                     value={newComment}
                     onChange={(event) => {setNewComment(event.target.value)}} /> 

                    <button onClick={addComment}> Add Comment </button>
                </div>
                <div className='listOfComments'>
                    {comments.map((comment, key) => {
                         return <div key={key} className='comment'>
                            {comment.commentBody}
                            <label> Username: {comment.username} </label>
                            {authState.username === comment.username &&
                             <button onClick={() => {deleteComment(comment.id)}}>x</button>}
                            </div>
                    })}
                </div>

            </div>
        </div>
      )
    
}

export default Post
