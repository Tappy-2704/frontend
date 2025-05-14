import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, Form } from "@/components/hook-form";

import google from "@/assets/icons/gg.svg";
// import { GoogleLogin } from "@react-oauth/google";
// import { useBoolean } from "@/hooks/components/use-boolean";
// import { useTranslate } from "@/locales";
// import { LayoutRightForm } from "@/sections/auth/components/layout-right-form";
// import { Eye, EyeOff } from "lucide-react";
// import { paths } from "@/routes/paths";
// import PrimaryButton from "@/components/button/primary-button";
// import { useMutation } from "@tanstack/react-query";
// import {
//   registerGoogleUser,
//   registerUser,
//   sendOTP,
// } from "@/hooks/actions/useAuth";
// import { IAuthRegister, LoginGoogleResponse } from "@/hooks/interfaces/auth";
import { useToastStore } from "@/zustand/useToastStore";
// import { AxiosErrorResponse } from "@/hooks/interfaces/axios";
import { useRouter } from "@/routes/hooks/use-router";
import { useState } from "react";
import PrimaryButton from "@/components/button/primary-button";
// import { OTP_VERIFY_EMAIL, ACCESS_TOKEN } from "@/utils/constants";

export function SignUpView() {
  const { showToast } = useToastStore();
  const router = useRouter();
  const [checkBox, setCheckbox] = useState(false);
  const [submit, setSubmit] = useState(false);

  type SignInSchemaType = zod.infer<typeof SignInSchema>;

  // const { mutate: registerApi, isPending: isLoading } = useMutation({
  //   mutationFn: registerUser,
  // });
  // const { mutate: registerGoogleApi } = useMutation({
  //   mutationFn: registerGoogleUser,
  // });

  // const { mutate: sendOTPApi } = useMutation({
  //   mutationFn: sendOTP,
  // });
  // const handleSendOTP = ({ email, type }: { email: string; type: string }) => {
  //   sendOTPApi(
  //     { email, type },
  //     {
  //       onSuccess: () => {
  //         router.replaceParams(paths.auth.otpAccount, { email, type });
  //       },
  //       onError: (error: AxiosErrorResponse) => {
  //         showToast("error", error.response?.data?.message || t("sFail"));
  //       },
  //     }
  //   );
  // };

  // const handleLoginGoogleSuccess = (response: unknown) => {
  //   const data = response as LoginGoogleResponse;
  //   const tokenId = data.credential;
  //   // console.log(tokenId);
  //   // const decoded: { email: string } = jwtDecode(tokenId);
  //   // const email = decoded.email;

  //   registerGoogleApi(
  //     { tokenId },
  //     {
  //       onSuccess: (data: any) => {
  //         const token = data.tokens.access.token;
  //         router.push(paths.root);
  //         localStorage.setItem(ACCESS_TOKEN, token);
  //         showToast("success", t("sSuccess"));
  //       },
  //       onError: () => {
  //         showToast("error", t("sFail"));
  //       },
  //     }
  //   );
  // };

  // const handleLoginGoogleFailure = () => {
  //   showToast("error", t("lFail"));
  // };

  // const handleRegister = ({
  //   email,
  //   password,
  //   name,
  //   inviteCode,
  // }: IAuthRegister) => {
  //   registerApi(
  //     { email, password, name, inviteCode },
  //     {
  //       onSuccess: () => {
  //         const otpData = {
  //           email,
  //           type: OTP_VERIFY_EMAIL,
  //         };
  //         handleSendOTP(otpData);

  //         showToast("success", t("sSuccess"));
  //       },
  //       onError: (error: AxiosErrorResponse) => {
  //         showToast("error", error.response?.data?.message || t("sFail"));
  //       },
  //     }
  //   );
  // };

  const SignInSchema = zod
    .object({
      email: zod
        .string()
        .min(1, { message: "emailRequired" })
        .email({ message: "emailMust" }),

      password: zod
        .string()
        .min(1, { message: "passwordRequired" })
        .min(8, { message: "passwordMust" })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]+$/, {
          message: "passwordContain",
        }),

      confirmPassword: zod.string().optional(),
      inviteCode: zod.string().optional(),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (!password) return;

      if (!confirmPassword) {
        ctx.addIssue({
          code: "custom",
          path: ["confirmPassword"],
          message: "confirmPassRequired",
        });
      } else if (password !== confirmPassword) {
        ctx.addIssue({
          code: "custom",
          path: ["confirmPassword"],
          message: "notMatchPassword",
        });
      }
    });

  const defaultValues = { email: "", password: "" };
  // const { value: showPassword, onToggle: onTogglePass } = useBoolean();
  // const { value: showCfPassword, onToggle: onToggleConfirmPass } = useBoolean();

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.info("DATA", data);
      setSubmit(true);

      // const dt: IAuthRegister = {
      //   email: data.email,
      //   password: data.password,
      //   name: data.email.split("@")[0],
      //   ...(data.inviteCode ? { inviteCode: data.inviteCode } : {}),
      // };

      // handleRegister(dt);
    } catch (error) {
      console.error(error);
    }
  });

  const renderForm = (
    <div className="w-full flex justify-center sm:py-6 py-9">
      <div className=" w-full max-w-[380px] flex flex-col gap-6">
        <h1 className="text-neutrals-100 text-center font-dm-sans text-3xl sm:text-4xl font-bold leading-[48px] tracking-[-0.4px]">
          Sign Up
        </h1>
        <div className="sm:mx-0 mx-2">
          <div className="flex flex-col justify-center items-center gap-5 w-full">
            <p className="text-neutrals-400 text-center font-poppins text-xs font-normal leading-5">
              Create an account
            </p>
          </div>
        </div>

        {/* <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleLoginGoogleSuccess}
            onError={handleLoginGoogleFailure}
          />
        </div> */}
        <div className="h-px w-full rounded-[1px] bg-neutrals-500"></div>

        <div className="flex flex-col h-[72px] items-start gap-3 w-full">
          <span className="text-neutrals-300 font-poppins text-xs font-bold leading-3 uppercase">
            email
          </span>
          <Field.Text
            name="email"
            placeholder="email"
            className="max-w-[380px]"
          />
        </div>
        <div className="flex flex-col h-[72px] items-start gap-3 w-full">
          <span className="text-neutrals-300 font-poppins text-xs font-bold leading-3 uppercase">
            password
          </span>
          <Field.Text
            name="password"
            placeholder="password"
            // type={showPassword ? "text" : "password"}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <button
                  type="button"
                  // onClick={() => onTogglePass()}
                  className="text-gray-500 "
                  tabIndex={-1}
                >
                  {/* {showPassword ? (
                    <EyeOff size={18} className="cursor-pointer" />
                  ) : (
                    <Eye size={18} className="cursor-pointer" />
                  )} */}
                </button>
              ),
            }}
          />
        </div>

        <div className="flex flex-col h-[72px] items-start gap-3 w-full">
          <span className="text-neutrals-300 font-poppins text-xs font-bold leading-3 uppercase">
            confirmPass
          </span>
          <Field.Text
            name="confirmPassword"
            placeholder="confirmPass"
            // type={showCfPassword ? "text" : "password"}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <button
                  type="button"
                  // onClick={() => onToggleConfirmPass()}
                  className="text-gray-500"
                  tabIndex={-1}
                >
                  {/* {showCfPassword ? (
                    <EyeOff size={18} className="cursor-pointer" />
                  ) : (
                    <Eye size={18} className="cursor-pointer" />
                  )} */}
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

        <button className="bg-[#e5e5e5] pl-[2px] pr-[2px] pt-[2px] pb-[6px] rounded-[16px] hover:bg-[#cecece]">
          <div className="bg-white px-10 py-[10px] rounded-[16px] flex justify-center gap-2 items-center hover:bg-[#e5e5e5] ">
            <img src={google} alt="google" className="w-5 h-5" />
            <span className="uppercase font-bold text-[#777777] text-[16px]">
              continue with google
            </span>
          </div>
        </button>
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
