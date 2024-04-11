/**
 * An array of routes that are protected and require authentication
 * This routes require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/", "/jobs/3vv02mts"];

/**
 * An array of routes that are accessible to the authenticated user
 * These routes will redirect to the users to /onboarding
 * @type {string[]}
 */

export const authRoutes = ["/auth/login"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after a successful login
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/home";
