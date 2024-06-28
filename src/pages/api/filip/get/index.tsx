import {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '../../../../app/prisma/prisma';
import {Phrase} from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const phrases: Phrase[] = await prisma.phrase.findMany();
    res.status(200).json(phrases)
  } catch (error) {
    res.status(500).json('Failed to fetch phrases')
  }
}