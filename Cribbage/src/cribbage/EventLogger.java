package cribbage;
import java.io.BufferedWriter;
import java.io.File;  // Import the File class
import java.io.FileWriter;
import java.io.IOException;  // Import the IOException class to handle errors

public abstract class EventLogger {

    private final String filename = "cribbage.log";

    public abstract void update(String str, Cribbage cribbage);

    public void writeToFile(String str)  {
        try {
            FileWriter fw = new FileWriter(filename, true);
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(str);
            bw.newLine();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
