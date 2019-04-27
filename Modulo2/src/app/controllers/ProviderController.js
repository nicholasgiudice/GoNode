const { Appointment, User } = require('../models')
const moment = require('moment')
const { Op } = require('sequelize')

class ProviderController {
  async index (req, res) {
    const { id } = req.session.user
    const myAppointments = await Appointment.findAll({
      where: {
        provider_id: id,
        date: {
          [Op.between]: [
            moment()
              .startOf('day')
              .format(),
            moment()
              .endOf('day')
              .format()
          ]
        }
      },
      include: [
        {
          model: User
        }
      ]
    })

    myAppointments.map(
      a => (a.dateResolved = moment(a.date).format('DD/MM/YYYY HH:mm'))
    )

    return res.render('dashboardProvider', { myAppointments })
  }
}

module.exports = new ProviderController()
