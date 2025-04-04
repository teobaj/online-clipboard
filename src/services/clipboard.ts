import { ClipboardHistory } from "@/models/clipboard-history.model";
import { AppError } from "@/utils/errors/app-error";
import { PostgrestResponse } from "@supabase/supabase-js";

type FetchLastClipboardItemRes = Promise<
  | {
      data: ClipboardHistory;
      error: null;
    }
  | {
      data: null;
      error: AppError;
    }
>;

export async function fetchLastClipboardItem(): FetchLastClipboardItemRes {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const url = new URL("/api/clipboard/last", baseURL);
    const res = await fetch(url);
    const resData: PostgrestResponse<ClipboardHistory> = await res.json();
    if (!resData.data) {
      throw new Error("No records found");
    }
    const lastItem = resData.data[0];
    return {
      data: lastItem,
      error: null,
    };
  } catch (e) {
    return { data: null, error: new AppError((e as Error).message) };
  }
}
