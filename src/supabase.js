import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hgxiuwuqnjtyhuvmntdz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhneGl1d3Vxbmp0eWh1dm1udGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMzNzI0ODAsImV4cCI6MjAxODk0ODQ4MH0.YrNlho_dQJaQqwZOUYo2bu01BFVEQ2kDqGfwo5wM4Io";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
