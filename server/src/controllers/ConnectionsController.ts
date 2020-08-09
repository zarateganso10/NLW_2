import { Request, Response, response } from 'express';

import db from './../database/connection';

export default new class ConnectionsController {
    async index(req: Request, res: Response) {
        const connections = await db('connections').count('* as total');
        const { total } = connections[0]

        return res.status(200).json({ total });
    }

    async create(req: Request, res: Response){
        const { user_id } = req.body;

        try {
            await db('connections').insert({
                user_id
            })
    
            return res.status(201).send()
        } catch (error) {
            return res.status(400).json({
                error: "Can't create a connection"
            })
        }

        
    }
}