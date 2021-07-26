import { sign } from 'jsonwebtoken'

class GenerateTokenProvider {
  async execute(userId: string) {
    const key = process.env.TOKEN_KEY

    const token = sign({}, key, {
      subject: userId,
      expiresIn: '20s'
    })

    return token
  }
}

export { GenerateTokenProvider }
