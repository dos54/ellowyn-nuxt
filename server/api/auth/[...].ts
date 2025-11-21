import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@sidebase/authjs-prisma-adapter'
import prisma from '@@/server/utils/prisma'
import type { Session } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  session: { strategy: 'jwt', maxAge: 60 * 30},
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: useRuntimeConfig().githubClientId,
      clientSecret: useRuntimeConfig().githubClientSecret,
    })
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({token, user}) {
      if ( user ) {
        token.uid = user.id
      } 

      const u = await prisma.user.findUnique({
        where: { id: token.uid as string },
        select: { role: true }
      })

      token.role = u?.role ?? 'user'

      return token
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user ??= { role: 'user' }
      session.user.role = token.role
      session.user.id = token.uid

      return session
    },
  }
})