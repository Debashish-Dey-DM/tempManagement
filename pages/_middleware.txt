// import { NextRequest, NextResponse } from "next/server";
// import {verify} from 'jsonwebtoken';

// export default function middleware(req:NextRequest){
//     const {cookies} = req;
//     const jwt = cookies.OursiteJWT;
//     const url = req.url;
//     const nm = typeof window !== "undefined" && localStorage.getItem("ngalan");



//     if(url.includes("/Authentication/Login")){
//         if(nm){

//             try{
//                 if(nm){
//                     return NextResponse.redirect('/');
//                     return NextResponse.next();
//                 }
//             }
//             catch(e){
//                 alert('teesting alert');
//             }

//             return NextResponse.redirect('/Authentication/Login');
//         }
//     }


//     if(url.includes('/Report/Payment')){
//         if(jwt === undefined){
//             return NextResponse.redirect(new URL('/Authentication/Login', url));
//         }

//         try{
//             verify(jwt,'secret0')
//             return NextResponse.next()
//         }
//         catch(e){
//             return NextResponse.redirect('/Authentication/Login');
//         }
//     }

//     return NextResponse.next()
// }

// // export function middleware(request: NextRequest) {
    
// //         // const nm =typeof window !== "undefined" ?? localStorage.getItem("ngalan");

// //         const getFromStorage = (key:any) => {
// //             if(typeof window !== 'undefined'){
// //                  window.localStorage.getItem(key)
// //             }
// //             }

// //             const nm = getFromStorage('ngalan')
    
// //     const ath = '/Authentication/Login';
// //     const rprt = '/Report/Payment'

// //     if (request.nextUrl.pathname === rprt) {
// //         if(!nm){
// //             return NextResponse.redirect(new URL(ath, request.url))
// //         }
// //         else{
// //             return NextResponse.redirect(new URL(rprt, request.url))
// //         }
// //     }
// //     // if (request.nextUrl.pathname === '/another') {
// //     //   return NextResponse.rewrite(new URL('/rewrite', request.url))
// //     // }
// //     return NextResponse.next()
// //   }