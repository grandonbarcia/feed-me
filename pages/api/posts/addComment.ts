// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Please sign in' });
  }

  //Get User

  const prismaUser = await prisma.user.findUnique({
    where: { email: session?.user?.email },
  });

  const { title, postId } = req.body.data;
  if (!title.length) {
    return res.status(401).json({ message: 'Please enter something' });
  }

  if (req.method === 'POST') {
    //Add a Comment
    console.log(req.method);
    console.log(prismaUser, 'prisma User');
    try {
      const result = await prisma.comment.create({
        data: {
          message: title,
          userId: prismaUser?.id,
          postId: postId,
        },
      });
      console.log(JSON.stringify(result), 'result');
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: 'Error has occured while making a post' });
    }
  }
}
