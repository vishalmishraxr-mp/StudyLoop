import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { apiConnector } from '../services/apiConnector';
import { auth } from '../services/apis';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    setLoading(true);
    try {
      const response = await apiConnector('POST', auth.FORGOT_PASSWORD_API, { email });
      if (response.data.success) {
        toast.success('Password reset email sent (check your inbox)');
        navigate('/login');
      } else {
        toast.error(response.data.message || 'Failed to send reset email');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111927] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md bg-gray-800 rounded-xl p-6 sm:p-8 shadow-xl">
        <h1 className="text-white text-3xl font-semibold mb-6 text-center">Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-white block mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[45px] bg-gray-700 rounded-lg px-3 text-white focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
}

