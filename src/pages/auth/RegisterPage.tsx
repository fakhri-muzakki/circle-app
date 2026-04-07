import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import * as v from "valibot";
import fetchData from "@/shared/utils/fetch";
import type { RegisterRes } from "@/shared/types";

const RegisterSchema = v.object({
  fullName: v.pipe(v.string(), v.minLength(5)),
  username: v.pipe(v.string(), v.minLength(5)),
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
});

type RegisterData = v.InferOutput<typeof RegisterSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: valibotResolver(RegisterSchema),
  });

  const onSubmit = async (payload: RegisterData) => {
    console.log(payload);
    const result = await fetchData<RegisterRes>({
      url: "http://localhost:3000/api/auth/register",
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    });

    if (!result) return;
    navigate("/login");
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Register to create your account</CardTitle>
        <CardDescription>
          Enter the required data below to create your account.
        </CardDescription>
        <CardAction>
          <Link to="/login">
            <Button variant="link">Sign In</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="pb-4">
          <div className="flex flex-col gap-6">
            <Field>
              <FieldLabel htmlFor="fieldgroup-fullname">Full name</FieldLabel>
              <Input
                {...register("fullName")}
                id="fieldgroup-fullname"
                type="text"
                placeholder="Jonh Doe"
              />
              {errors.fullName?.message && (
                <FieldDescription className="text-red-700">
                  {errors.fullName.message}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="fieldgroup-username">Username</FieldLabel>
              <Input
                {...register("username")}
                id="fieldgroup-username"
                type="text"
                placeholder="jonhdoe"
              />
              {errors.username?.message && (
                <FieldDescription className="text-red-700">
                  {errors.username.message}
                </FieldDescription>
              )}
            </Field>
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
              <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
              <Input
                {...register("password")}
                id="fieldgroup-password"
                type="password"
                placeholder=""
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
            Register
          </Button>
          <Button variant="outline" className="w-full">
            Register with Google
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegisterPage;
