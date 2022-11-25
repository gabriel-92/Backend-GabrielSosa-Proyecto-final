import twilio from "twilio";


const accountSid = process.env.SID;
const authToken = process.env.TOKEN;

const client = twilio(accountSid, authToken);


export default client;