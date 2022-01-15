import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    'https://yvubmunqbydlprzueknw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTY4NTgyOCwiZXhwIjoxOTU3MjYxODI4fQ.lBEDlIPz8MfTPlVhY-cpXCh58mlCtItWAbzg7p6JPBw'
)