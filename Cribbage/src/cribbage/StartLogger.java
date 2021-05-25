package cribbage;

import java.io.IOException;

public class StartLogger extends EventLogger {
    public void update(String str, Cribbage cribbage) {
        if (str.equals("START")) {
            super.writeToFile("starter," + cribbage.canonical(cribbage.getStarter().getFirst()));
        }
    }
}
