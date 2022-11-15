import React from "react";
import axios from "axios";
const CryptoJS = require("crypto-js");

import { useState } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
    const email = typeof window !== "undefined" && localStorage.getItem("name");
    const password = typeof window !== "undefined" && localStorage.getItem("password");
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email + "@gmail.com", password + "").then((res) => {
        email===res.user.email
    })
    
    //signInWithEmailAndPassword()
    const x = typeof window !== "undefined" && localStorage.getItem("name") && localStorage.getItem("pass") === '123'; //will change pass to random number and add password

    
//   if (x===10) {
//     return { redirect: { destination: "/Shop/CreateShop" }, props: {} };
//   } else {
//     return { props: {} };
//   }
    return { props: {} };
};
const AllUserShop = () => {

 // Decrypt
    if (typeof window !== "undefined" && localStorage.getItem("ngalan")) {
    const nm = localStorage.getItem("ngalan")
   
        let bytes = CryptoJS.AES.decrypt(nm, 'my-secret-key@123');
        let decryptedName = bytes.toString(CryptoJS.enc.Utf8);
        // console.log('dectf:', decryptedName)
  }
    return (
        <div>
            <h1>All user from Dokan</h1>
        </div>
    )
 };
export default AllUserShop;