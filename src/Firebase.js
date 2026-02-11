/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/chess-console-stockfish
 * License: MIT, see file 'LICENSE'
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js"
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js"

export class Firebase {
    constructor(firebaseConfig, onUserChanged) {
        this.app = initializeApp(firebaseConfig)
        this.auth = getAuth(this.app)
        this.db = getFirestore(this.app)
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

    async saveGame(userId, gameData) {
        try {
            const docRef = await addDoc(collection(this.db, "games"), {
                userId,
                ...gameData,
                createdAt: new Date()
            })
            return docRef.id
        } catch (error) {
            console.error("Error saving game", error)
            throw error
        }
    }

    async getGames(userId) {
        try {
            const q = query(
                collection(this.db, "games"),
                where("userId", "==", userId),
                orderBy("createdAt", "desc")
            )
            const querySnapshot = await getDocs(q)
            const games = []
            querySnapshot.forEach((doc) => {
                games.push({ id: doc.id, ...doc.data() })
            })
            return games
        } catch (error) {
            console.error("Error getting games", error)
            throw error
        }
    }
}
