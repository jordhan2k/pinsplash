import { envConfig } from "@/config";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const search = new URL(request.url).searchParams.toString();
    const clonedRequest = request.clone();
    const { slug } = await params;
    const pathname = slug.join("/") + (search ? `?${search}` : "");
    const proxyURL = new URL(pathname, envConfig.API_ENDPOINT);
    const proxyRequest = new Request(proxyURL, clonedRequest);

    proxyRequest.headers.set(
      "Authorization",
      `Client-ID ${envConfig.UNSPLASH_ACCESS_TOKEN}`
    );
    const res = await fetch(proxyRequest, { cache: "no-store" });

    if (!res.ok) {
      return new Response(await res.text(), { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (reason) {
    const message =
      reason instanceof Error ? reason.message : "Unexpected exception";

    return new Response(message, { status: 500 });
  }
}
