// ----------------------------------------------------------------------

import { SignUpView } from "@/sections/auth/sign-up";

const metadata = "Sign Up";

export default function Page() {
  return (
    <>
      <div>
        <title>{metadata}</title>
      </div>

      <div>
        <SignUpView />
      </div>
    </>
  );
}
