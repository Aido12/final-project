import { NextApiRequest, NextApiResponse } from 'next';
import { deleteSport, getSports } from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const sports = await getSports();
    res.status(200).json(sports);
  } else if (req.method === 'DELETE') {
    console.log('query', req.query);
    // the code for the POST request
    const deleteSportById = await deleteSport(Number(req.query.sportsId));

    return res.status(200).json(deleteSportById);
  }

  return res.status(405);
}
