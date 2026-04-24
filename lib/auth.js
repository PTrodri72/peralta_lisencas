export function checkAdmin(token) {
  if (!token) return false;

  const username = Buffer.from(token, 'base64').toString();

  const allowed = ["Igor", "RodriguesIgor"];

  return allowed.includes(username);
}