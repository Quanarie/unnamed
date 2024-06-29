import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {supabase} from "../../../supabase/supabase";

async function registerUser(credentials) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(credentials.password, saltRounds);

  const {error: creationError} = await supabase
    .from('users')
    .insert([{email: credentials.email, password: hashedPassword}]);

  if (creationError) {
    return null;
  }

  return (await fetchUser(credentials)).userInDb;
}

async function fetchUser(credentials) {
  const {data: userInDb, error: selectError} = await supabase
    .from('users')
    .select('*')
    .eq('email', credentials.email)
    .single();
  return {userInDb, selectError};
}

export const authOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"}
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const {userInDb, selectError} = await fetchUser(credentials);

        if (!userInDb) {
          return await registerUser(credentials);
        }

        if (selectError || !await bcrypt.compare(credentials.password, userInDb.password)) {
          return null;
        }

        return userInDb;
      }
    })
  ],
  pages: {
    signIn: '/auth'
  },
  secret: process.env.AUTH_SECRET,
}

export default NextAuth(authOptions);