import Application from "./../models/applicationSchema.js"


export const getApplication = async (req, res) => {
    try {

        const userId = req.params

        if(!userId) {
            return res.status(400).json({ message: "User ID is required" })
        }

        const application = await Application.find()

        if(!application.length) {
            return res.status(404).json({ message: "Application not found" })
        }

        res.status(200).json(application)
    } catch (err) {
        res.status(500).json({ message: "Error Fetching Application", err})
    }
}

export const getAllApplication = async (req, res) => {
    try {

        // const userId = req.params

        // if(!userId) {
        //     return res.status(400).json({ message: "User ID is required" })
        // }

        const application = await Application.find()

        // if(!application.length) {
        //     return res.status(404).json({ message: "Application not found" })
        // }

        res.status(200).json(application)
    } catch (err) {
        res.status(500).json({ message: "Error Fetching Application", err})
    }
}