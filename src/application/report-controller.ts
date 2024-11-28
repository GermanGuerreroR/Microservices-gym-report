
import { ReportRepository } from "../infraestructure/repositories/report-repository";
export class ReportController {


    constructor(private repository = new ReportRepository()) {

    }


    async generateReport(month: number, year: number, id: number) {
        const result = await this.repository.getReport(month, year, id);
        return result;
    }

}