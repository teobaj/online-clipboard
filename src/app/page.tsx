import { Header } from "@/components/header/Header";
import { SendToClipboard } from "@/components/send-to-clipboard/SendToClipboard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="text-ivory bg-mountain-meadow-100 h-screen flex flex-col">
      <Header />
      <main className="h-full p-8">
      <SendToClipboard />
      </main>
    </div>
  );
}
