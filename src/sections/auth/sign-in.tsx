// import { useForm } from "react-hook-form";
// import { z as zod } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Field, Form } from "@/components/hook-form";

// import lock from "@/assets/images/lock.svg";
// import { useBoolean } from "@/hooks/components/use-boolean";
// import { useTranslate } from "@/locales";
// import { useRouter } from "@/routes/hooks/use-router";
// import { LayoutRightForm } from "@/sections/auth/components/layout-right-form";
// import { Eye, EyeOff } from "lucide-react";
// import { paths } from "@/routes/paths";
// import PrimaryButton from "@/components/button/primary-button";
// import { useMutation } from "@tanstack/react-query";
// import { loginUser, registerGoogleUser } from "@/hooks/actions/useAuth";
// import {
//   IAuth,
//   LoginGoogleResponse,
//   LoginResponse,
// } from "@/hooks/interfaces/auth";
// import { AxiosErrorResponse } from "@/hooks/interfaces/axios";
// import { useToastStore } from "@/zustand/useToastStore";
// import { ACCESS_TOKEN } from "@/utils/constants";
// import { GoogleLogin } from "@react-oauth/google";


// export function SignInView() {
//   const router = useRouter();
//   const { t } = useTranslate("signIn");
//   const { showToast } = useToastStore();
//   const { value: showPassword, onToggle } = useBoolean();
//   const titleUrl = import.meta.env.VITE_TITLE.replace(/^https?:\/\//, "");

//   type SignInSchemaType = zod.infer<typeof SignInSchema>;

//   const { mutate: loginApi, isPending: isLoading } = useMutation({
//     mutationFn: loginUser,
//   });

//   const defaultValues = { email: "", password: "" };

//   const SignInSchema = zod.object({
//     email: zod 
//       .string()
//       .min(1, { message: t("emailRequired") })
//       .email({ message: t("emailMust") }),
//     password: zod
//       .string()
//       .min(1, { message: t("passwordRequired") })
//       .min(8, { message: t("passwordMust") })
//       .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]+$/, {
//         message: t("passwordContain"),
//       }),
//   });
//   const methods = useForm<SignInSchemaType>({
//     resolver: zodResolver(SignInSchema),
//     defaultValues,
//   });

//   const { handleSubmit } = methods;

