import * as firebase from "firebase/app"; // import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import commonStyles from "../../styles/common.module.css";
import firebaseConfig from "./firebase.config";
const Login = () => {
  const CryptoJS = require("crypto-js");
  const [user, setUser] = useState<any>({
    email: "",
    password: "",
  });

  const router = useRouter();

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
    const nm = localStorage.getItem("ngalan");
    if (nm) {
      localStorage.clear();
    }

    signInWithEmailAndPassword(auth, user.email + "@gmail.com", user.password)
      .then((res) => {
        
        let encryptedName = CryptoJS.AES.encrypt(user.email, 'my-secret-key@123').toString();

        console.log(res);
        localStorage.setItem("tOken", res._tokenResponse.idToken);
        localStorage.setItem("lId", res._tokenResponse.localId);
        localStorage.setItem("kind", res._tokenResponse.kind);
        localStorage.setItem("Token",res.user.refreshToken);
        localStorage.setItem("uId",res.user.uid);
        localStorage.setItem("phn",res.user.phoneNumber);
        localStorage.setItem("ngalan", encryptedName); //name    

        console.log("sign in successfully..........");
        router.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });

    e.preventDefault();
  };

 // Decrypt
  
// set on the top ---- const CryptoJS = require("crypto-js");
  
  //  if (typeof window !== "undefined" && localStorage.getItem("ngalan")) {
  //   const nm = localStorage.getItem("ngalan")
  //       let bytes = CryptoJS.AES.decrypt(nm, 'my-secret-key@123');
  //       let decryptedName = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //       console.log('dectf: ,', decryptedName)
  // }

  

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
