'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [router, session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-[400px] shadow-lg">
        <CardHeader className="space-y-6">
          <div className="space-y-2 text-center">
            <CardTitle className="text-3xl font-bold">Welcome</CardTitle>
            <p className="text-muted-foreground">
              Sign in with Google to continue
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {session ? (
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Image
                  src={session.user?.image || "/default-avatar.png"}
                  alt="User Avatar"
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-primary/10"
                />
                <div className="text-center">
                  <p className="font-medium text-lg">
                    {session.user?.name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {session.user?.email}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={() => router.push("/")}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Go to Dashboard
                </Button>
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => signIn("google")}
              className="w-full bg-primary hover:bg-primary/90 flex items-center justify-center space-x-2"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              <span>Sign in with Google</span>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}