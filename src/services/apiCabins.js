import supabase from '../services/supabase';
export async function getCabins() {
  const { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins could npt be fetched');
  }

  return cabins;
}
