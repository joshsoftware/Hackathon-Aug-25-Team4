export const USER_ROLES = {
  ATTENDEE: "attendee",
  ORGANIZER: "organizer",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const USER_LOALSTORAGE_KEY = "USER_LOALSTORAGE_KEY";
