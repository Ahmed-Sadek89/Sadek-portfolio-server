import dotenv from 'dotenv';

dotenv.config()

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ""
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ""

export const googleEnv = {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
}

const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID || ""
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET || ""

export const facebookEnv = {
    FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET
}

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || ""
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || ""

export const githubEnv = {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET
}

export const PASSPORT_CALLBACK_URL = process.env.PASSPORT_CALLBACK_URL|| "";