
export class StatusCode {
    static CODE_200_000: string = "200-000";
    static DESC_200_000: string = "Success";

    static CODE_400_000: string = "400-000";
    static DESC_400_000: string = "잘못된 Input 파라미터 오류";

    static CODE_405_000: string = "405-000";
    static DESC_405_000: string = "Method Not Allowed";

    static CODE_408_000: string = "408-000";
    static DESC_408_000: string = "Request Timeout";

    static CODE_500_000: string = "500-000";
    static DESC_500_000: string = "Internal Error";
    
    static CODE_500_001: string = "500-001"; 
    static DESC_500_001: string = "Database Connection Error";

    static CODE_500_002: string = "500-002"; 
    static DESC_500_002: string = "Database Insert Error (a foreign key constraint fails)";
}