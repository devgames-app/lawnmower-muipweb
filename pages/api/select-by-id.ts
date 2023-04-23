import { User } from '@/server/User';
import { IDbUsers } from '@/types/dbUsers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IDbUsers | unknown>
) {
  if (req.method === 'POST') {
    try {
      const { username, msg } = JSON.parse(req.body);
      const query =
        'SELECT * FROM `accounts` WHERE `username` = ' + `'${username}'`;
      const user = new User();
      user.getUidByUsername(query, msg);
      res.status(200).json('sent');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}
