import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Field, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
// import { Label } from "@/shared/components/ui/label";

const ForgotPasswordPage = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Forgot account</CardTitle>
        <CardDescription>
          Enter your email below to continue reset to your account
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent className="pb-4">
          <div className="flex flex-col gap-6">
            <Field>
              <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
              <Input
                id="fieldgroup-email"
                type="email"
                placeholder="name@example.com"
              />
              {/* <FieldDescription className="text-red-700">
                We&apos;ll send updates to this address.
              </FieldDescription> */}
            </Field>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ForgotPasswordPage;
