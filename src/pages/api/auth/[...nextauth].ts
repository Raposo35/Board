
import nextAuth from "next-auth";
import Providers from "next-auth/providers";


export default nextAuth({
  providers: [
    
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'    
  })
  ],

  
})