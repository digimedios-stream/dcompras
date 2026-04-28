import { createClient } from '@supabase/supabase-js';

// Estas variables de entorno las proveerá Vite desde el archivo .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificamos que las variables existan para evitar errores crípticos
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Faltan las credenciales de Supabase en el archivo .env.local");
}

// Exportamos la instancia de conexión
export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder');
