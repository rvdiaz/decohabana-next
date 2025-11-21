export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <img src="main-logo.png" alt="" className="max-h-[30px]" />
          </div>
          <p className="text-gray-400">
            Creating magical moments, one event at a time.
          </p>
          <div className="text-gray-500 text-sm">
            © 2025 Decohabana. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
