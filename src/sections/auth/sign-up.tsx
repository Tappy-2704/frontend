import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, Form } from "@/components/hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import GoogleLoginButton from "@/components/button/google-login-button";

export function SignUpView() {
  type SignInSchemaType = zod.infer<typeof SignInSchema>;
  const [show, setShow] = useState({
    ps: false,
    cps: false,
  });
  const SignInSchema = zod
    .object({
      email: zod
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Not match email" }),
      password: zod.string().min(1, { message: "Password is required" }),
      cps: zod.string().min(1, { message: "Confirm password is required" }),
    })
    .refine((data) => data.password === data.cps, {
      message: "Passwords do not match",
      path: ["cps"],
    });
  const defaultValues = { email: "", password: "", cps: "" };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.info("DATA", data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderForm = (
    <div className="w-full flex justify-center sm:py-6 py-9 ">
      <div className=" w-full max-w-[380px] flex flex-col gap-6">
        <h1 className="text-neutrals-100 text-center font-dm-sans text-3xl sm:text-4xl font-bold leading-[48px] tracking-[-0.4px]">
          Sign Up
        </h1>

        <div className="flex flex-col gap-4">
          <Field.Text label="Email" name="email" placeholder="email" />
          <Field.Text
            label="Password"
            name="password"
            placeholder="password"
            type={show.ps ? "text" : "password"}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <button
                  type="reset"
                  onClick={() => setShow((prev) => ({ ...prev, ps: !prev.ps }))}
                  tabIndex={-1}
                >
                  {show.ps ? (
                    <EyeOff size={18} className="cursor-pointer" />
                  ) : (
                    <Eye size={18} className="cursor-pointer" />
                  )}
                </button>
              ),
            }}
          />

          <Field.Text
            label="Confrim Password"
            name="cps"
            placeholder="confirmPass"
            type={show.cps ? "text" : "password"}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <button
                  type="reset"
                  onClick={() =>
                    setShow((prev) => ({ ...prev, cps: !prev.cps }))
                  }
                  tabIndex={-1}
                >
                  {show.cps ? (
                    <EyeOff size={18} className="cursor-pointer" />
                  ) : (
                    <Eye size={18} className="cursor-pointer" />
                  )}
                </button>
              ),
            }}
          />
        </div>

        <button className="bg-[#58a700] pl-[0px] pr-[0px] pt-[0px] pb-[5px] rounded-[16px]">
          <div className="bg-[#58cc02] px-10 py-[10px] rounded-[16px] flex justify-center gap-2 items-center hover:bg-[#61e002] ">
            <span className="uppercase font-bold text-white text-[16px]">
              Sign Up
            </span>
          </div>
        </button>
        <div className="relative w-full my-6">
          <div className="border-t border-gray-300 w-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#eaeaea] px-4 py-1 rounded-full border text-sm text-gray-600">
            Or
          </div>
        </div>
        <GoogleLoginButton />
        {/* 
        <button
          type="reset"
          className="bg-[#e5e5e5] pl-[2px] pr-[2px] pt-[2px] pb-[6px] rounded-[16px] hover:bg-[#cecece]"
        >
          <div className="bg-white px-10 py-[10px] rounded-[16px] flex justify-center gap-2 items-center hover:bg-[#e5e5e5] ">
            <img src={google} alt="google" className="w-5 h-5" />
            <span className="uppercase font-bold text-[#777777] text-[16px]">
              continue with google
            </span>
          </div>
        </button> */}
      </div>
    </div>
  );

  return (
    <div>
      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </div>
  );
}
