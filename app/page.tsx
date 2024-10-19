import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div>
      <h1>Hello from the sole mate</h1>
      <Button>
        <LoginLink>Login</LoginLink>
      </Button>
      <Button>
        <RegisterLink>Sign up</RegisterLink>
      </Button>
    </div>
  );
}
