// Role Base Access Control

import type { Role } from "@prisma/client";

export type AuthRequirement = undefined | { minRole?: Role, roles?: Role[] }

const RANK: Record<Role, number> = {
  user: 0, editor: 1, moderator: 2, admin: 3
}

export function hasAtLeast(actual: Role, required: Role) {
  return RANK[actual] >= RANK[required]
}

export function isOneOf(actual: Role, list: Role[]) {
  return list.includes(actual)
}