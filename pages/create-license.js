import { supabase } from "../../lib/supabase";
import { checkAdmin } from "../../lib/auth";

function generateKey() {
  const part = () =>
    Math.random().toString(36).substring(2, 6).toUpperCase();

  return `${part()}-${part()}-PERALTA-STUDIOS`;
}

export default async function handler(req, res) {
  const { token, discord_id, expires_at } = req.body;

  if (!checkAdmin(token)) {
    return res.status(403).json({ error: "unauthorized" });
  }

  const key = generateKey();

  const { data, error } = await supabase
    .from("licenses")
    .insert([
      {
        key,
        discord_id,
        expires_at,
        active: true,
        created_by: Buffer.from(token, "base64").toString()
      }
    ]);

  return res.json({ key, data, error });
}