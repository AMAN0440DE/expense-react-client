// Implementation Plan - Refresh Tokens
// Goal Description
// Implement a robust refresh token mechanism to keep users logged in securely. When the short-lived jwtToken (access token) expires or is missing, a long-lived refreshToken (7 days) will be used to issue a new jwtToken.

// User Review Required
// None at this stage.
// Proposed Changes
// Server (expense-server)
// [MODIFY]
// authController.js
// Update
// login
// ,
// register
// , and
// googleSso
//  methods:
// Generate a refreshToken signed with JWT_SECRET (or a new REFRESH_TOKEN_SECRET if preferred, but JWT_SECRET is fine for now as per simplicity) with 7 days expiry.
// Set a new cookie refreshToken with httpOnly: true.
// Update
// isUserLoggedIn
//  method:
// Check for jwtToken.
// If jwtToken is visible and valid, return user (current behavior).
// If jwtToken is missing or verification fails (expired):
// Check for refreshToken cookie.
// Verify refreshToken.
// If refreshToken is valid:
// Decode user info.
// Generate NEW jwtToken (1 hour).
// Set NEW jwtToken cookie.
// Return user info (effectively logging them in seamlessly).
// If refreshToken invalid/missing:
// Return 401 Unauthorized.
// Client (expense-react-client)
// No code changes strictly required in
// App.jsx
//  if we rely on is-user-logged-in automatically setting the new cookie. The browser will handle the cookie update mostly transparently.
// However, we should verify
// App.jsx
//  handles the seamless transition (it currently just waits for
// isUserLoggedIn
//  response).
// Verification Plan
// Automated Tests
// None.
// Manual Verification
// Login: Login with a user. Verify jwtToken and refreshToken cookies are set.
// Token Expiry Simulation:
// Temporarily set jwtToken expiry to 1 minute in
// authController.js
// .
// Log in again.
// Wait 61 seconds.
// Refresh the page (triggering
// isUserLoggedIn
// ).
// Observation:
// The
// isUserLoggedIn
//  call should fail the jwtToken check but succeed on refreshToken check.
// Response should be 200 OK.
// A new jwtToken cookie should be set in the browser.
// User remains logged in.