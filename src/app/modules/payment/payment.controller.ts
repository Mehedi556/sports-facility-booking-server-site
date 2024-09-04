import { Request, Response } from "express"
import { paymentServices } from "./payment.service"

const confirmationController = async (req: Request, res: Response) => {
    const result = await paymentServices.confirmationService(req?.query?.transactionId as string)
    if(result){
        res.send(`
         <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(to right, #93c5fd, #4f46e5);
          color: #fff;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .container {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 20px 40px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          max-width: 500px;
          text-align: center;
        }
        h1 {
          margin-bottom: 20px;
          font-size: 2rem;
        }
        p {
          font-size: 1.2rem;
          margin: 10px 0;
        }
        .highlight {
          font-weight: bold;
          color: #fde047;
        }
        .return-home {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #1d4ed8;
          color: #fff;
          border: none;
          border-radius: 8px;
          text-decoration: none;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
        }
        .return-home:hover {
          background-color: linear-gradient(to right, #93c5fd, #4f46e5);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Payment Success</h1>
        <p><span class="highlight">Transaction ID:</span> ${result?.transactionId}</p>
        <p><span class="highlight">Date:</span> ${new Date(result?.date).toLocaleDateString()}</p>
        <p><span class="highlight">Time:</span> ${result?.startTime} - ${result?.endTime}</p>
        <p><span class="highlight">Amount Paid:</span> $${result?.payableAmount}</p>
        <p><span class="highlight">Payment Status:</span>Paid</p>
        <a href="https://sports-facility-booking-client-iota.vercel.app/" class="return-home">Return Home</a>
        <a href="http://localhost:5173/" class="return-home">Return local Home</a>
      </div>
    </body>
    </html>
        `)
    }
    
} 

export const paymentController = {
    confirmationController
}