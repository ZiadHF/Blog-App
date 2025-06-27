import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest){
    if (request.nextUrl.pathname.startsWith("/posts") || request.nextUrl.pathname.startsWith("/about")) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/posts", request.url));
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};