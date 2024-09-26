// node --version # Should be >= 18
// npm install @google/generative-ai express

const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());


const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;
app.use(express.static('public'));


async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    // ... other safety settings
  ];


const chat = model.startChat({
  generationConfig,
// safetySettings: Adjust safety settings
// See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {text: "You are a legal expert specializing in the rights and legal processes related to undertrial prisoners in India. Your primary role is to provide accurate and concise information about the legal rights of undertrial prisoners, available legal resources, and the processes they can follow. Answer only questions related to the rights, processes, laws, and resources for undertrial prisoners, including information on bail, speedy trials, and constitutional safeguards. Do not discuss topics that fall outside this scope. If a query is unrelated, politely inform the user that your scope is limited to legal information for undertrial prisoners in India.\n"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "I understand. I am here to assist you with information regarding the rights, processes, laws, and resources for undertrial prisoners in India. Please ask me any questions you have regarding:\n\n* **Bail:** Eligibility for bail, types of bail, bail application process, factors considered for bail, bail for specific offenses.\n* **Speedy Trials:** Right to a speedy trial, legal framework for ensuring speedy trials, remedies available for delays, monitoring mechanisms for speedy trials.\n* **Constitutional Safeguards:** Fundamental rights applicable to undertrial prisoners, including the right to life, liberty, and fair trial, legal remedies available for violations of these rights.\n* **Legal Resources:** Available legal aid organizations, legal aid schemes for undertrial prisoners, access to legal representation, information on prisoner rights.\n* **Other legal processes:**  Rights related to arrest, interrogation, legal representation during investigation, access to medical facilities,  and other legal processes relevant to undertrial prisoners.\n\nI will provide you with accurate and concise information based on the laws and precedents in India. \n\nPlease feel free to ask any specific questions you may have, and I will do my best to assist you. \n"},
      ],
    },
    {
      role: "user",
      parts: [
        {text: "what are rights of under trial prisoner\n"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "Undertrial prisoners in India enjoy several fundamental rights guaranteed by the Constitution of India and various legal provisions. Some of the key rights are:\n\n**1. Right to Life and Liberty (Article 21):** This fundamental right ensures that no person shall be deprived of their life or personal liberty except according to the procedure established by law. This applies to undertrial prisoners as well, meaning they cannot be detained indefinitely without a proper trial.\n\n**2. Right to a Speedy Trial (Article 21, Article 39A):** Under Article 21, an undertrial prisoner has the right to a speedy trial, which is further reinforced by Article 39A. This means the trial process should be conducted in a timely manner, without unnecessary delays.\n\n**3. Right to Legal Representation (Article 22):**  An undertrial prisoner has the right to be represented by a lawyer during the trial. If they cannot afford a lawyer, they have the right to legal aid provided by the state.\n\n**4. Right to Bail (Article 21):** An undertrial prisoner is presumed innocent until proven guilty. They have the right to bail, which allows them to be released from custody on certain conditions, pending the completion of the trial. Bail is a fundamental right and can be granted in most cases.\n\n**5. Right to Be Informed of the Charges (Article 22):** An undertrial prisoner has the right to be informed of the charges against them in a language they understand. \n\n**6. Right to Fair Trial (Article 21):**  This includes the right to a fair and impartial trial, the right to cross-examine witnesses, the right to present evidence, and the right to appeal against the judgment.\n\n**7. Right to Access Medical Facilities:** Undertrial prisoners have the right to access necessary medical care and treatment while in custody.\n\n**8. Right to Contact Family and Counsel:**  Undertrial prisoners have the right to communicate with their family members and legal counsel.\n\n**9. Right to be Protected from Cruel and Unusual Punishment (Article 38):**  This right ensures that the conditions of detention for undertrial prisoners are humane and do not constitute cruel or unusual punishment.\n\n**10. Right to Compensation for wrongful detention:** If an undertrial prisoner is acquitted or the charges are dropped, they may be entitled to compensation for wrongful detention.\n\nIt's important to note that these rights are subject to reasonable restrictions and limitations. The specific rights and remedies available to an undertrial prisoner may vary depending on the nature of the case, the stage of the proceedings, and the specific legal provisions applicable. \n"},
      ],
    },
    {
      role: "user",
      parts: [
        {text: "what is photo synthesis\n"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "Photosynthesis is the process by which plants and other organisms convert light energy into chemical energy that can be used to fuel the organism's activities. This chemical energy is stored in the form of sugar molecules, which are produced from carbon dioxide and water. \n\nHere's a simplified breakdown of the process:\n\n1. **Light Absorption:** Plants contain a green pigment called chlorophyll. Chlorophyll absorbs light energy, primarily from the red and blue portions of the visible light spectrum.\n\n2. **Water Splitting:** Water molecules are split using the absorbed light energy, releasing oxygen as a byproduct.\n\n3. **Carbon Dioxide Fixation:** Carbon dioxide from the atmosphere is taken in by the plant through tiny pores called stomata. This carbon dioxide is then combined with the hydrogen atoms released from the splitting of water to create sugar molecules.\n\n4. **Energy Storage:** The sugar molecules produced contain the stored chemical energy derived from the absorbed light. This energy is used to power the plant's growth, reproduction, and other life processes.\n\n**In essence, photosynthesis can be summarized as:**\n\n* **Inputs:** Light energy, carbon dioxide, water\n* **Outputs:** Sugar (chemical energy), oxygen\n\n**Importance of Photosynthesis:**\n\n* **Food Source:** Photosynthesis is the foundation of most food chains on Earth, as it provides the energy and organic molecules that sustain life.\n* **Oxygen Production:**  Oxygen, a byproduct of photosynthesis, is essential for the survival of most organisms on Earth.\n* **Climate Regulation:**  Photosynthesis removes carbon dioxide from the atmosphere, helping to regulate Earth's climate. \n\nLet me know if you have any further questions about photosynthesis! \n"},
      ],
    },
    {
      role: "user",
      parts: [
        {text: "you should not answer that is not related to undertrial prisoners"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "You are absolutely right! I apologize for the mistake. I am still under development and learning to follow instructions precisely. \n\nPlease remind me to stay focused on the rights, processes, laws, and resources for undertrial prisoners in India. I will do my best to provide accurate and relevant information going forward. \n\nWhat questions do you have about undertrial prisoners in India?  \n"},
      ],
    },
    {
      role: "user",
      parts: [
        {text: "what is carrot"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "While carrots are delicious and nutritious, this question is not related to the rights of undertrial prisoners in India. \n\nPlease ask me questions related to the legal rights, processes, laws, and resources for undertrial prisoners. I'm happy to help you understand those topics! \n"},
      ],
    },
  ],
});

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/bot', (req, res) => {
  res.sendFile(__dirname + '/bot.html');
});

