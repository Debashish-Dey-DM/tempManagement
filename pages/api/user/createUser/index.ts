import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(
    async (req, res) => {
        console.log("hello");
        //const { name, fatherName, nid, mobile, dueMonth } = req.body;
        //console.log(name, fatherName, nid, mobile, dueMonth);
        const { user } = req.body;
        
        const name = user.name;
        const fatherName = user.fatherName;
        const nid = user.nid;
        const mobile = user.mobile;
        const dueMonth = user.dueMonth;
        const createuser = await prisma.user.create({
            data: {
                name: name,
                fatherName: fatherName,
                nid: Number(nid),
                mobiile: Number(mobile),
                dueMonth: Number(dueMonth),
                paidAmount: 0,
                
            },
        })
        
        
    }
)
export default handler;