import { createContext, useCallback, useContext, type ReactNode } from "react"

const Actions = {
  READ: "READ",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  MANAGE: "MANAGE",
} as const
type Action = (typeof Actions)[keyof typeof Actions]

const Resources = {
  FOLDER: "FOLDER",
  PIECE: "PIECE",
} as const
type Resource = (typeof Resources)[keyof typeof Resources]

const Roles = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const
type Role = (typeof Roles)[keyof typeof Roles]

type CanConfig = {
  [role in Role]: Record<Resource, Action>
}

const canConfig: CanConfig = {
  ADMIN: {
    FOLDER: "MANAGE",
    PIECE: "MANAGE",
  },
  USER: {
    FOLDER: "READ",
    PIECE: "READ",
  },
}

interface CanContextType {
  role: Role
}

const CanContext = createContext<CanContextType | undefined>(undefined)

interface CanProviderProps {
  role: Role
  children: ReactNode
}

export function useCan() {
  const { role } = useCanContext()

  const can = useCallback(
    (action: Action, resource: Resource) => {
      const performableAction = canConfig[role][resource]
      if (performableAction === "MANAGE") return true
      if (action === performableAction) return true
      return false
    },
    [role],
  )

  return can
}

export function CanProvider({ role, children }: CanProviderProps) {
  return <CanContext.Provider value={{ role }}>{children}</CanContext.Provider>
}

const useCanContext = () => {
  const context = useContext(CanContext)
  if (!context) throw new Error("useCan must be used inside CanProvider")
  return context
}

interface CanProps {
  I: Action
  a: Resource
  children: ReactNode
  not?: boolean
}

export function Can({ I, a, children, not = false }: CanProps) {
  const canAccess = useCan()(I, a)

  const shouldShow = not ? !canAccess : canAccess

  return shouldShow ? children : null
}