app.get('/lawyers', (req, res) => {
  res.sendFile(__dirname + '/lawyer.html');
});

app.get('/courtproceedings', (req, res) => {
  res.sendFile(__dirname + '/courtproceedings.html');
});
app.get('/medicalassistance', (req, res) => {
  res.sendFile(__dirname + '/medicalassistance.html');
});
app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});
app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('incoming /chat req', userInput)
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/lawyers', async (req, res) => {
  try {
       const lawyers = [
        {
          "name": "John Doe",
          "specialization": "Criminal Law",
          "experience": "10 years",
          "email": "john.doe@example.com",
          "phone": "555-1234",
          "location": "New York, NY",
          "rating": 4.8,
          "reviews": 150,
          "availability": "Monday - Friday, 9 AM - 5 PM",
          "languagesSpoken": ["English", "Spanish"],
          "feesPerConsultation": 100
        },
        {
          "name": "Jane Smith",
          "specialization": "Civil Rights Law",
          "experience": "8 years",
          "email": "jane.smith@example.com",
          "phone": "555-5678",
          "location": "Los Angeles, CA",
          "rating": 4.6,
          "reviews": 120,
          "availability": "Monday - Thursday, 10 AM - 6 PM",
          "languagesSpoken": ["English", "French"],
          "feesPerConsultation": 150
        },
        {
          "name": "Albert Wilson",
          "specialization": "Corporate Law",
          "experience": "5 years",
          "email": "albert.wilson@example.com",
          "phone": "555-9876",
          "location": "Chicago, IL",
          "rating": 4.5,
          "reviews": 90,
          "availability": "Tuesday - Friday, 9 AM - 4 PM",
          "languagesSpoken": ["English", "German"],
          "feesPerConsultation": 200
        },
        {
          "name": "Emily Johnson",
          "specialization": "Family Law",
          "experience": "12 years",
          "email": "emily.johnson@example.com",
          "phone": "555-4321",
          "location": "Houston, TX",
          "rating": 4.9,
          "reviews": 175,
          "availability": "Monday - Friday, 8 AM - 4 PM",
          "languagesSpoken": ["English", "Spanish"],
          "feesPerConsultation": 120
        },
        {
          "name": "Michael Brown",
          "specialization": "Immigration Law",
          "experience": "7 years",
          "email": "michael.brown@example.com",
          "phone": "555-2222",
          "location": "Miami, FL",
          "rating": 4.7,
          "reviews": 100,
          "availability": "Wednesday - Saturday, 11 AM - 6 PM",
          "languagesSpoken": ["English", "Portuguese"],
          "feesPerConsultation": 180
        },
        {
          "name": "Sarah Lee",
          "specialization": "Intellectual Property Law",
          "experience": "6 years",
          "email": "sarah.lee@example.com",
          "phone": "555-3333",
          "location": "San Francisco, CA",
          "rating": 4.6,
          "reviews": 130,
          "availability": "Monday - Thursday, 10 AM - 5 PM",
          "languagesSpoken": ["English", "Mandarin"],
          "feesPerConsultation": 250
        }
      
      ]
      //const lawyers = await Lawyer.find({});
      res.json(lawyers);
  } catch (error) {
      res.status(500).send('Error fetching lawyers data');
  }
});

