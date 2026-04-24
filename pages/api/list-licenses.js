import { supabase } from "../../lib/supabase";
import { checkAdmin } from "../../lib/auth";

export default async function handler(req, res) {
  const { token } = req.query;

  if (!checkAdmin(token)) {
    return res.status(403).json({ error: "unauthorized" });
  }

  const { data } = await supabase
    .from("licenses")
    .select("*");

  return res.json(data);
}