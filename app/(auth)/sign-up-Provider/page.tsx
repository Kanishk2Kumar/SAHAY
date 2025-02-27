import { LoginForm } from "@/components/authForms/sign-Provider"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
        <h1 className="font-cormorant-garamond text-4xl">SAHAY</h1>
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