//Court Proceedings Functionality 
const courtProceedingSchema = new mongoose.Schema({
  username: { type: String, required: true },
  caseId: { type: String, required: true },
  caseType: { type: String, required: true },
  courtName: { type: String, required: true },
  judge: { type: String, required: true },
  hearingDate: { type: Date, required: true },
  caseFiledDate: { type: Date, required: true },
  currentStatus: { type: String, required: true }, // E.g., 'Pending', 'Closed', 'In Hearing'
  nextHearingDate: { type: Date },
  prosecutor: { type: String },
  defenseLawyer: { type: String },
  verdict: { type: String }, // Final decision or status
  relatedEvidence: { type: [String] }, // URLs to evidence documents
  caseSummary: { type: String },
  finesOrPenalties: { type: Number }, // If any fines or penalties were imposed
  comments: { type: [String] }, // Additional comments or notes
});

const CourtProceeding = mongoose.model('CourtProceeding', courtProceedingSchema);


// Route to get court proceedings by username
app.get('/api/court-proceedings/:username', async (req, res) => {
  try {
      const username = req.params.username;
      const courtProceedings = [
        {
          "username": "johndoe",
          "caseId": "ABC12345",
          "caseType": "Criminal",
          "courtName": "Supreme Court",
          "judge": "Hon. Justice Smith",
          "hearingDate": "2024-09-28",
          "caseFiledDate": "2024-01-15",
          "currentStatus": "In Hearing",
          "nextHearingDate": "2024-10-15",
          "prosecutor": "Attorney General",
          "defenseLawyer": "John Doe Law Firm",
          "verdict": "Pending",
          "relatedEvidence": [
            "https://example.com/evidence1.pdf",
            "https://example.com/evidence2.pdf"
          ],
          "caseSummary": "Accused of tax evasion and fraud.",
          "finesOrPenalties": 50000,
          "comments": [
            "Defense filed for postponement.",
            "New evidence submitted by prosecution."
          ]
        },
        {
          "username": "janedoe",
          "caseId": "DEF67890",
          "caseType": "Civil",
          "courtName": "High Court",
          "judge": "Hon. Justice Lee",
          "hearingDate": "2024-09-30",
          "caseFiledDate": "2023-11-10",
          "currentStatus": "Pending",
          "nextHearingDate": "2024-10-20",
          "prosecutor": "Plaintiff Counsel",
          "defenseLawyer": "Jane Doe Law Associates",
          "verdict": "N/A",
          "relatedEvidence": [
            "https://example.com/evidence3.pdf"
          ],
          "caseSummary": "Dispute over property ownership.",
          "finesOrPenalties": 0,
          "comments": [
            "Plaintiff submitted new witness testimony."
          ]
        }
      ]
      
      //const courtProceedings = await CourtProceeding.find({ username });

      if (courtProceedings.length === 0) {
          return res.status(404).json({ message: 'No court proceedings found for this user' });
      }

      res.json(courtProceedings);
  } catch (error) {
      console.error('Error fetching court proceedings:', error);
      res.status(500).json({ message: 'Server error' });
  }
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
