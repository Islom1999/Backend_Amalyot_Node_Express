
const moment = require('moment')

const hbsHelpers = (handlebars) => {
    handlebars.registerHelper('formatDate', (dateString) => {
        return new handlebars.SafeString(
            moment(dateString).format("DD.MM.YYYY").toUpperCase()
        )
    })
}

module.exports = hbsHelpers