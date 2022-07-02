export class User {
    public username: string;
    public password: string;
    public request_token:string;
    public token: string;
    public expires_at: string;
    constructor(){
        this.username = ""; 
        this.password = ""; 
        this.request_token = "";
        this.token = "";
        this.expires_at = "";
    }
}
