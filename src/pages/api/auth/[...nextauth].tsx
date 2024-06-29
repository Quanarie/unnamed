import NextAuth from 'next-auth'
import Credentials from "next-auth/providers/credentials";
import {supabase} from "@/supabase/supabase";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"}
      },
      authorize: async (credentials) => {
        if (!credentials)
          return null;

        const {data: user, error} = await supabase
          .from('users')
          .select('*')
          .eq('email', credentials!.email)
          .single();

        if (error || !user) {
          return null;
        }

        if (!await bcrypt.compare(credentials!.password, user.password)) {
          return null;
        }

        return user;
      }
    })
  ],
})

export {handler as GET, handler as POST}