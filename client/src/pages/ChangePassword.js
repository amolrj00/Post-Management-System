import axios from 'axios';
import React, {useState} from 'react'

function ChangePassword() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const changePassword = () => {
        axios.put("http://localhost:6060/auth/changePassword",{
           oldPassword: oldPassword,
           newPassword: newPassword 
        },
        {
            headers: {
                accessToken: sessionStorage.getItem("accessToken")
            }
        }).then((response) => {
            if (response.data.error){
                alert(response.data.error);
            }
        })
    };

  return (
    <div>
      <h1>Change Your Password</h1>
      <input type="text"  placeholder='Old Password...'
      onChange={(event) => {setOldPassword(event.target.value)}}
      />
      <input type="text"  placeholder='New Password...'
      onChange={(event) => {setNewPassword(event.target.value)}}

      />

      <button onClick={changePassword}> Save Changes </button>

    </div>
  )
}

export default ChangePassword
