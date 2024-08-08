import { Request, Response } from "express"
import prisma from "../apps/database"
import { generateShortCode } from "../utils"

export const shortenResource = async (req: Request, res: Response) => {
  try {
    const originalURL = req.body.originalURL as string
    let shortCode = generateShortCode(originalURL)
    console.log({ shortCode })

    let existingURL = await prisma.resource.findUnique({
      where: {
        shortResource: shortCode,
      },
    })

    if (existingURL) {
      shortCode = generateShortCode(originalURL + Date.now().toString())
      existingURL = await prisma.resource.findUnique({
        where: {
          shortResource: shortCode,
        },
      })
    }

    const savedURL = await prisma.resource.create({
      data: {
        originalResource: originalURL,
        shortResource: shortCode,
      },
    })

    res.status(201).json({
      savedURL,
    })
  } catch (e) {
    // move to class
    console.error(e)
    res.status(500).json("Error")
  }
}

export const getResourceStats = async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params

    const shortURL = await prisma.resource.findUnique({
      where: {
        shortResource: shortCode,
      },
    })

    if (shortURL) {
      return res.json({ data: shortURL })
    }

    res.status(404).json({ message: "Note Found" })
  } catch (e) {
    console.error(e)
    res.status(500).json("Error")
  }
}

export const getAllResources = async (req: Request, res: Response) => {
  try {
    const data = await prisma.resource.findMany({})

    res.status(200).json({ result: data })
  } catch (e) {
    console.error(e)
    res.status(500).json("Error")
  }
}
