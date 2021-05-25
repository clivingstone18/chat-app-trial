package cribbage;

import ch.aplu.jcardgame.Hand;

import java.io.IOException;
import java.util.ArrayList;

public class DealLogger extends EventLogger {
    public void update(String str, Cribbage cribbage) {
        if (str == "DEAL") {
            System.out.println("writing");
            for (int i = 0 ; i < cribbage.nPlayers; i++) {
                Hand currHand = cribbage.getHands()[i];
                super.writeToFile("deal,P"+i+","+cribbage.canonical(currHand));
            }
        }
    }
}
