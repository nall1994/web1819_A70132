public class IndexObject {
    private String id;
    private String file_path;
    private String title;

    public IndexObject(String id, String file_path,String title) {
        this.id=id;
        this.file_path = file_path;
        this.title=title;
    }

    public String getId() {
        return id;
    }

    public String getFile_path() {
        return file_path;
    }

    public String getTitle() {
        return title;
    }
}
