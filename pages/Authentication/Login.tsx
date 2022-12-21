import * as firebase from "firebase/app"; // import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import commonStyles from "../../styles/common.module.css";
const Login = () => {

  const firebaseConfig = {
    apiKey: "AIzaSyAF6n5ilxA7eYLZF-f-zf_aF7TAfXsxeD0",
    authDomain: "bkm-mondir.firebaseapp.com",
    projectId: "bkm-mondir",
    storageBucket: "bkm-mondir.appspot.com",
    messagingSenderId: "277177412858",
    appId: "1:277177412858:web:6848c4ea1109d90df9ad43"
};


  const CryptoJS = require("crypto-js");
  const [user, setUser] = useState<any>({
    email: "",
    password: "",
  });
  // ------ firebase ------
  firebase.initializeApp(firebaseConfig);
  const auth = getAuth();

  // input data submission
  const handleBlur = (e: any) => {
    let res = { ...user };
    if (e.target.name === "email") {
      res.email = e.target.value;
      setUser(res);
    }
    if (e.target.name === "email") {
      res.email = e.target.value;
      setUser(res);
    }
    if (e.target.name === "password") {
      res.password = e.target.value;
      setUser(res);
    }
  };

  // Sign In
  const handleSignIn = (e: any) => {
    // if auth data already exists, remove all for re-auth...
    const nm = localStorage.getItem("ngaLan");
    if (nm) {
      localStorage.clear();
    }

    // sign in process
    signInWithEmailAndPassword(auth, user.email + "@gmail.com", user.password)
      .then((res) => {
        let encryptedName = CryptoJS.AES.encrypt(user.email, 'my-secret-key@123').toString();

        localStorage.setItem("uId",res.user.uid);
        localStorage.setItem("ngaLan", encryptedName); //name    
        localStorage.setItem(`tImaan${res.user.uid}`,res.user.refreshToken);
        location.reload();
      })
      .catch((error) => {
        if(error.message === 'Firebase: Error (auth/user-not-found).'){
          alert("User Not Found")
        }
        if(error.message === 'Firebase: Error (auth/wrong-password).'){
          alert("Wrong Password")
        }
        // alert(error.message);
      });

    e.preventDefault();
  };

 // Decrypt
  
// set on the top ---- const CryptoJS = require("crypto-js");
  
  // for setting admin name
  // const nm = localStorage.getItem("ngaLan");
  // let bytes = CryptoJS.AES.decrypt(nm, "my-secret-key@123");
  // let nms = bytes.toString(CryptoJS.enc.Utf8);
  // setAdminName(nms);

  

  return (
    <div
      className={`${commonStyles.UserformBG} ${commonStyles.common} ${commonStyles.bgLightGrey} pt-5`}
    >
      <Container className={`${commonStyles.commonForm} pt-3`}>
        <h3>Login</h3>
        <Form className="py-4">
          <label className="ms-3">নাম (name)</label>
          <Form.Control
            type="text"
            placeholder="username"
            className="mt-2"
            name="email"
            onBlur={handleBlur}
            required
          />
          <br />
          <label className="ms-3">পাসওয়ার্ড (password)</label>
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            className="mt-2"
            onBlur={handleBlur}
            required
          />
          <br />
          <Button type="submit" onClick={handleSignIn}>
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
