import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import {supabase} from '../../../supabase/supabase';
import {createUser, fetchUserByEmail} from '@/repositories/user-repository';

async function registerUser(email: string, password: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const {user, error: error} = await createUser(email, hashedPassword);
  if (error) {
    return null;
  }

  return user;
}

export const authOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'email'},
        password: {label: 'Password', type: 'password'}
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const {user, error: error} = await fetchUserByEmail(credentials.email);

        if (!user) {
          return await registerUser(credentials.email, credentials.password);
        }

        if (error || !await bcrypt.compare(credentials.password, user.password)) {
          return null;
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: '/auth'
  },
  secret: process.env.AUTH_SECRET,
}

export default NextAuth(authOptions);