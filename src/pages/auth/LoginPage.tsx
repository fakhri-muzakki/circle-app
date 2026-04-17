import { Button, buttonVariants } from "@/shared/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import * as v from "valibot";
import fetchData from "@/shared/utils/fetch";
import { useAppDispatch } from "@/shared/hooks/redux";
import { login } from "@/shared/slices/authSlice";
import type { LoginRes } from "@/shared/types";

const LoginSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
});

type LoginData = v.InferOutput<typeof LoginSchema>;

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: valibotResolver(LoginSchema),
  });

  const onSubmit = async (payload: LoginData) => {
    const result = await fetchData<LoginRes>({
      url: `${import.meta.env.VITE_API_URL}/api/auth/login`,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    });

    if (!result) return;
    const data = result.data;

    dispatch(login({ user: data, token: data.accessToken }));
    navigate("/");
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link to="/register">
            <Button variant="link">Sign Up</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="pb-4">
          <div className="flex flex-col gap-6">
            <Field>
              <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
              <Input
                {...register("email")}
                id="fieldgroup-email"
                type="email"
                placeholder="name@example.com"
              />
              {errors.email?.message && (
                <FieldDescription className="text-red-700">
                  {errors.email.message}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                {...register("password")}
                id="fieldgroup-password"
                type="password"
              />
              {errors.password?.message && (
                <FieldDescription className="text-red-700">
                  {errors.password.message}
                </FieldDescription>
              )}
            </Field>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <a
            href={`${import.meta.env.VITE_API_URL}/api/auth/google`}
            className={buttonVariants({ variant: "outline" }) + "block w-full"}
          >
            Login with Google
          </a>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginPage;
