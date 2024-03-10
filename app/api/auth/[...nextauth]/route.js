
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"


const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:"651708892638-nihdkoadkc0a3vdmikvrmnm4ovf22oie.apps.googleusercontent.com",
            clientSecret:"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"
        })
    ],
    secret: 'codingispassion'
})

export {handler as GET, handler as POST}