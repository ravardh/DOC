import React, { useState } from "react";
import QR from "../../assets/DOCQRCODE.png";
import axios from "../../config/api";
import { motion } from "framer-motion";
import { Building2, Receipt, FileCheck, Landmark } from "lucide-react";

const DonationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("Bank Transfer");
  const [utr, setUtr] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleScreenshotChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  const handleReceiptRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    if (!name || !email || !amount || !utr) {
      setMessage({
        text: "Please fill all required fields.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("amount", amount);
    formData.append("mode", paymentMode);
    formData.append("utr", utr);
    if (screenshot) {
      formData.append("screenshot", screenshot);
    }

    try {
      const response = await axios.post("/api/public/donations", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage({
        text: `Receipt request submitted for INR ${amount}. Receipt will be sent to ${email}.`,
        type: "success",
      });

      setName("");
      setEmail("");
      setAmount("");
      setPaymentMode("Bank Transfer");
      setUtr("");
      setScreenshot(null);
    } catch (error) {
      console.error("Error submitting donation:", error);
      setMessage({
        text: "Failed to submit donation. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-[#FF6F00] text-white p-6 rounded-lg text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Make a Difference Today!</h2>
        <p className="text-lg">
          Your contribution helps us create lasting impact. All donations are
          eligible for tax benefits under sections 80G and 12A.
        </p>
      </div>

      {/* Tax Benefits Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-[#80CBC4] flex items-center">
          <Receipt className="mr-2" /> Tax Benefits & Certifications
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <FileCheck className="mr-2 text-[#FF6F00]" /> Section 80G Benefits
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>50% tax deduction on your donation amount</li>
              <li>Valid for both individual and corporate donors</li>
              <li>
                Applicable for donations made in any mode (Cash/Bank
                Transfer/UPI)
              </li>
              <li>Digital donation receipts provided instantly</li>
              <li>No maximum limit on donation amount for deduction</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <Landmark className="mr-2 text-[#FF6F00]" /> Section 12A
              Registration
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Official recognition of our charitable status</li>
              <li>Complete transparency in fund utilization</li>
              <li>Regular auditing and compliance</li>
              <li>Tax exemption on our income</li>
              <li>Enhanced credibility and trust</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CSR Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-[#80CBC4] flex items-center">
          <Building2 className="mr-2" /> Corporate Social Responsibility (CSR)
        </h2>

        <div className="space-y-4">
          <p className="text-gray-700">
            Partner with us for your CSR initiatives! We offer:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-[#FF6F00]">
                Why Choose Us for CSR?
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Registered under Section 80G and 12A</li>
                <li>Transparent fund utilization</li>
                <li>Regular impact reports</li>
                <li>Customized CSR programs</li>
                <li>Professional documentation</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-[#FF6F00]">CSR Focus Areas</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Education and Skill Development</li>
                <li>Healthcare Initiatives</li>
                <li>Community Development</li>
                <li>Women Empowerment</li>
                <li>Environmental Sustainability</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              For CSR partnerships and detailed proposals, please contact us at{" "}
              <a
                href="mailto:contactus@dropsofchange.in"
                className="text-[#FF6F00] hover:underline"
              >
                contactus@dropsofchange.in
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Existing Bank Details Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#80CBC4]">
            Bank Transfer Details
          </h2>
          <p>
            <strong>Name:</strong> DROPS OF CHANGE WELFARE SOCIETY
          </p>
          <p>
            <strong>Bank Name:</strong> BANK OF BARODA
          </p>
          <p>
            <strong>Account Number:</strong> 44820200000403
          </p>
          <p>
            <strong>IFSC Code:</strong> BARB0KHOJKI
          </p>
          <p>
            <strong>Bank Address:</strong> KHOJKIPUR, AMBALA CANTT, 133001
          </p>
          <br />
          <h2 className="text-xl font-semibold mb-4 text-[#80CBC4]">
            Cheque Printing Details
          </h2>
          <p>
            <strong>Name:</strong> DROPS OF CHANGE WELFARE SOCIETY
          </p>
        </div>

        <div className="flex-1 bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-4 text-[#80CBC4]">
            Scan & Pay
          </h2>
          <img
            src={QR}
            alt="UPI QR Code"
            className="mx-auto w-70 h-100 rounded-md"
          />
          <p className="mt-2 text-gray-600">
            Scan the QR code to donate via UPI
          </p>
        </div>
      </div>

      {/* Existing Receipt Request Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-[#80CBC4]">
          Request for Donation Receipt
        </h2>
        <form onSubmit={handleReceiptRequest} encType="multipart/form-data">
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
              type="number"
              min="1"
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
              {["Bank Transfer", "Cheque", "UPI", "Other"].map((mode) => (
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
            <label className="block mb-2 font-medium">
              UTR Number/ Name of person (if Cash)
            </label>
            <input
              type="text"
              placeholder="Enter UTR Number or Name"
              className="w-full p-2 border rounded-md"
              value={utr}
              onChange={(e) => setUtr(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Upload Screenshot (Max Size : 1MB)
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border rounded-md"
              onChange={handleScreenshotChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#FF6F00] text-white py-2 rounded-md hover:bg-[#FF8F00] transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Request Receipt 📄"}
          </button>
        </form>
        {message.text && (
          <p
            className={`mt-4 text-center ${
              message.type === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default DonationPage;
