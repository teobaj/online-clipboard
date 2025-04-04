import { Clipboard } from "@/components/clipboard/Clipboard";
import { Header } from "@/components/header/Header";
import { SendToClipboard } from "@/components/send-to-clipboard/SendToClipboard";
import { fetchLastClipboardItem } from "@/services/clipboard";

export default async function Home() {
  const { data: lastItem } = await fetchLastClipboardItem()

  return (
    <div className="text-ivory bg-mountain-meadow-100 h-screen flex flex-col">
      <Header />
      <main className="h-full p-4 md:p-8 flex flex-col gap-4">
      <SendToClipboard />
        <Clipboard lastItem={lastItem}/>
      </main>
    </div>
  );
}
