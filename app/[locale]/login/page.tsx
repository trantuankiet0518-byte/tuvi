import AuthTemplate from "@/components/templates/AuthTemplate";
import LoginForm from "@/features/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthTemplate>
      <LoginForm />
    </AuthTemplate>
  );
}
