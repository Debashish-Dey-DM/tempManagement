import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(
    async (req, res) => {
        const { name, description, location, image } = req.body;
        const shop = await prisma.shop.create({
            data: {
                name,
                description,
                location,
                image
            }
        });
        res.json(shop);
    }
)