'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import useAuthentication from '@/app/dashboard/service/Authentication';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { AxiosResponse } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { GoogleLoginButton, LinkedInLoginButton } from 'react-social-login-buttons';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';

import { UserSignIn } from './model/UserSignIn';

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;

//const defaultValues = { email: 'sofia@devias.io', password: 'Secret1' } satisfies Values;

const defaultValues = { email: 'john.dow@example.com', password: 'SecurePassword12345' } satisfies Values;

export const SignInForm = (): React.JSX.Element => {
  const router = useRouter();

  const { checkSession } = useUser();

  const [showPassword, setShowPassword] = React.useState<boolean>();

  const [isPending, setIsPending] = React.useState<boolean>(false);
  const { login } = useAuthentication();

  const styles = {
    centerText: {
      width: '100%',
      //textAlign : "center",
      borderBottom: '1px solid #000',
      lineHeight: '0.1em',
      margin: '10px 0 20px',
    },
    borderLine: {
      background: '#fff',
      padding: '0 10px',
    },
  };

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
      const userSignIn: UserSignIn = { email: values.email, password: values.password };

      try {
        const response: AxiosResponse = await login(userSignIn);
        if (response.status === 200) {
          setIsPending(true);
          await checkSession?.();
          router.refresh();
          router.push('/dashboard');
        } else {
          setError('root', { type: 'server', message: response.data || 'Login failed' });
        }
      } catch (err) {
        console.error('Login error:', err);
        setError('root', { type: 'server', message: 'Login failed' });
      } finally {
        setIsPending(false);
      }
    },
    [checkSession, router, setError]
  );

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>
        <Typography color="text.secondary" variant="body2">
          Don&apos;t have an account?{' '}
          <Link component={RouterLink} href={paths.auth.signUp} underline="hover" variant="subtitle2">
            Sign up
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <div>
            <Link component={RouterLink} href={paths.auth.resetPassword} variant="subtitle2">
              Forgot password?
            </Link>
          </div>
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            Sign in
          </Button>
          <center style={styles.centerText}>
            <span style={styles.borderLine}>Or</span>
          </center>
          <GoogleLoginButton onClick={() => alert('Google login')}>
            <span>Sign up using Google</span>
          </GoogleLoginButton>
          <LinkedInLoginButton onClick={() => alert('Linkedin login')}>
            <span>Sign up using LinkedIn</span>
          </LinkedInLoginButton>
        </Stack>
      </form>
      {/*    <Alert color="warning">
        Use{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          sofia@devias.io
        </Typography>{' '}
        with password{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          Secret1
        </Typography>
      </Alert>
    
          */}
    </Stack>
  );
};
