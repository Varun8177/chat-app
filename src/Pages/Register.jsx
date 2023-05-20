import React, { useState } from "react";
import Add from "../Images/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [err, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const display = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res.user) {
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
                  await updateProfile(res.user, {
                    displayName: display,
                    photoURL: downloadURL,
                  });
                  await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName: display,
                    email,
                    photoURL: downloadURL,
                  });
                  await setDoc(doc(db, "userChats", res.user.uid));
                }
              }
            );
          }
        );
      }
    } catch (error) {
      alert(error.code);
      setError(true);
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
          {err && <span>Something went wrong</span>}
        </form>
        <p>You do have an account? login</p>
      </div>
    </div>
  );
};

export default Register;
