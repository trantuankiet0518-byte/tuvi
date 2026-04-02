import AuthTemplate from "@/components/templates/AuthTemplate";
import RegisterForm from "@/features/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthTemplate>
      <RegisterForm />
    </AuthTemplate>
  );
}
