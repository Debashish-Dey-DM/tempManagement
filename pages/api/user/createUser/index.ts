import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(
    async (req, res) => {
        console.log("createUser");
        
        //const { name, fatherName, nid, mobile, dueMonth } = req.body;
        //console.log(name, fatherName, nid, mobile, dueMonth);
        const { name,fatherName,nid,mobile,dueMonth,userType,typeId} = req.body;
        
      
        if (userType === "Shop") {
            const createuser = await prisma.user.create({
            data: {
                name: name,
                fatherName: fatherName,
                nid: Number(nid),
                mobiile: Number(mobile),
                dueMonth: Number(dueMonth),
                paidAmount: 0,
                type: userType,
                shopId: Number(typeId),
                
            },
            })
            if(createuser) {
                    return res.status(200).json({
                        status: "success",
                        message: "Shop user created successfully",
                    })
                }
        }
        else if (userType === "Home") {
            const createuser = await prisma.user.create({
            data: {
                name: name,
                fatherName: fatherName,
                nid: Number(nid),
                mobiile: Number(mobile),
                dueMonth: Number(dueMonth),
                paidAmount: 0,
                type: userType,
                homeId: Number(typeId),
                
            },
            })
            if(createuser) {
                    return res.status(200).json({
                        status: "success",
                        message: "Home user created successfully",
                    })
                }
        }
        else {
            res.status(400).json({
                status: 400,
                message: "Invalid Type"
            });
        }

        
        
        
    }
)
export default handler;