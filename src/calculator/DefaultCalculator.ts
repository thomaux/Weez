import Player = require("src/player/Player");
import Suit = require("src/card/Suit");

class DefaultCalculator {
    score(players: Array<Player>, activePlayers: Array<Player>, target: number, scoredTicks: number, trump: Suit, defaultTrump: Suit) {
        var individualScore = this.getIndividualScore(scoredTicks, target, trump, defaultTrump),
            activePlayerRate = (4 - activePlayers.length) / activePlayers.length;

        var currentPlayer : Player;
        for(var i = 0; i < 4; i++){
            currentPlayer = players[i];
            if(activePlayers.indexOf(currentPlayer) !== -1){
                currentPlayer.score += (activePlayerRate * individualScore);
            } else {
                currentPlayer.score -= individualScore;
            }
        }
    }

    getIndividualScore(scoredTicks: number, target: number, trump: Suit, defaultTrump: Suit): number {
        var delta = scoredTicks - target;
        return (delta < 0 ? -1 : 1) * (2 + Math.abs(delta));
    }
}

export = DefaultCalculator;
