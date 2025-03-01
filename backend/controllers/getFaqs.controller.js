import faqSchema from "../models/faqSchema.js";

export const getFaqs = async (req, res) => {
    try {
         const faqs = await faqSchema.find();

         res.status(200).json(faqs)
    } catch (err) {
        res.status(500).json({ message: "Error retrieving FAQs"})
    }
}