import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const body = { email: loginForm.email, password: loginForm.password };

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        body,
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      console.log(data);

      if (response.status === 200) {
        dispatch(setUser({ id: data.userId, email: data.email }));
        navigate("/");
      }
    } catch (error) {
      console.error("خطأ أثناء تسجيل الدخول:", error);
      setError(
        error.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = async (response) => {
    const { credential } = response;

    try {
      // Send the Google login token to the backend for verification
      const res = await axios.post('http://localhost:5000/auth/google-login', 
        { token: credential },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const data = res.data;
      console.log('User authenticated:', data);

      // Dispatch user data to the Redux store
      dispatch(setUser({
        id: data.userId,
        email: data.email,
      }));

      // Navigate to the home page or other pages as needed
      navigate('/');
    } catch (error) {
      console.error('Error during authentication:', error);
      setError('حدث خطأ أثناء تسجيل الدخول عبر جوجل. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Google Login Failure:', error);
    setError('فشل تسجيل الدخول عبر جوجل. حاول مرة أخرى أو استخدم طريقة أخرى.');
    setLoginForm({ email: '', password: '' });
  };

  return (
    <div dir="rtl" className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            تسجيل الدخول
          </h2>
          <p className="text-gray-600 text-sm">
            أهلاً بعودتك! يرجى إدخال بيانات حسابك
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              البريد الإلكتروني
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                onChange={handleChange}
                value={loginForm.email}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full pr-10 py-3 border-gray-300 bg-gray-50 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-right transition-all duration-200"
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                كلمة المرور
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                onChange={handleChange}
                value={loginForm.password}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full pr-10 py-3 border-gray-300 bg-gray-50 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-right transition-all duration-200"
                placeholder="أدخل كلمة المرور"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-70"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "تسجيل الدخول"
            )}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                أو سجّل دخول باستخدام
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
              useOneTap
              shape="rectangular"
              theme="filled_blue"
              size="large"
            />
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            ليس لديك حساب؟{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              إنشاء حساب جديد
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
