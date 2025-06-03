import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import google from "@/assets/icons/gg.svg";

const GoogleLoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Lấy thông tin người dùng từ Google bằng access_token
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        console.log("Thông tin người dùng:", res.data);
        // Gửi thông tin về backend hoặc lưu vào context/state ở đây
      } catch (err) {
        console.error("Lỗi lấy thông tin người dùng", err);
      }
    },
    onError: () => {
      alert("Đăng nhập thất bại");
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      className="bg-[#e5e5e5] pl-[2px] pr-[2px] pt-[2px] pb-[6px] rounded-[16px] hover:bg-[#cecece]"
    >
      <div className="bg-white px-10 py-[10px] rounded-[16px] flex justify-center gap-2 items-center hover:bg-[#e5e5e5] ">
        <img src={google} alt="google" className="w-5 h-5" />
        <span className="uppercase font-bold text-[#777777] text-[16px]">
          continue with google
        </span>
      </div>
    </button>
  );
};

export default GoogleLoginButton;
