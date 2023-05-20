import React, { useState } from "react";
import Add from "../Images/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [err, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const display = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Signup a new user using firebase
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res.user) {
        // store his profile photo and display name
        const storageRef = ref(storage, display);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Upload progress or other state changes can be handled here
          },
          (error) => {
            console.log(error);
            setError(true);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                if (res.user) {
                  // update profile with display name & profile photo
                  await updateProfile(res.user, {
                    displayName: display,
                    photoURL: downloadURL,
                  });

                  // create a collection of user that will contain user's data
                  await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName: display,
                    email,
                    photoURL: downloadURL,
                  });

                  // create a collection of user chats that'll contain all messages of a particular user
                  await setDoc(doc(db, "userChats", res.user.uid), {});

                  // navigate to chat page
                  navigate("/");
                }
              }
            );
          }
        );
      }
    } catch (error) {
      alert(error.code);
      setError(true);
      navigate("/login");
      return;
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">My Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
        </form>
        {err && <span>Something went wrong</span>}

        <p>
          You do have an account? <Link to={"/login"}>login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
