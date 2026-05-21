const Setting = require('../models/Setting');

// ??????? ???? ??????? ???? ?? ??? (Public)
const getWhatsappNumber = async (req, res) => {
  try {
    let setting = await Setting.findOne({ key: 'whatsapp_number' });
    if (!setting) {
      setting = await Setting.create({ key: 'whatsapp_number', value: '910000000000' });
    }
    res.json({ whatsappNumber: setting.value });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ??????? ???? ????? ???? ?? ??? (Admin Only)
const updateWhatsappNumber = async (req, res) => {
  const { whatsappNumber } = req.body;
  try {
    let setting = await Setting.findOne({ key: 'whatsapp_number' });
    if (setting) {
      setting.value = whatsappNumber;
      await setting.save();
    } else {
      setting = await Setting.create({ key: 'whatsapp_number', value: whatsappNumber });
    }
    res.json({ message: 'WhatsApp number updated successfully', whatsappNumber: setting.value });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ??? ??????? ???? ?? ??? (Public)
const getAddress = async (req, res) => {
  try {
    let setting = await Setting.findOne({ key: 'address' });
    if (!setting) {
      setting = await Setting.create({ key: 'address', value: '123 Fitness Street, Gym City, GC 12345' });
    }
    res.json({ address: setting.value });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ??? ????? ???? ?? ??? (Admin Only)
const updateAddress = async (req, res) => {
  const { address } = req.body;
  try {
    let setting = await Setting.findOne({ key: 'address' });
    if (setting) {
      setting.value = address;
      await setting.save();
    } else {
      setting = await Setting.create({ key: 'address', value: address });
    }
    res.json({ message: 'Address updated successfully', address: setting.value });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getWhatsappNumber,
  updateWhatsappNumber,
  getAddress,
  updateAddress
};
