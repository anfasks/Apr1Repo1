import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic realm=Protected" },
    });
  }
  const base64 = authHeader.split(" ")[1];
  const [user, pass] = Buffer.from(base64, "base64").toString().split(":");
  if (user !== process.env.BASIC_AUTH_USER || pass !== process.env.BASIC_AUTH_PASS) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
