package cribbage;

import ch.aplu.jcardgame.Card;
import ch.aplu.jcardgame.Deck;
import ch.aplu.jcardgame.Hand;

import java.util.ArrayList;
import java.util.Arrays;

public class DiscardLogger extends EventLogger {

        private Hand[] prevHands;

        public void update(String str, Cribbage cribbage) {
                if (str == "DEAL") {
                        prevHands = new Hand[cribbage.nPlayers];
                        for (int i = 0; i < cribbage.nPlayers; i++) {
                                prevHands[i] = new Hand(cribbage.getDeck());
                                ArrayList<Card> currHand = cribbage.getHands()[i].getCardList();
                                for (int j = 0; j < currHand.size(); j++) {
                                        prevHands[i].insert(currHand.get(j).clone(), false);
                                }
                        }
                }

                if (str == "DISCARD") {
                        for (int i = 0 ; i < cribbage.nPlayers; i++) {
                                Hand currHand = cribbage.getHands()[i];
                                ArrayList<String> cardsAddedToCrib = new ArrayList<>();
                                prevHands[i].getCardList().removeAll(currHand.getCardList());
                                super.writeToFile("discard,P"+i+","+cribbage.canonical(prevHands[i]));
                        }

                }

        }
}