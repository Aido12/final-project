import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteSport,
  getSports,
  insertSport,
  updateSport,
} from '../../../util/database';

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

// export default async function deleteHandler(req, res) {
//   console.log('query', req.query);
//   // console.log('body', req.body);
//   // console.log('method', req.method);

//   if (req.method === 'GET') {
//     const deletedSport = await deleteSport();
//     res.status(200).json(sport);
//   } else if (req.method === 'DELETE') {
//     console.log('query', req.query);
//     // the code for the POST request
//     const deletedSport = await deleteSport());

//     return res.status(200).json(deletedSport);
//   } else if (req.method === 'PATCH') {
//     const body = req.body;
//     const query = req.query;

//     const updatedSport = await updateSport(Number(query.userId), {
//       name: body.userName,
//       favoriteColor: body.userColor,
//     });

//     return res.status(200).json(updatedUser);
//   }

//   return res.status(405);
// }

// hint: now the problem is in the database. either the query in database.js or in the creation of the database (migrations)''
