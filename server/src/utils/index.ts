import crypto from "crypto"

export const generateShortCode = (originalURL: string) => {
  let hashInput = originalURL
  const hash = crypto.createHash("sha256").update(hashInput).digest("hex")

  return hash.slice(0, 7)
}
