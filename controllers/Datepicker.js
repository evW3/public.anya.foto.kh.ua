const { DatepickerService } = require('../services/datepicker');

class DatepickerController {
    async setBusy(req, res) {
        const { month, year, day } = req.body;
        try {
            await DatepickerService.create({ month, year, day });
            res.status(201).json({ message: 'Date has been created successful' });
        } catch (e) {
            res.status(500).json({ message: `[ERROR]: ${e}`});
        }
    }

    async getBusy(req, res) {
        const { month, year } = req.body;
        const currentDate = new Date();
        try {
            res.status(200).json(await DatepickerService.getBusyDates({
                        month: month || currentDate.getMonth() + 1,
                        year: year || currentDate.getFullYear()
                    }));
        } catch (e) {
            res.status(500).json({ message: `[ERROR]: ${e}`});
        }
    }

    async deleteBusy(req, res) {
        try {
            const { day, month, year } = req.body;
            await DatepickerService.destroyBusy({ day, month, year });
            res.status(200).json({ message: 'Busy day was been unset' });
        } catch (e) {
            res.status(500).json({ message: `[ERROR]: ${ e }`});
        }
    }
}

module.exports = { DatepickerController: new DatepickerController() };