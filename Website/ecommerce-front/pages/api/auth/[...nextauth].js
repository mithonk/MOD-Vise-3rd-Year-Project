import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_FRONT_ID,
      clientSecret: process.env.GOOGLE_FRONT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log({ url, baseUrl, p: process.env.NEXT_PUBLIC_URL });
      //this is the default behavior
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${process.env.NEXT_PUBLIC_URL}${url}`;
      //  // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return url;
      //Youcan add and modify it your usecase here
    },
  },
};

export default NextAuth(authOptions);
