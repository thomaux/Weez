import Card = require("src/card/Card");
import Suit = require("src/card/Suit");
import Deck = require("src/card/Deck");
import Phase = require("src/game/Phase");
import Player = require("src/player/Player");
import Mode = require("src/game/Mode");
import Bidding = require("src/area/Bidding");
import Bid = require("src/bid/Bid");

function getPlayerNextOf(player: Player): Player{
    return players[ (players.indexOf(player) + 1) % 4]
}

export var
    activePlayers: Array<Player>,
    currentPlayer: Player,
    deck: Deck,
    dealer: Player,
    phase: Phase,
    players: Array<Player>,
    trump: Suit,
    defaultTrump: Suit,
    bidding: Bidding,
    mode:Mode,
    target: number,

    deal = function(){
        var cardsToDeal: Array<Card>,
            start = (players.indexOf(dealer) + 1) % 4,
            i = 0,
            lastCard = deck.cards[0];

        while(deck.cards.length){
            cardsToDeal = deck.take(deck.cards.length > 20 ? 4 : 5);
            players[ (start + i++ ) % 4 ].deal(cardsToDeal);
        }

        currentPlayer = players[start];
        phase = Phase.BID;
        defaultTrump = lastCard.suit;
    },

    play = function(){
        mode = bidding.resolvedMode;
        if(mode === Mode.PASS){
            // TODO what to do in case mode is PASS?
            return;
        }

        trump = bidding.resolvedTrump || defaultTrump;
        activePlayers = bidding.activePlayers;
        phase = Phase.PLAY;
        target = bidding.target;
        currentPlayer = getPlayerNextOf(dealer);
    },

    advanceCurrentPlayer = function(){
        currentPlayer = getPlayerNextOf(currentPlayer);
    },

    setup = function(_deck: Deck, _players: Array<Player>){
        deck = _deck;
        phase = Phase.SETUP;
        players = _players;
        dealer = players[0];
        bidding = new Bidding();
        mode = undefined;
        target = 0;
        trump = undefined;
    }