import React, { useState } from "react";
import QR from "../../assets/DOCQRCODE.png"

const DonationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("Bank Transfer");
  const [utr, setUtr] = useState("");

  const handleReceiptRequest = (e) => {
    e.preventDefault();
    alert(`Receipt request submitted for INR ${amount} via ${paymentMode}. It will be sent to ${email}.`);
    setName("");
    setEmail("");
    setAmount("");
    setPaymentMode("Bank Transfer");
    setUtr("");
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* 80G & 12A Certificate Info */}
      <div className="bg-[#FF6F00] text-white p-4 rounded-md text-center mb-6">
        <h2 className="text-2xl font-bold">We're here to inform you!</h2>
        <p className="text-lg">Now our NGO has got <strong>80G and 12A</strong> certification!</p>
      </div>
      
      {/* What is 80G & 12A */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-[#80CBC4]">What is 80G & 12A?</h2>
        <p><strong>80G:</strong> Allows donors to claim tax deduction benefits on donations.</p>
        <p><strong>12A:</strong> Provides tax exemption for NGOs, reducing their tax liability.</p>
        <p className="mt-2 text-sm text-gray-600">Donations are eligible for tax exemption under 80G.</p>
      </div>
      
      {/* Bank Transfer & QR Code - Flex Layout */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Bank Details */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#80CBC4]">Bank Transfer Details</h2>
          <p><strong>Name:</strong> DROPS OF CHANGE WELFARE SOCIETY</p>
          <p><strong>Bank Name:</strong> BANK OF BARODA</p>
          <p><strong>Account Number:</strong> 44820200000403</p>
          <p><strong>IFSC Code:</strong> BARB0KHOJKI</p>
          <p><strong>Bank Address:</strong> KHOJKIPUR, AMBALA CANTT, 133001</p>
          <br />
          <h2 className="text-xl font-semibold mb-4 text-[#80CBC4]">Cheque Printing Details</h2>
          <p><strong>Name:</strong> DROPS OF CHANGE WELFARE SOCIETY</p>
        </div>

        
        {/* QR Code */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-4 text-[#80CBC4]">Scan & Pay</h2>
          <img src={QR} alt="UPI QR Code" className="mx-auto w-70 h-100 rounded-md" />
          <p className="mt-2 text-gray-600">Scan the QR code to donate via UPI.</p>
        </div>
      </div>
      
      {/* Receipt Request Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-[#80CBC4]">Request for Donation Receipt</h2>
        <form onSubmit={handleReceiptRequest}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              className="w-full p-2 border rounded-md" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Email</label>
            <input 
              type="email" 
              placeholder="e.g., your@email.com" 
              className="w-full p-2 border rounded-md" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Amount (INR)</label>
            <input 
              type="number" min="1"
              placeholder="Enter the donated amount" 
              className="w-full p-2 border rounded-md" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Payment Mode</label>
            <div className="flex gap-4">
              {['Bank Transfer', 'Cheque', 'UPI', 'Other'].map(mode => (
                <label key={mode} className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="paymentMode" 
                    value={mode} 
                    checked={paymentMode === mode} 
                    onChange={(e) => setPaymentMode(e.target.value)}
                  />
                  {mode}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">UTR Number/ Name of person (if Cash)</label>
            <input 
              type="text" 
              placeholder="Enter UTR Number or Name" 
              className="w-full p-2 border rounded-md" 
              value={utr} 
              onChange={(e) => setUtr(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-[#FF6F00] text-white py-2 rounded-md hover:bg-[#FF8F00] transition-all duration-300">
            Request Receipt 📄
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationPage;