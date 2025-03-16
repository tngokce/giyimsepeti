'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

interface Role {
  id: number;
  name: string;
}

interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role_id: number;
  store?: {
    name: string;
    phone: string;
    tax_no: string;
    bank_account: string;
  };
}

export default function SignupPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupForm>({
    defaultValues: {
      role_id: 1 // Customer role
    }
  });

  const selectedRole = watch('role_id');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get('/roles');
        setRoles(response.data);
      } catch (err) {
        setError('Roller yüklenirken bir hata oluştu');
      }
    };
    fetchRoles();
  }, []);

  const onSubmit = async (data: SignupForm) => {
    try {
      setIsLoading(true);
      setError('');

      const formData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: Number(data.role_id),
        ...(data.role_id === 2 && {
          store: {
            name: data.store?.name,
            phone: data.store?.phone,
            tax_no: data.store?.tax_no,
            bank_account: data.store?.bank_account
          }
        })
      };

      await api.post('/signup', formData);
      alert('Hesabınızı aktifleştirmek için e-posta adresinize gönderilen linke tıklayın!');
      router.back();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Kayıt işlemi başarısız oldu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Hesap Oluştur</h2>
          
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Ad Soyad
              </label>
              <input
                id="name"
                type="text"
                {...register('name', {
                  required: 'Ad Soyad gereklidir',
                  minLength: {
                    value: 3,
                    message: 'Ad Soyad en az 3 karakter olmalıdır'
                  }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'E-posta gereklidir',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Geçerli bir e-posta adresi giriniz'
                  }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Şifre gereklidir',
                  minLength: {
                    value: 8,
                    message: 'Şifre en az 8 karakter olmalıdır'
                  },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                    message: 'Şifre en az bir rakam, bir küçük harf, bir büyük harf ve bir özel karakter içermelidir'
                  }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Şifre Tekrar
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', {
                  required: 'Şifre tekrarı gereklidir',
                  validate: (val: string) => {
                    if (watch('password') != val) {
                      return 'Şifreler eşleşmiyor';
                    }
                  }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label htmlFor="role_id" className="block text-sm font-medium text-gray-700 mb-1">
                Hesap Türü
              </label>
              <select
                id="role_id"
                {...register('role_id')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
              >
                {roles.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Store Fields */}
            {Number(selectedRole) === 2 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="store.name" className="block text-sm font-medium text-gray-700 mb-1">
                    Mağaza Adı
                  </label>
                  <input
                    id="store.name"
                    type="text"
                    {...register('store.name', {
                      required: 'Mağaza adı gereklidir',
                      minLength: {
                        value: 3,
                        message: 'Mağaza adı en az 3 karakter olmalıdır'
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
                  />
                  {errors.store?.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.store.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="store.phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon
                  </label>
                  <input
                    id="store.phone"
                    type="tel"
                    {...register('store.phone', {
                      required: 'Telefon numarası gereklidir',
                      pattern: {
                        value: /^\+90[0-9]{10}$/,
                        message: 'Geçerli bir Türkiye telefon numarası giriniz (+905551234567)'
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
                  />
                  {errors.store?.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.store.phone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="store.tax_no" className="block text-sm font-medium text-gray-700 mb-1">
                    Vergi Numarası
                  </label>
                  <input
                    id="store.tax_no"
                    type="text"
                    {...register('store.tax_no', {
                      required: 'Vergi numarası gereklidir',
                      pattern: {
                        value: /^T\d{4}V\d{6}$/,
                        message: 'Geçerli bir vergi numarası giriniz (TXXXXVXXXXXX)'
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
                  />
                  {errors.store?.tax_no && (
                    <p className="mt-1 text-sm text-red-500">{errors.store.tax_no.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="store.bank_account" className="block text-sm font-medium text-gray-700 mb-1">
                    IBAN
                  </label>
                  <input
                    id="store.bank_account"
                    type="text"
                    {...register('store.bank_account', {
                      required: 'IBAN gereklidir',
                      pattern: {
                        value: /^TR[0-9]{24}$/,
                        message: 'Geçerli bir IBAN giriniz'
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0]"
                  />
                  {errors.store?.bank_account && (
                    <p className="mt-1 text-sm text-red-500">{errors.store.bank_account.message}</p>
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#23A6F0] text-white py-2 px-4 rounded-md hover:bg-[#1a7ac0] transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Kaydediliyor...
                </>
              ) : (
                'Kayıt Ol'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
