export default async function handler(req, res) {
  const { username } = req.body;

  const allowed = ["Igor", "RodriguesIgor"];

  if (!allowed.includes(username)) {
    return res.status(403).json({ error: "not allowed" });
  }

  const token = Buffer.from(username).toString('base64');

  return res.json({ token });
}
