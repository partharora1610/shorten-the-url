import { Request, Response } from "express"
import prisma from "../apps/database"

export const redirectToResource = async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params

    const shortUrl = await prisma.resource.findUnique({
      where: {
        shortResource: shortCode,
      },
    })

    if (shortUrl) {
      await prisma.resource.update({
        where: {
          id: shortUrl.id,
        },
        data: {
          clicks: {
            increment: 1,
          },
        },
      })

      res.redirect(shortUrl.originalResource)
    } else {
      res.status(404).json("Short Url not Found")
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "An error in redirect route",
    })
  }
}
