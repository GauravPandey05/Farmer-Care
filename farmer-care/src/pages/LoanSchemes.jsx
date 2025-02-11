function LoanSchemes() {
  const loans = [
    {
      title: "Kisan Credit Card",
      description: "Short-term credit for cultivation expenses",
      interestRate: "7%",
      maxAmount: "₹3,00,000"
    },
    {
      title: "Agriculture Infrastructure Fund",
      description: "Long-term debt financing for agriculture infrastructure projects",
      interestRate: "3%",
      maxAmount: "₹2 Crore"
    },
    {
      title: "PM-KISAN",
      description: "Direct income support to farmer families",
      interestRate: "N/A",
      maxAmount: "₹6,000 per year"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-600 mb-8">Loan Schemes</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loans.map((loan, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-green-700 mb-3">{loan.title}</h2>
            <p className="text-gray-600 mb-4">{loan.description}</p>
            <div className="space-y-2">
              <p><span className="font-medium">Interest Rate:</span> {loan.interestRate}</p>
              <p><span className="font-medium">Maximum Amount:</span> {loan.maxAmount}</p>
            </div>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoanSchemes