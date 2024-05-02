import React, { useContext, useEffect }  from 'react';
import {Formik , Form , Field , ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';




function CreatePost() {
    let history = useHistory();
    const { authState } = useContext(AuthContext);


  const initialValues = {
    title: "",  
    postText: "",
  };

  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")){
      history.push("/login");
    }
  }, []);

  const onSubmit = (data) => {
    axios.post("http://localhost:6060/posts", data, { headers: {accessToken: sessionStorage.getItem("accessToken")}, }).then((response) => {
      history.push("/");
    });
  };
  const validationSchema = Yup.object().shape(
    {
      title: Yup.string().required("You must input  title!"),
      postText: Yup.string().required(),
    });
    
  return (
    <div className='createPostPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      <Form className="formContainer">
            <label>Title:</label>
            <ErrorMessage name='title'component='span' />
            <Field 
            autoComplete="off"
            id="inputCreatePost"
            name="title" 
            placeHolder="Ex. Rohan...."
            />
            <br />
            <label>Post:</label>
            <ErrorMessage name='postText'component='span' />
            <Field 
            autoComplete="off"
            id="inputCreatePost"
            name="postText" 
            placeHolder="Ex. Post...."
            />
            <br />
            
            <button type='submit'>Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost
