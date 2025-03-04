import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

export default function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState(""); // Track error messages
    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {
        setRegisterForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            name: registerForm.name,
            email: registerForm.email,
            password: registerForm.password,
            phone: registerForm.phone,
            address: registerForm.address
        };

        try {
            const response = await axios.post("http://localhost:5000/auth/register", body, {
                withCredentials: true,
            });

            console.log(response);
            navigate("/login"); // Navigate to login page after successful registration
        } catch (error) {
            // Handle registration errors
            if (error.response && error.response.status === 409) {
                setError(error.response.data.message); // User already exists
            } else {
                setError("حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.");
            }
        }
    }

    const handleGoogleRegisterSuccess = async (response) => {
        const { credential } = response;

        try {
            const res = await axios.post("http://localhost:5000/auth/google-register",
                { token: credential },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const data = res.data;
            console.log("Google Registration successful:", data);

            // Redirect to the login page after successful Google registration
            navigate("/login");

        } catch (error) {
            console.error("Error during Google registration:", error);
            setError("حدث خطأ أثناء التسجيل عبر جوجل. يرجى المحاولة مرة أخرى.");
        }
    }

    const handleGoogleRegisterFailure = (error) => {
        console.error("Google Registration Failure:", error);
        setError("فشل التسجيل عبر جوجل. حاول مرة أخرى أو استخدم طريقة أخرى.");
    }

    return (
        <>
            <div dir="rtl" className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold text-gray-900">إنشاء حساب جديد</h1>
                        <p className="mt-2 text-sm text-gray-600">سجل الآن للبدء في استخدام منصتنا</p>
                    </div>

                    {/* Error Message Display */}
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    الاسم الكامل
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={registerForm.name}
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="أدخل اسمك الكامل"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    البريد الإلكتروني
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={registerForm.email}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="أدخل بريدك الإلكتروني"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    كلمة المرور
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={registerForm.password}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="أدخل كلمة المرور"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    رقم الهاتف
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={registerForm.phone}
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    autoComplete="tel"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="أدخل رقم هاتفك"
                                />
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    العنوان
                                </label>
                                <textarea
                                    onChange={handleChange}
                                    value={registerForm.address}
                                    id="address"
                                    name="address"
                                    rows="3"
                                    autoComplete="street-address"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                                    placeholder="أدخل عنوانك بالتفصيل"
                                ></textarea>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                إنشاء حساب
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            لديك حساب بالفعل؟{" "}
                            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                تسجيل الدخول
                            </Link>
                        </p>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            أو يمكنك التسجيل باستخدام{" "}
                            <span className="font-medium text-indigo-600 hover:text-indigo-500">جوجل</span>
                        </p>
                        <GoogleLogin
                            onSuccess={handleGoogleRegisterSuccess}
                            onError={handleGoogleRegisterFailure}
                            useOneTap
                            shape="rectangular"
                            theme="filled_blue"
                            size="large"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
