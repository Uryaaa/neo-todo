import { RegisterForm } from "@/components/auth/register-form";
import { getSession } from "@/lib/session";

export default async function RegisterPage() {
  // The middleware will handle redirecting if there's a session
  await getSession();

  return (
    <div className="min-h-screen w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 via-yellow-50 to-white flex flex-col items-center justify-center px-4 sm:px-6">
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 max-w-md">
        <div className="flex flex-col space-y-3 text-center">
          <h1 className="text-4xl font-black tracking-tight text-black">Create an account</h1>
          <div className="relative">
            <p className="text-black font-medium border-b-2 border-black pb-2 inline-block mx-auto text-lg">
              Join us and start managing your tasks
            </p>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-200 border-2 border-black rounded-full"></div>
          </div>
        </div>
        <RegisterForm />
        <div className="text-center">
          <div className="inline-block border-2 border-black bg-yellow-100 px-4 py-2 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0)]">
            By signing up, you agree to our Terms of Service
          </div>
        </div>
      </div>
    </div>
  );
}
