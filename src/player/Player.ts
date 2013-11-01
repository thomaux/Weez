import Card = require("src/card/Card");
import Suit = require("src/card/Suit");

class Player {
    hand: Array<Card>;
    numberOfAces: number;

    constructor(){
        this.hand = [];
        this.numberOfAces = 0;
    }

    deal(cards: Array<Card>){
        for(var i = 0; i < cards.length; i++){
            if(cards[i].value === 1){
                this.numberOfAces += 1;
            }
        }
        this.hand = this.hand.concat(cards);
    }

    /**
     * Removes given card out of hand
     * @param card
     */
    play(card: Card){
        if(!this.owns(card)) return;
        this.hand.splice(this.hand.indexOf(card),1);
    }

    owns(card: Card){
        return this.hand.indexOf(card) !== -1;
    }

    hasCardsOfSuit(suit: Suit): boolean{
        for(var i = 0; i < this.hand.length; i++){
            if(this.hand[i].suit === suit){
                return true;
            }
        }
        return false;
    }
}

export = Player;