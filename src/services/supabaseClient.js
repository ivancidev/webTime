import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bumtrmbtbafwunrolrzy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1bXRybWJ0YmFmd3Vucm9scnp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2MTQyNzAsImV4cCI6MjA0NDE5MDI3MH0.D8aDaDrTnVLAh9amB_jhPCytrrDgemb9OBAC9xUItME';
export const supabase = createClient(supabaseUrl, supabaseKey);
