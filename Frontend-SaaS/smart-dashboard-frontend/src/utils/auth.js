// src/utils/auth.js
export function getLoggedInUser() {
  const user = sessionStorage.getItem('user'); // Or use localStorage if you prefer
  return user ? JSON.parse(user) : null;
}
