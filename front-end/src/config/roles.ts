const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export type Role = keyof typeof ROLES;

export default ROLES;
