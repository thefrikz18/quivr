/* eslint-disable */
"use client";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "@/lib/components/ui/Button";
import Card from "@/lib/components/ui/Card";
import Field from "@/lib/components/ui/Field";
import PageHeading from "@/lib/components/ui/PageHeading";
import { useSupabase } from "@/lib/context/SupabaseProvider";
import { useToast } from "@/lib/hooks/useToast";


export default function Login() {
  const router = useRouter();

  const emailParam = Array.isArray(router.query.email) ? router.query.email[0] : router.query.email;
  const passwordParam = Array.isArray(router.query.password) ? router.query.password[0] : router.query.password;

  const { supabase, session } = useSupabase();
  const [email, setEmail] = useState(emailParam || '');
  const [password, setPassword] = useState(passwordParam || '');
  const [isPending, setIsPending] = useState(false);

  const { publish } = useToast();

  useEffect(() => {
    if (emailParam && passwordParam) {
      setEmail(emailParam);
      setPassword(passwordParam);
      handleLogin();
    }
  }, [emailParam, passwordParam]);

  const handleLogin = async () => {
    setIsPending(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      publish({
        variant: "danger",
        text: error.message,
      });
    } else if (data) {
      publish({
        variant: "success",
        text: "Successfully logged in",
      });
      redirect("/upload");
    }
    setIsPending(false);
  };

  if (session?.user !== undefined) {
    redirect("/upload");
  }

  return (
    <main>
      <section className="w-full min-h-[80vh] h-full outline-none flex flex-col gap-5 items-center justify-center p-6">
        <PageHeading title="Login" subtitle="Welcome back" />
        <Card className="max-w-md w-full p-5 sm:p-10 text-left">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="flex flex-col gap-2"
          >
            <Field
              name="email"
              required
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Field
              name="password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <div className="flex flex-col items-center justify-center mt-2 gap-2">
              <Button type="submit" isLoading={isPending}>
                Login
              </Button>
            </div>
            {/* <Divider text="or" />
            <div className="flex flex-col items-center justify-center mt-2 gap-2">
              <GoogleLoginButton />
            </div>
            <Divider text="or" />
            <MagicLinkLogin email={email} setEmail={setEmail} /> */}
          </form>
        </Card>
      </section>
    </main>
  );
}
