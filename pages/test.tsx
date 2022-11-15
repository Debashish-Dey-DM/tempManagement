import React, { useEffect } from "react";
import axios from "axios";
import {BASEURL} from "../constant/url"
const Test =()=>{
    const mount = async ()=>{
       await axios.get(BASEURL+"api/hello").then(
        (res)=>{
            console.log(BASEURL);
            
        }
       )
        
    }
    useEffect(()=>{
        mount();
        
        
    },[])
    return(
        <div>
            <h1>Hello testing test</h1>
        </div>
    );
}
export default Test;