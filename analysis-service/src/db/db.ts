import { createClient } from "@supabase/supabase-js";
import { Database } from "../utils/schema";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set");
}

export const db = createClient<Database>(supabaseUrl, supabaseAnonKey);