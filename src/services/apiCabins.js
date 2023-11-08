import supabase, { supabaseUrl } from '../services/supabase';
export async function getCabins() {
  const { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins could npt be fetched');
  }

  return cabins;
}

export async function createCabin(newCabin) {
  // https://tkbnuwaqgckhyhtcwllj.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // const basePath = `https://tkbnuwaqgckhyhtcwllj.supabase.co/storage/v1/object/public/cabin-images/`;
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '');
  const folderPath = '/storage/v1/object/public/cabin-images/';
  const imagePath = `${supabaseUrl}${folderPath}${imageName}`;

  // 1. Create cabin in supabase
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.log(error);
    throw new Error('Cabin could not be created');
  }
  // 2. Upload image to supabase storage
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading the image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error(
      'Cabin image could not be uploaded and the cabin image was not created',
    );
  }

  return data;
}

export async function deleteCabin(id) {
  console.log(id);
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('Cabin  not be deleted');
    // throw error;
  }
  return data;
}
