import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { BlobServiceClient } from "@azure/storage-blob";
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      try {
        const blobServiceClient = BlobServiceClient.fromConnectionString(
          process.env.AZURE_STORAGE_CONNECTION_STRING || ''
        );
        
        // Create a unique container name using the user's email
        const containerName = user.email?.replace(/[^a-z0-9]/gi, '').toLowerCase();
        if (containerName) {
          const containerClient = blobServiceClient.getContainerClient(containerName);
          // Create the container if it doesn't exist
          await containerClient.createIfNotExists();
        }

        // Initialize chat usage record for new users
        const cookieStore = cookies();
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
        
        const { error } = await supabase
          .from('chat_usage')
          .select('user_id')
          .eq('user_id', user.email)
          .single();

        if (error && error.code === 'PGRST116') {
          // No record found - create initial record
          await supabase
            .from('chat_usage')
            .insert([{ user_id: user.email, usage_count: 0 }]);
        }

        return true;
      } catch (error) {
        console.error('Error in sign in callback:', error);
        return true; // Still allow sign in even if initialization fails
      }
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
});

export { handler as GET, handler as POST };