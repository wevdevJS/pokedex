import { NextResponse } from "next/server";

const middleware = (req: any) => {
    const session = req.cookies.get("token");
    const url = req.url
    if (!session && (url === "http://localhost:3000/" || url.includes('/DetailPokemon')))
        return NextResponse.redirect('http://localhost:3000/login')

    if (session && url === "http://localhost:3000/login")
        return NextResponse.redirect('http://localhost:3000/')

    NextResponse.next()
}

export default middleware;