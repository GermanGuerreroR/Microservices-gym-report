import express, { Request, Response } from "express";
import { ReportController } from "../../application/report-controller";

const router = express.Router();

const apiVersion = '/api/v1';

const reportController = new ReportController();

router.get(`${apiVersion}/reports/:month/:year/:id`, async (req: Request, res: Response) => {

    const month = req.params.month;
    const year = req.params.year;
    const idApprentice = req.params.id;
    console.log(month, year, idApprentice);

    try {
        const result = await reportController.generateReport(parseInt(month), parseInt(year), parseInt(idApprentice));
        if (result.fieldCount > 0)
            res.send({ ok: true, msg: `Gym report  Month:${month} Year ${year}`, report: result })

        res.status(404).send({ msg: `There are no reports available for the user with ${idApprentice}` })

    } catch (error) {
        res.status(500).send({ msg: "Invalid request", error: error })
    }

});

export { router }