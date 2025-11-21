import type { Role } from "@prisma/client";

declare module '#app' {
  interface PageMeta {
    auth?: boolean | { minRole?: Role; roles?: Role[]}
  }
}

export {}