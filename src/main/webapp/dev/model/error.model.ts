/**
 * Created by gwuli on 27.11.2016.
 */
export class ErrorModel {

    severity: string;
    summary: string;
    detail: string;


    constructor(summary: string, detail: string) {
        this.severity = 'error';
        this.summary = summary;
        this.detail = detail;
    }
}