//   const handleLogin = ({ email, password }: IAuth) => {
//     loginApi(
//       { email, password },
//       {
//         onSuccess: (data: unknown) => {
//           if (!data) return;
//           const responseData = data as LoginResponse;
//           const token = responseData.tokens.access.token;
//           localStorage.setItem(ACCESS_TOKEN, token);
//           showToast("success", t("lSuccess"));
//           router.push(paths.root);
//         },
//         onError: (error: AxiosErrorResponse) => {
//           showToast("error", error.response?.data?.message || t("lFail"));
//         },
//       }
//     );
//   };

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       const dt = {
//         email: data.email,
//         password: data.password,
//       };
//       handleLogin(dt);
//     } catch (error) {
//       console.error(error);
//     }
//   });

//   const { mutate: registerGoogleApi } = useMutation({
//     mutationFn: registerGoogleUser,
//   });

//   const handleLoginGoogleSuccess = (response: unknown) => {
//     const data = response as LoginGoogleResponse;
//     const tokenId = data.credential;

//     registerGoogleApi(
//       { tokenId },
//       {
//         onSuccess: (data: any) => {
//           const token = data.tokens.access.token;
//           router.push(paths.root);
//           localStorage.setItem(ACCESS_TOKEN, token);
//           showToast("success", t("sSuccess"));
//         },
//         onError: () => {
//           showToast("error", t("sFail"));
//         },
//       }
//     );
//   };

//   const handleLoginGoogleFailure = () => {
//     showToast("error", t("lFail"));
//   };

//   const renderForm = (
//     <div className="py-9 w-full flex justify-center">
//       <div className=" w-full max-w-[380px] flex flex-col gap-8">
//         <h1 className="text-neutrals-100 text-center font-dm-sans text-3xl sm:text-4xl font-bold leading-[48px] tracking-[-0.4px]">
//           {t("title")}
//         </h1>
//         <div className="sm:mx-0 mx-2">
//           <div className="flex flex-col justify-center items-center gap-5 w-full">
//             <p className="text-neutrals-400 text-center font-poppins text-xs font-normal leading-5">
//               {t("notiPlease")}
//             </p>
//             <div className="flex justify-center items-center p-2 px-6 w-full rounded-[48px] bg-neutrals-600 ml-5 mr-5">
//               <div className="flex items-start gap-1">
//                 <span className="text-primary-green text-center font-poppins text-sm font-medium leading-6 flex items-center gap-1">
//                   <img src={lock} alt="lock" className="w-5 h-5" />
//                   https://
//                 </span>
//                 <span className="text-neutrals-100 text-center font-poppins text-sm font-medium leading-6">
//                   {titleUrl}
//                 </span>
//               </div>
//             </div>

//             <div className="flex justify-center">
//               <GoogleLogin
//                 onSuccess={handleLoginGoogleSuccess}
//                 onError={handleLoginGoogleFailure}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="h-px w-full rounded-[1px] bg-neutrals-500"></div>

//         <div className="flex flex-col h-[72px] items-start gap-3 w-full">
//           <span className="text-neutrals-300 font-poppins text-xs font-bold leading-3 uppercase">
//             {t("email")}
//           </span>
//           <Field.Text
//             name="email"
//             placeholder={t("email")}
//             className="max-w-[380px]"
//           />
//         </div>
//         <div className="flex flex-col h-[72px] items-start gap-3 w-full">
//           <span className="text-neutrals-300 font-poppins text-xs font-bold leading-3 uppercase">
//             {t("password")}
//           </span>
//           <Field.Text
//             name="password"
//             placeholder={t("password")}
//             type={showPassword ? "text" : "password"}
//             InputLabelProps={{ shrink: true }}
//             InputProps={{
//               endAdornment: (
//                 <button
//                   type="button"
//                   onClick={() => onToggle()}
//                   className="text-gray-500"
//                 >
//                   {showPassword ? (
//                     <EyeOff size={18} className="cursor-pointer" />
//                   ) : (
//                     <Eye size={18} className="cursor-pointer" />
//                   )}
//                 </button>
//               ),
//             }}
//           />
//         </div>

//         <div className="flex justify-between items-center w-full">
//           {/* <span className="text-neutrals-400 font-poppins text-xs font-semibold leading-5">
//             {t("scan")}
//           </span> */}
//           <button
//             type="button"
//             onClick={() => {
//               router.push(paths.auth.verifyEmail);
//             }}
//             className="text-primary-blue text-right font-poppins text-xs font-semibold leading-5 cursor-pointer hover:underline"
//           >
//             {t("verifyEmail")}
//           </button>

//           <button
//             type="button"
//             onClick={() => {
//               router.push(paths.auth.forgotPass);
//             }}
//             className="text-primary-blue text-right font-poppins text-xs font-semibold leading-5 cursor-pointer hover:underline"
//           >
//             {t("forgotPass")}
//           </button>
//         </div>
//         <PrimaryButton
//           primary
//           onClick={() => {}}
//           text={t("signIn")}
//           className="w-full"
//           isLoading={isLoading}
//         />
//       </div>
//     </div>
//   );

//   return (
//     <div>
//       <LayoutRightForm
//         label1={t("dontAccount")}
//         label2={t("linkSingup")}
//         link={paths.auth.signUp}
//       >
//         <Form methods={methods} onSubmit={onSubmit}>
//           {renderForm}
//         </Form>
//       </LayoutRightForm>
//     </div>
//   );
// }
