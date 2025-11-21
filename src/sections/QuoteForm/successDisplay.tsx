import { CheckCircle } from "lucide-react";

interface QuoteSuccessModalProps {
  onClose: () => void;
}

export default function QuoteSuccessModal({ onClose }: QuoteSuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 text-center animate-fadeIn">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
        <p className="text-gray-600 mb-2">
          Your quote request has been submitted successfully.
        </p>
        <p className="text-gray-600 mb-6">
          We'll review your event details and contact you soon with a
          personalized quote.
        </p>

        {/* Additional Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            💡 You can expect to hear from us within 24-48 hours.
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
}
