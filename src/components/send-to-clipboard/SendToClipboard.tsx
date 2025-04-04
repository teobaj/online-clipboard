"use client";

import { ComponentRef, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Textarea } from "../ui/textarea";
import { PostgrestResponse } from "@supabase/supabase-js";
import { LoaderCircle, Send } from 'lucide-react'

export function SendToClipboard() {
  const textareaRef = useRef<ComponentRef<typeof Textarea>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setIsError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleClick = async () => {
    if (!textareaRef.current?.value) {
      setIsError("You cannot send empty clipboard");
      return;
    }
    if (isLoading){
      return;
    }
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(null)
    fetch("/api/clipboard", {
      method: "POST",
      body: JSON.stringify({
        content: textareaRef.current.value,
      }),
    })
      .then((r) => r.json())
      .then((data: PostgrestResponse<null>) => {
        if (data.status === 201) {
          setIsSuccess(true);
        }
      })
      .catch(e => {
        if(e instanceof Error){
          setIsError(e.message)
        } else {
          setIsError("Something went wrong")
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send to Clipboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea className="h-[200px]" ref={textareaRef} />
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <Button disabled={isLoading} className="bg-mountain-meadow-500 flex" onClick={handleClick}>
          Send to clipboard 
          {isLoading ?  <LoaderCircle className="animate-spin" /> : <Send />}
        </Button>
        {isSuccess && <span className="text-mountain-meadow-300"> Success </span>}
        {error && <span className="text-destructive"> {error}</span>}
      </CardFooter>
    </Card>
  );
}
