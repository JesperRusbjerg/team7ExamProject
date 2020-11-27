package loginModule;

class ApplicationProtocol {
    public String type;
    public int status;
    public Object body;


    @Override
    public String toString() {
        return "ApplicationProtocol{" +
                "type='" + type + '\'' +
                ", status=" + status +
                ", body=" + body +
                '}';
    }
}
