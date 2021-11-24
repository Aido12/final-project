import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteSportById,
  getSportById,
  updateSportById,
} from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const sport = await getSportById(Number(req.query.sportId));
    res.status(200).json(sport);
  } else if (req.method === 'DELETE') {
    console.log('query', req.query);
    // the code for the POST request
    const deleteSport = await deleteSportById(Number(req.query.sportId));

    return res.status(200).json(deleteSport);
  } else if (req.method === 'PATCH') {
    const body = req.body;
    const query = req.query;
    console.log('from PATCH', body);

    const updatedSport = await updateSportById(Number(query.sportId), {
      date: body.date,
      time: body.time,
      match: body.match,
    });

    return res.status(200).json(updatedSport);
  }

  return res.status(405);
}

// ) '{
//   const sportId = request.query.id;
//   let sport: Sport | undefined | {} = {};

//   if (request.method === 'GET') {
//     sport = await getSportById(sportId);
//   } else if (request.method === 'PATCH') {
//     const newsports = request.body.sport;
//     sport = await updateSportById(sportId, newsports);
//   } else if (request.method === 'DELETE') {
//     sport = await deleteSportById(sportId);
//   }
//   response.statusCode = 200;
//   response.setHeader('Content-Type', 'application/json');
//   response.end(JSON.stringify({ sport: sport }));
// }'
