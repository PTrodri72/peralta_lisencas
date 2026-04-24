import { supabase } from "../../lib/supabase";
import crypto from "crypto";

function verifyHMAC(data, signature) {
  const hash = crypto
    .createHmac("sha256", process.env.HMAC_SECRET)
    .update(data)
    .digest("hex");

  return hash === signature;
}

export default async function handler(req, res) {
  const { key, discord, signature } = req.query;

  const payload = `${key}:${discord}`;

  if (!verifyHMAC(payload, signature)) {
    return res.json({ valid: false, reason: "invalid signature" });
  }

  const { data } = await supabase
    .from("licenses")
    .select("*")
    .eq("key", key)
    .single();

  if (!data) return res.json({ valid: false });

  if (!data.active)
    return res.json({ valid: false, reason: "inactive" });

  if (data.discord_id !== discord)
    return res.json({ valid: false, reason: "discord mismatch" });

  if (data.expires_at && new Date(data.expires_at) < new Date())
    return res.json({ valid: false, reason: "expired" });

  return res.json({ valid: true });
}