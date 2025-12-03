import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

export const useGoogleAuth = () => {
  console.log('Google Signup hit');
  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (tokenResponse) => {
      try {
        const authCode = tokenResponse.code;
        const res = await axios.post("http://localhost:5000/api/users/google", {
          authCode,
        });
        console.log(res.data.msg);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        if (res.data.isNewUser) {
          alert(
            `Welcome ${res.data.user.firstName}! Account created successfully.`
          );
        } else {
          alert(`Welcome back ${res.data.user.firstName}!`);
        }
      } catch (err) {
        console.error("Google auth failed:", err);
        alert("Google authentication failed. Please try again.");
      }
    },
    onError: () => {
      console.log("Google Sign in failed");
      alert("Google authentication failed.");
    },
  });

  return handleGoogleLogin;
};

export const handleFacebookLogin = () => {
  const appId = import.meta.env.VITE_FACEBOOK_APP_ID;
  const redirectUri = "http://localhost:5173";

  const fbAuthUrl = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=email,public_profile&response_type=token`;

  const width = 600,
    height = 600;
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;

  const fbWindow = window.open(
    fbAuthUrl,
    "Facebook Login",
    `width=${width},height=${height},top=${top},left=${left}`
  );

  const fbCheck = setInterval(() => {
    try {
      if (!fbWindow || fbWindow.closed) {
        clearInterval(fbCheck);
        console.log("FB window closed by user");
      } else if (fbWindow.location.href.includes(redirectUri)) {
        const params = new URL(fbWindow.location.href).hash
          .substring(1)
          .split("&")
          .reduce((acc, cur) => {
            const [k, v] = cur.split("=");
            acc[k] = v;
            return acc;
          }, {});

        const accessToken = params.access_token;
        if (!accessToken) {
          console.error("No access token received");
          clearInterval(fbCheck);
          fbWindow.close();
          setLoading(false);
          return;
        }

        console.log("Facebook access token received");
        fbWindow.close();
        clearInterval(fbCheck);

        // Send accessToken to backend
        axios
          .post("http://localhost:5000/api/users/facebook", {
            accessToken,
          })
          .then((res) => {
            console.log(res.data.msg);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            if (res.data.isNewUser) {
              alert(
                `Welcome ${res.data.user.firstName}! Account created successfully.`
              );
            } else {
              alert(`Welcome back ${res.data.user.firstName}!`);
            }
          })
          .catch((err) => {
            console.error("FB auth failed:", err);
            alert("Facebook authentication failed. Please try again.");
          });
      }
    } catch (err) {}
  }, 500);
};
