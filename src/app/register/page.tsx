import { register } from "@/actions/register";
import { signIn, providerMap } from "@/auth";
import {
  Stack,
  Card,
  Typography,
  Box,
  FormControl,
  FormLabel,
  TextField,
  Button,
} from "@mui/material";
import { AuthError } from "next-auth";

export default function RegisterPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <div className="flex flex-col gap-2">
      <Stack alignItems={"center"}>
        <Card
          variant="outlined"
          style={{
            margin: 20,
            padding: 20,
            width: "50%",
            maxWidth: "500px",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            action={register}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="firstname">First name</FormLabel>
              <TextField
                id="firstname"
                name="firstname"
                placeholder="John"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lastname">Last name</FormLabel>
              <TextField
                id="lastname"
                name="lastname"
                placeholder="Doe"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                required
                fullWidth
                variant="outlined"
                //value={"john.dow@example.com"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // onClick={validateInputs}
            >
              Register
            </Button>
          </Box>
          {Object.values(providerMap).map((provider) => (
            <form
              key={"signin form"}
              action={async () => {
                "use server";
                try {
                  await signIn(provider.id, {
                    redirectTo: props.searchParams?.callbackUrl ?? "",
                  });
                } catch (error) {
                  // Signin can fail for a number of reasons, such as the user
                  // not existing, or the user not having the correct role.
                  // In some cases, you may want to redirect to a custom error
                  if (error instanceof AuthError) {
                    console.log("Auth error");
                    // goto error page
                    // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                  }

                  // Otherwise if a redirects happens Next.js can handle it
                  // so you can just re-thrown the error and let Next.js handle it.
                  // Docs:
                  // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                  throw error;
                }
              }}
            >
              <button type="submit">
                <span>Sign in with {provider.name}</span>
              </button>
            </form>
          ))}
        </Card>
      </Stack>
    </div>
  );
}
