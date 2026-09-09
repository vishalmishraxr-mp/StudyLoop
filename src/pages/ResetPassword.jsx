
import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { apiConnector } from '../services/apiConnector';
import { auth } from '../services/apis';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { token: tokenFromPath } = useParams();

  const params = new URLSearchParams(location.search);
  const token = tokenFromPath || params.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('Invalid or missing reset token');
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error('Please fill both password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await apiConnector('POST', auth.RESET_PASSWORD_API, {
        token,
        password: newPassword,
        confirmPassword,
      });

      if (response.data.success) {
        toast.success('Password reset successful');
        navigate('/login');
      } else {
        toast.error(response.data.message || 'Reset failed');
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
        <h1 className="text-white text-3xl font-semibold mb-6 text-center">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-white block mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full h-[45px] bg-gray-700 rounded-lg px-3 text-white focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="text-white block mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-[45px] bg-gray-700 rounded-lg px-3 text-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

