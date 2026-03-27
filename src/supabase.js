import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tcpuervdzxinhhtubpdo.supabase.co'
const supabaseKey = 'sb_publishable_eCerktBA5peZyNExfNv7Pg_4xxmCtDz'

export const supabase = createClient(supabaseUrl, supabaseKey)
