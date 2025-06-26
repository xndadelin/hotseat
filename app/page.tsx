"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import SignIn from "@/lib/signin";
import getUser from "@/hooks/getUser";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

declare global {
  interface Window {
    VANTA?: any;
    THREE?: any;
  }
}

export default function Home() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaInstance = useRef<any>(null);
  const [name, setName] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const threeLoaded = useRef(false);
  const vantaLoaded = useRef(false);

  useEffect(() => {
    async function fetchUser() {
      const userData = await getUser();
      setUser(userData);
      setLoading(false);
    }
    fetchUser();
  }, []);

  function handleVantaLoad() {
    if (
      typeof window !== "undefined" &&
      window.VANTA &&
      window.VANTA.NET &&
      vantaRef.current
    ) {
      vantaInstance.current = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        backgroundColor: 0x0a0a0a,
        color: 0xff8800,
        points: 12,
        maxDistance: 22,
        spacing: 18,
      });
    }
  }

  function tryInitVanta() {
    if (
      typeof window !== "undefined" &&
      window.VANTA &&
      window.VANTA.NET &&
      window.THREE &&
      window.THREE.Group &&
      vantaRef.current
    ) {
      vantaInstance.current = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        backgroundColor: 0x0a0a0a,
        color: 0xff8800,
        points: 12,
        maxDistance: 22,
        spacing: 18,
      });
    } else {
      // Ensure window.THREE is set if available
      if (typeof window !== 'undefined' && window['THREE'] && !window.THREE) {
        window.THREE = window['THREE'];
      }
      console.log('VANTA or THREE not ready', { VANTA: window.VANTA, THREE: window.THREE });
    }
  }

  useEffect(() => {
    return () => {
      if (vantaInstance.current) {
        vantaInstance.current.destroy();
        vantaInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/play");
    }
  }, [loading, user, router]);

  if (loading) return <Loading />;
  if (user) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative">
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && window['THREE']) {
            window.THREE = window['THREE'];
          }
          threeLoaded.current = true;
          tryInitVanta();
        }}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta/dist/vanta.net.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          vantaLoaded.current = true;
          tryInitVanta();
        }}
      />
      <div
        ref={vantaRef}
        className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
      />
      <h1 className="text-4xl font-bold mt-10 mb-6 z-10 relative">Hello!</h1>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter" && name.trim().length > 0) {
            await SignIn(name.trim());
          }
        }}
        placeholder="Type your name..."
        autoFocus
        autoComplete="off"
        spellCheck="false"
        required
        className="w-64 text-lg bg-white dark:bg-zinc-900 border border-orange-500 shadow-lg placeholder-orange-400 focus:border-orange-600 focus:ring-2 focus:ring-orange-300 z-10 relative"
      />
    </main>
  );
}
