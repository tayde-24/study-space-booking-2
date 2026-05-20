// 
import passport from "passport"

import {
  Strategy as GoogleStrategy
} from "passport-google-oauth20"

import prisma from "../utils/prisma.js"

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,

      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET,

      callbackURL:
        "http://localhost:3001/auth/google/callback"
    },

    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      try {
        let user =
          await prisma.user.findUnique({
            where: {
              googleId: profile.id
            }
          })

        if (!user) {
          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName
            }
          })
        }

        return done(null, user)

      } catch (error) {
        return done(error, null)
      }
    }
  )
)

// SAVE USER ID INTO SESSION
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// RESTORE USER FROM SESSION
passport.deserializeUser(
  async (id, done) => {
    try {
      const user =
        await prisma.user.findUnique({
          where: { id }
        })

      done(null, user)

    } catch (error) {
      done(error, null)
    }
  }
)

export default passport