import {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '../../../../app/prisma/prisma';
import {Phrase} from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {id} = req.body;
  try {
    const deletedPhrase: Phrase = await prisma.phrase.delete(
      {
        where: {id: Number(id)},
      }
    );
    res.status(200).json(deletedPhrase);
  } catch (err) {
    res.status(500).json('Failed to delete phrase');
  }
}
