export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
      <span className="font-bold text-lg">SOS Triage</span>
      <div className="flex flex-wrap justify-end gap-x-6 gap-y-1 text-sm">
        <a href="/" className="hover:underline">Home</a>
        <a href="/core" className="hover:underline">Triage</a>
        <a href="/research" className="hover:underline">Research</a>
        <a href="/product" className="hover:underline">Product</a>
        <a href="/pricing" className="hover:underline">Pricing</a>
        <a href="/marketing" className="hover:underline">Marketing</a>
        <a href="/docs" className="hover:underline">Docs</a>
      </div>
    </nav>
  );
}