
import { FieldPacket, ResultSetHeader, Pool, RowDataPacket } from "mysql2/promise";

import { getPoolConnection } from "./data-source";


export class ReportRepository {
    async getReport(month: number, year: number, idApprentice: number): Promise<ResultSetHeader> {
        const connection: Pool = getPoolConnection();
        const getReportSQL: string = `
        SELECT 
    B.name AS "Apprentice", 
    C.name AS "Coach", 
    D.category_name AS "Workout Category", 
    A.duration_minutes, 
    A.activity_date 
FROM 
    training_activities A
INNER JOIN 
    apprentices B ON A.id_apprentice_fk = B.id_apprentice
INNER JOIN 
    coaches C ON A.id_coach_fk = C.id_coach 
INNER JOIN 
    activity_categories D ON A.id_category_fk = D.id_category 
WHERE 
    MONTH(A.activity_date) = ? 
    AND YEAR(A.activity_date) = ? 
    AND A.id_apprentice_fk = ?;     
        `;
        const dateValues: Array<number> =
            [
                month,
                year,
                idApprentice
            ];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(getReportSQL, dateValues);
        return result[0];
    }
}