const createKyc = async (req, res) => {
    const payload = req.body;
    const { id } = req.user;
    const checkKyc = await kycModel.findOne({ user: id });
    if (checkKyc) {
        return res.json({ message: "kyc exist" })
    }
    try {
        const newKyc = new kycModel({ user: id, ...payload });
        const savedKyc = await newKyc.save();

        await userModel.findByIdAndUpdate(id, { kyc: savedKyc.id }, { new: true });

    } catch (error) {
        return res.send("something went wrong")
    }

}
const getOneKyc = async (req, res) => {
    const { kycId } = req.query;
    try {
        const kyc = await kycModel.findById(kycId).populate("user");
        return res.json(kyc)
    } catch (error) {
        return res.send("something went wrong")
    }
}
module.exports = { createKyc, getOneKyc };