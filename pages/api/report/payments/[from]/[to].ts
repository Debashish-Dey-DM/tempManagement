import { Payment } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(
    async (req, res) => {
        const from = req.query.from as string;
        const to = req.query.to as string;
        console.log(from, to);
        
        
        const getPaymentByDate = await prisma.payment.findMany({
            where: {
                date: {
                    gte: new Date(from),
                    lte: new Date(to),
                },
                status:"Income",
          }
        })
       
        
        return res.json(getPaymentByDate);    

        
    }
)
export default handler;