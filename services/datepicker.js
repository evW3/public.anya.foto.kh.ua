const { Datepicker } = require('../models/Datepicker');

class DatepickerService {
    async create(date) {
        const isExist = await Datepicker.findOne({ where: date });
        if(!isExist) {
            await Datepicker.create(date);
        } else {
            throw new Error('Date already exist');
        }
    }

    async getBusyDates(date) {
        return {
            month: date.month,
            days: await Datepicker.findAll({ where: date, raw: true }),
            year: date.year
        };
    }

    async destroyBusy(date) {
        await Datepicker.destroy({ where: date });
    }
}

module.exports = { DatepickerService: new DatepickerService() };