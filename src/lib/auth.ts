import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import prisma from "./prisma";
import { Role } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });

        if (!user || !user.passwordHash) {
          throw new Error("Invalid email or password");
        }

        if (!user.isActive) {
          throw new Error("Account is deactivated");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role as Role;
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export function hasRole(userRole: Role, allowed: Role[]): boolean {
  if (userRole === "SUPER_ADMIN") return true;
  return allowed.includes(userRole);
}

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  SUPER_ADMIN: ["*"],
  EVENT_MANAGER: [
    "event:read",
    "event:write",
    "registrations:read",
    "registrations:write",
    "tickets:read",
    "tickets:write",
    "pages:read",
    "pages:write",
    "emails:send",
    "reports:export",
    "spocs:read",
    "spocs:write",
  ],
  REGISTRATION_MANAGER: [
    "registrations:read",
    "registrations:write",
    "tickets:read",
    "tickets:write",
    "checkin:perform",
    "reports:export",
  ],
  SPEAKER_MANAGER: ["speakers:read", "speakers:write", "emails:send"],
  SPONSOR_MANAGER: ["sponsors:read", "sponsors:write", "emails:send"],
  STALL_MANAGER: ["stalls:read", "stalls:write"],
  ARTIST_MANAGER: ["artists:read", "artists:write", "performers:read", "performers:write"],
  CHECKIN_STAFF: ["checkin:perform", "tickets:verify"],
};
