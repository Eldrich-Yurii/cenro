import applicationSchema from "../models/applicationSchema.js"

export const getPendingAttendanceCert = async (req, res) => {
    try {
      const pendingUsers = await applicationSchema.find({ 
        status: "Approved", // Only those approved for a webinar
        preTest: true, // Only who submitted pretest
        /*
        * try mo kung pwede palitan ng preTestPath at postTestPath yung property na preTest at postTest
        * and then change true to !null check mo kung gumagana yon nangsa ganon di na tayo mag add pa ng 
        * sa part na to baka di naman pala kase need eh
        */
        postTest: true, // Only who submitted post test
        attendance: false // Users who haven't attended yet
      });
  
      res.status(200).json(pendingUsers);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving approved attendees" });
    }
  }