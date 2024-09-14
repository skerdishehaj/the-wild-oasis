import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

import { createUpdateCabin } from '../../services/apiCabins';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createUpdateCabin,
    onSuccess: () => {
      toast.success('Cabin created');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const onSubmit = (data) => {
    mutate({ ...data, image: data.image[0] });
  };
  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin Name' error={errors?.name?.message}>
        <Input
          disabled={isCreating}
          type='text'
          id='name'
          {...register('name', {
            required: 'Cabin name is required',
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          disabled={isCreating}
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'Maximum capacity is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          disabled={isCreating}
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: `Regular price is required`,
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          disabled={isCreating}
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: `Discount is required`,
            validate: (value) =>
              value > +getValues()?.regularPrice ? `Discount cannot be higher than regular price` : true,
          })}
        />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea
          disabled={isCreating}
          type='number'
          id='description'
          defaultValue=''
          {...register('description', {
            required: `Description is required`,
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput
          disabled={isCreating}
          id='image'
          accept='image/*'
          {...register('image', {
            required: `Image is required`,
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isCreating} variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>{isCreating ? `Adding...` : `Add Cabin`}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
