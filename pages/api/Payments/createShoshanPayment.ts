import { Payment, Shoshan } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(
    async (req, res) => {
        
        const { pay } = req.body;
         const newDate = new Date();
        const updatedDate = newDate.toISOString();
          const  payment:Payment = await prisma.payment.create({
                data: {
                    type: pay.type,
                    amount: Number(pay.amount),
                    date: updatedDate,
                    status: "Income" 
                }
          })
        const payment2:Shoshan = await prisma.shoshan.create({
            data: {
                paymentId: payment.id,
                name: pay.name,
                fatherName: pay.fatherName,
                motherName: pay.motherName,
                address: pay.address,
                reference: pay.reference,
                relation: pay.relation,
                type: pay.shoshanType,
                amount: Number(pay.amount),
                
            }
        })
            return res.json(payment);
            
        
        
    }
)
export default handler;