import type { Role } from "@prisma/client"
import { hasAtLeast, isOneOf } from '~~/shared/utils/rbac'

const UNAUTHORIZED = { path: '/', query: { 
  code: '403', 
  message: 'Forbidden' 
}}

export default defineNuxtRouteMiddleware(async (to) => {
  const need = to.meta?.auth
  if (!need) {
    return
  }
  
  const auth = useAuth()
  
  if (auth.status.value === 'loading') {
    await auth.getSession()
  }

  if (auth.status.value !== 'authenticated') {
    return navigateTo(UNAUTHORIZED, { replace: true })
  }

  const role = (auth.data.value?.user?.role ?? 'user') as Role
  if (typeof need === 'object') {
    if (need.minRole && !hasAtLeast(role, need.minRole)) {
      return navigateTo(UNAUTHORIZED, { replace: true })
    }
    
    if (need.roles && !isOneOf(role, need.roles)) {
      return navigateTo(UNAUTHORIZED, { replace: true})
    }
  }
})