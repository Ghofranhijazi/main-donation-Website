const Payment = require('../models/payment'); 
const { Requests } = require('../models/requests');  // استيراد نموذج الطلبات

// Controller to handle creating a payment
exports.createPayment = async (req, res) => {
  try {
    const { userId, itemId, amount, paymentMethod, nameOfCard, numOfCard, month, year, code } = req.body;
    
    if (!userId || !itemId || !amount || !paymentMethod || !nameOfCard || !numOfCard || !month || !year || !code) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const payment = await Payment.create({
      userId,
      itemId,
      amount,
      paymentMethod,
      nameOfCard,
      numOfCard,
      month,
      year,
      code,
    });

    const request = await Requests.findOne({ where: { id: itemId } });

    if (request) {
      request.amount_raised = parseFloat(request.amount_raised) + parseFloat(amount);
      await request.save();  
    } else {
      return res.status(404).json({ message: 'Request not found' });
    }

    // رد بنجاح
    res.status(200).json({ message: 'Payment processed successfully', payment });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: 'Failed to process payment' });
  }
};
