import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { TABLES } from "@/utils/constants/tables";
import { PostgrestResponse } from "@supabase/supabase-js";
import { ClipboardHistory } from "@/models/clipboard-history.model";
import { AddToClipboardPayload } from "@/models/payload.types";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore as any);
  const requestPaylod: AddToClipboardPayload = await request.json();

  const supabaseResponse = await supabase.from(TABLES.HISTORY).insert([{ content: requestPaylod.content}]);

  return NextResponse.json(supabaseResponse);
}
export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore as any);

  const supabaseResponse: PostgrestResponse<ClipboardHistory> = await supabase
    .from(TABLES.HISTORY)
    .select("*");

  return NextResponse.json(supabaseResponse);
}
