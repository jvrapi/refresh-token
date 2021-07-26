import { client } from '../../prisma/client'
import { compare } from 'bcryptjs'
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken'
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider'

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
    const generateTokenProvider = new GenerateTokenProvider()
    const token = generateTokenProvider.execute(userAlreadyExists.id)

    await client.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id
      }
    })

    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = await generateRefreshToken.execute(
      userAlreadyExists.id
    )

    return { token, refreshToken }
  }
}

export { AuthenticateUserUseCase }
