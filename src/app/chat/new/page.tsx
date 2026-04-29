"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function NewChatRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const q = searchParams.get("q") || "";
    const id = Date.now().toString();
    router.replace(`/chat/${id}${q ? `?q=${encodeURIComponent(q)}` : ""}`);
  }, [searchParams, router]);

  return null;
}

export default function NewChatPage() {
  return (
    <Suspense>
      <NewChatRedirect />
    </Suspense>
  );
}
