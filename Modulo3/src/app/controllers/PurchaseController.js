const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    const purchaseOrder = await Purchase.create({
      buyer: req.userId,
      ad
    })

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    return res.status(201).json(purchaseOrder)
  }

  async confirm (req, res) {
    const { purchaseId } = req.body

    const { ad } = await Purchase.findById(purchaseId).populate({
      path: 'ad',
      populate: {
        path: 'author'
      }
    })

    if (ad.purchasedBy) {
      throw new Error('The Ad is been purchased')
    }

    if (!ad.author._id.equals(req.userId)) {
      throw new Error('The user is not owner of Ad')
    }

    ad.purchasedBy = purchaseId

    await ad.save()

    return res.status(200).json(ad)
  }
}

module.exports = new PurchaseController()
