/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/chess-console-stockfish
 * License: MIT, see file 'LICENSE'
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"

export class Auth {
    constructor(firebaseConfig, onUserChanged) {
        this.app = initializeApp(firebaseConfig)
        this.auth = getAuth(this.app)
        this.provider = new GoogleAuthProvider()

        onAuthStateChanged(this.auth, (user) => {
            if (onUserChanged) {
                onUserChanged(user)
            }
        })
    }

    async login() {
        try {
            const result = await signInWithPopup(this.auth, this.provider)
            return result.user
        } catch (error) {
            console.error("Login failed", error)
            throw error
        }
    }

    async logout() {
        try {
            await signOut(this.auth)
        } catch (error) {
            console.error("Logout failed", error)
            throw error
        }
    }
}
