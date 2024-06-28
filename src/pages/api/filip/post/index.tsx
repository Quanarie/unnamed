import {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '../../../../app/prisma/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {content} = req.body;
  try {
    const newPhrase = await prisma.phrase.create(
      {
        data: {content},
      }
    );
    res.status(201).json(newPhrase);
  } catch (error) {
    res.status(500).json('Failed to create phrase');
  }
}