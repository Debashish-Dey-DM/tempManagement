import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(
    async (req, res) => {
        
        
        const { userId,name, fatherName, nid, mobile, dueMonth } = req.body;
        console.log(userId,name, fatherName, nid, mobile, dueMonth);
        const newUser = await prisma.user.update({
            where: {
                user_id: Number(userId)
            },
            data: {
                name: name,
                fatherName: fatherName,
                nid: Number(nid),
                mobiile: Number(mobile),
                dueMonth: Number(dueMonth),
                
            }
        })
        if (newUser) {
            return res.status(200).json({
                status: "Success",
            })
        }
    }
)
export default handler;