"use client";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CheckCheck, Copy, RefreshCcw } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { ClipboardHistory } from "@/models/clipboard-history.model";
import { useState } from "react";
import { fetchLastClipboardItem } from "@/services/clipboard";

export type ClipboardProps = {
  lastItem: ClipboardHistory | null;
};

export function Clipboard({ lastItem }: ClipboardProps) {
  const [currentItem, setCurrentItem] = useState<ClipboardHistory | null>(
    lastItem,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const refetchData = async () => {
    setIsLoading(true);
    const { data } = await fetchLastClipboardItem();
    setCurrentItem(data);
    setIsLoading(false);
    setIsCopied(false);
  };

  const copyToClipboard = () => {
    if (currentItem) {
      navigator.clipboard.writeText(currentItem.content);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between flex-col gap-2 md:flex-row">
          <Button className="bg-mountain-meadow-500" onClick={refetchData}>
            Get clipboard{" "}
            <RefreshCcw className={isLoading ? "animate-spin" : ""} />
          </Button>
          <Button onClick={copyToClipboard} className={isCopied ? 'animate-bounce bg-mountain-meadow-900' : 'bg-mountain-meadow-500 hover:bg-mountain-meadow-900'}>
             {isCopied ? <>Copied to clipboard <CheckCheck /></> : <>Copy to clipboard <Copy /></>}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {currentItem ? (
          <Textarea value={currentItem.content} readOnly></Textarea>
        ) : (
          <span>No items in clipboard</span>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start"></CardFooter>
    </Card>
  );
}
