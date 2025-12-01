/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/chess-console-stockfish
 * License: MIT, see file 'LICENSE'
 */

export class AnalysisGenerator {

    constructor(chessConsole, stockfishPlayer) {
        this.chessConsole = chessConsole
        this.stockfishPlayer = stockfishPlayer
    }

    async generate() {
        const analysis = []
        const chess = this.chessConsole.state.chess
        const history = chess.history({verbose: true})

        for (const move of history) {
            const fen = move.before
            const san = move.san
            const stockfishMove = await this.stockfishPlayer.moveRequest(fen)
            analysis.push({
                fen: fen,
                move: san,
                stockfishMove: {
                    from: stockfishMove.from,
                    to: stockfishMove.to,
                    promotion: stockfishMove.promotion,
                    score: stockfishMove.score
                }
            })
        }
        return analysis
    }
}
