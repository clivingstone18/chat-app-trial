package cribbage;

public class PlayerLogger extends EventLogger{
    public void update(String str, Cribbage cribbage) {
        if (str == "PLAYER") {
            super.writeToFile("play,P" + cribbage.getCurrentSegment().lastPlayer + "," +
                    cribbage.total(cribbage.getCurrentSegment().segment) + "," +
                    cribbage.canonical(cribbage.getCurrentSegment().segment.getLast()));
        }
    }
}
