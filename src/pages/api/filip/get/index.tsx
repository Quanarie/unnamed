import {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '../../../../app/prisma/prisma';
import {Phrase} from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result: Phrase[] = await prisma.phrase.findMany();
    res.status(200).send({result})
  } catch (err) {
    res.status(500).send({error: 'Failed to fetch phrases'})
  }
}