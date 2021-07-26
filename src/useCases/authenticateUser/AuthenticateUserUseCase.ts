import { client } from '../../prisma/client'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

type IRequest = {
  username: string
  password: string
}

class AuthenticateUserUseCase {
  async execute({ username, password }: IRequest) {
    // Verificar se o usuário existe
    const userAlreadyExists = await client.user.findFirst({
      where: { username }
    })

    if (!userAlreadyExists) {
      throw new Error('User or password incorrect')
    }

    // Verificar se a senha esta correta
    const passwordMatch = await compare(password, userAlreadyExists.password)

    if (!passwordMatch) {
      throw new Error('User or password incorrect')
    }

    // gerar token do usuário
    const key = process.env.TOKEN_KEY
    const token = sign({}, key, {
      subject: userAlreadyExists.id,
      expiresIn: '20s'
    })

    return { token }
  }
}

export { AuthenticateUserUseCase }
