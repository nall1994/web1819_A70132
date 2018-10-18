import jdk.nashorn.internal.parser.JSONParser;

import java.io.*;
import java.util.ArrayList;
import org.json.*;


public class IndexGenerator {
    private static ArrayList<IndexObject> objects_list = new ArrayList<>();

    public static void main(String[] args) {

        File dir = new File("../../json/");
        System.out.println(dir.getAbsolutePath());
        File[] files = dir.listFiles(new FilenameFilter() {
            @Override
            public boolean accept(File dir, String name) {
                return name.endsWith(".json");
            }
        });



        try {
            for(File f : files) {
                if(!f.getAbsolutePath().endsWith("index.json")) {
                    String jsonData = readFile(f.getAbsolutePath());
                    JSONObject jobj = new JSONObject(jsonData);
                    IndexObject obj = new IndexObject(jobj.getString("_id"),jobj.getString("_id") + ".json", jobj.getString("titulo"));
                    objects_list.add(obj);
                }

            }
        } catch(Exception e) {
            e.printStackTrace();
        }

        JSONArray jArray = new JSONArray();
        for(IndexObject o : objects_list) {
            JSONObject obj = new JSONObject();
            obj.put("_id",o.getId());
            obj.put("file_path",o.getFile_path());
            obj.put("titulo",o.getTitle());
            jArray.put(obj);
        }

        try {
            File f = new File("../../json/index.json");
            FileWriter fw = new FileWriter(f);
            fw.write(jArray.toString(2));
            fw.flush();
            fw.close();

        } catch(IOException io) {
            io.printStackTrace();
        }


    }

    public static String readFile(String filename) {
        String result = "";
        try {
            BufferedReader br = new BufferedReader(new FileReader(filename));
            StringBuilder sb = new StringBuilder();
            String line = br.readLine();
            while (line != null) {
                sb.append(line);
                line = br.readLine();
            }
            result = sb.toString();
        } catch(Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
