import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Loader2, BookOpen, GraduationCap } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['STUDENT', 'INSTRUCTOR']),
});

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: 'STUDENT',
    }
  });

  const selectedRole = watch('role');

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await signup(data);
      toast.success(res.message || 'Account created successfully!');
      
      if (res.data.role === 'STUDENT') navigate('/student/dashboard');
      else if (res.data.role === 'INSTRUCTOR') navigate('/instructor/dashboard');
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-[24px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] p-8">
          <div className="text-center mb-8">
            <h2 className="text-headline-md font-headline-md font-bold text-on-background">Create an Account</h2>
            <p className="text-on-surface-variant mt-2 font-body-sm text-body-sm">Join the community and start learning</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setValue('role', 'STUDENT')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  selectedRole === 'STUDENT'
                    ? 'border-primary bg-primary-fixed text-on-primary-fixed-variant'
                    : 'border-outline-variant bg-surface text-on-surface-variant hover:border-outline'
                }`}
              >
                <BookOpen className={`w-6 h-6 mb-2 ${selectedRole === 'STUDENT' ? 'text-primary' : ''}`} />
                <span className="font-label-md text-label-md">I want to Learn</span>
              </button>
              
              <button
                type="button"
                onClick={() => setValue('role', 'INSTRUCTOR')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  selectedRole === 'INSTRUCTOR'
                    ? 'border-primary bg-primary-fixed text-on-primary-fixed-variant'
                    : 'border-outline-variant bg-surface text-on-surface-variant hover:border-outline'
                }`}
              >
                <GraduationCap className={`w-6 h-6 mb-2 ${selectedRole === 'INSTRUCTOR' ? 'text-primary' : ''}`} />
                <span className="font-label-md text-label-md">I want to Teach</span>
              </button>
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-background mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-on-surface-variant" />
                </div>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary-fixed transition-all outline-none bg-surface"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-background mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-on-surface-variant" />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary-fixed transition-all outline-none bg-surface"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-background mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-on-surface-variant" />
                </div>
                <input
                  {...register('password')}
                  type="password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary-fixed transition-all outline-none bg-surface"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full font-label-md text-label-md bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <p className="text-center font-body-sm text-body-sm text-on-surface-variant mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-container hover:underline font-bold transition-colors">Sign in</Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignupPage;