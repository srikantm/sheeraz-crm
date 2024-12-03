import LeadsCRMLogo from '@/app/ui/leadscrm-logo';
import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};
 
export default function LoginPage() {
  return (
    <main className="flex items-center pt-40 justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full pl-20 place-items-center rounded-lg bg-blue-600 p-3 md:h-28">
          <div>
            <LeadsCRMLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}