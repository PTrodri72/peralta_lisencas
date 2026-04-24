import { supabase } from "../../lib/supabase";
import { checkAdmin } from "../../lib/auth";

export default async function handler(req, res) {
  const { token, key } = req.body;

  if (!checkAdmin(token)) {
    return res.status(403).json({ error: "unauthorized" });
  }

  const { data, error } = await supabase
    .from("licenses")
    .update({ active: false })
    .eq("key", key);

  return res.json({ success: true, data });
}