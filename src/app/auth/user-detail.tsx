'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import { z as zod } from 'zod';

import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';

const schema = zod.object({
  firstName: zod.string().min(1, { message: 'First name is required' }),
  lastName: zod.string().min(1, { message: 'Last name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
  jobTitle: zod.string().min(1, { message: 'Job title is required' }),
  currentCity: zod.string().min(1, { message: 'current city is required' }),
  state: zod.string().min(1, { message: 'state is required' }),
  country: zod.string().min(1, { message: 'country is required' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  firstName: 'Chirag',
  lastName: 'Soni',
  email: 'chrgsoni07@gmail.com',
  password: '',
  jobTitle: '',
  currentCity: '',
  state: '',
  country: '',
} satisfies Values;

export const UpdateUserDetails = (): React.JSX.Element => {
  const router = useRouter();

  const { checkSession } = useUser();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.signUp(values);

      if (error) {
        //        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      // Refresh the auth state
      await checkSession?.();

      router.refresh();
    },
    [checkSession, router]
  );

  function handleSubmit(
    onSubmit: (values: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      jobTitle: string;
      currentCity: string;
      state: string;
      country: string;
    }) => Promise<void>
  ): React.FormEventHandler<HTMLFormElement> | undefined {
    throw new Error('Function not implemented.');
  }

  return (
    <Stack spacing={3}>
      <form onSubmit={handleSubmit(onSubmit)} />
    </Stack>
  );
}
