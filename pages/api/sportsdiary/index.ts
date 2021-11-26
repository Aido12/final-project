import { NextApiRequest, NextApiResponse } from 'next';
import { getSports, insertSport } from '../../../util/database';

export default async function handlerSport(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    console.log('get');
    const sports = await getSports();
    return res.status(200).json(sports);
  } else if (req.method === 'POST') {
    console.log('POST');
    const body = req.body;
    console.log('from POST', body);
    // the code for the POST request
    const insertedSport = await insertSport({
      date: req.body.date,
      time: req.body.time,
      match: req.body.match,
    });
    return res.status(200).json(insertedSport);
  }

  return res.status(405);
}
