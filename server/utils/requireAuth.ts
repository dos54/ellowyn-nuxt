import { createError, type H3Event } from 'h3'
import type { Role } from '@prisma/client'
import type { AuthRequirement } from '~~/shared/utils/rbac'
import { hasAtLeast, isOneOf } from '~~/shared/utils/rbac'
import { getServerSession } from '#auth'

export type AuthContext = {
  role: Role
}

export async function requireAuth(
  event: H3Event,
  need?: AuthRequirement
): Promise<AuthContext> {
  const session = await getServerSession(event)

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const role = (session.user?.role ?? 'user') as Role

  if (need && typeof need === 'object') {
    if (need.minRole && !hasAtLeast(role, need.minRole)) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden'
      })
    }

    if (need.roles && !isOneOf(role, need.roles)) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden'
      })      
    }
  }

  return { role }

}
