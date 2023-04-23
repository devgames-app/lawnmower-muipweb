import { User } from '@/server/User';
import { IDbUser } from '@/types/dbUsers';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidCommand } from '@/helper/isValidCommand';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IDbUser | unknown>
) {
  if (req.method === 'POST') {
    try {
      const { username, msg } = JSON.parse(req.body);
      if (!username.length || !msg.length) {
        throw new Error('Please, fill all inputs.');
      }
      if (!isValidCommand(msg)) {
        throw new Error('Please, use a valid command.');
      }
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
