const { patchSchema } = require("../schema/patchSchema");

const checkBody = async (req , res , next) => {
    const {error} = patchSchema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message : error.details
        })
    }
    next()
}

module.exports = {
    checkBody
}