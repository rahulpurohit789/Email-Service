import { sendEmail } from "../services/Emailservice.js"; 
import { transporter } from "../services/Emailservice.js"; 

async function sendEmailController(req, res) {
  console.log(req.body);   // Log form data
  console.log(req.files);  // Log file uploads

  try {
    // Check for required fields
    if (!req.body.to || !req.body.subject || !req.body.tbody) {
      return res.status(400).send('Missing required fields in the request body.');
    }

    // Extract fields from req.body
    const { from, to, subject, tbody, cc, bcc } = req.body;
    const attachments = req.files || [];  // Handle file uploads

    // Construct mail options
    const mailOptions = {
      from,
      to,
      subject,
      text: tbody,  // Use 'text' for plain text content
      cc,
      bcc,
      attachments: attachments.map(file => ({
        filename: file.originalname,
        content: file.buffer
      }))
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.send('Email sent: ' + info.response);
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default { sendEmailController };  
