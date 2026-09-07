// Supabase client used across the app for reading/writing triage intake data.
// Uses the public anon/publishable key, safe to expose in the browser
// because access is controlled via Row Level Security policies.
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);