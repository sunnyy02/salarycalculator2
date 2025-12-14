import { Calculator } from './components/Calculator';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex justify-center overflow-x-hidden" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-300 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-300 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto py-12" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
        <header className="max-w-4xl mx-auto mb-16 text-center pt-4">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight" style={{ marginBottom: '2.5rem' }}>
            Australian Salary Calculator
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Calculate your take-home pay, tax, and superannuation. <br className="hidden md:block" />
            Compare <span className="text-blue-600 font-medium">Permanent</span> vs <span className="text-purple-600 font-medium">Contractor</span> rates instantly.
          </p>
        </header>

        <main className="max-w-5xl mx-auto pb-20">
          <Calculator />
        </main>

        <footer className="max-w-4xl mx-auto text-center text-gray-500 text-sm pb-8 space-y-2">
          <p>Based on ATO Resident Tax Rates 2024-2025. Includes Medicare Levy (2%) and Superannuation (12%).</p>
          <p>Disclaimer: This is an estimate only. Please consult a tax professional for advice.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
