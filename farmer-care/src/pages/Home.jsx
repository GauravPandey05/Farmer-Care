// import { useState } from 'react';

// function Home({ onLogin }) {
//   const [credentials, setCredentials] = useState({ email: '', password: '' });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onLogin(credentials);
//   };

//   return (
//     <div className="min-h-screen">
//       <div 
//         className="h-screen bg-cover bg-center"
//         style={{ 
//           backgroundImage: 'url(https://i.pinimg.com/736x/a2/c7/7c/a2c77c05492aa6037bcf76482cf5d1ed.jpg)',
//           backgroundAttachment: 'fixed'
//         }}
//       >
//         <div className="h-full bg-black bg-opacity-30 flex items-center justify-center px-4">
//           <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
//             <div className="text-white md:w-1/2 text-center md:text-left">
//               <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to FarmerCare</h1>
//               <p className="text-xl md:text-2xl">Your complete farming companion for better yield and sustainable growth.</p>
//             </div>
//             <div className="md:w-1/2 max-w-md w-full">
//               <div className="backdrop-blur-md bg-white bg-opacity-20 p-8 rounded-lg shadow-xl">
//                 <h2 className="text-3xl font-bold text-center text-white mb-8">Login</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div>
//                     <label className="block text-white">Email</label>
//                     <input
//                       type="email"
//                       className="w-full p-2 border rounded bg-white bg-opacity-20 text-white placeholder-gray-200"
//                       value={credentials.email}
//                       onChange={(e) => setCredentials({...credentials, email: e.target.value})}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-white">Password</label>
//                     <input
//                       type="password"
//                       className="w-full p-2 border rounded bg-white bg-opacity-20 text-white placeholder-gray-200"
//                       value={credentials.password}
//                       onChange={(e) => setCredentials({...credentials, password: e.target.value})}
//                       required
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//                   >
//                     Login
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="py-16 px-4 bg-white">
//         <h2 className="text-3xl font-bold text-center text-green-600 mb-12">
//           How does FarmerCare help you
//         </h2>
//         <div className="container mx-auto max-w-4xl space-y-6">
//           <div className="bg-green-50 p-6 rounded-lg shadow">
//             <h3 className="text-xl font-semibold text-green-800 mb-2">Weather Forecasting</h3>
//             <p>Get accurate weather predictions to plan your farming activities effectively.</p>
//           </div>
//           <div className="bg-green-50 p-6 rounded-lg shadow">
//             <h3 className="text-xl font-semibold text-green-800 mb-2">Crop Management</h3>
//             <p>Track and manage your crops with expert recommendations for better yield.</p>
//           </div>
//           <div className="bg-green-50 p-6 rounded-lg shadow">
//             <h3 className="text-xl font-semibold text-green-800 mb-2">Government Schemes</h3>
//             <p>Stay updated with latest government schemes and benefits for farmers.</p>
//           </div>
//           <div className="bg-green-50 p-6 rounded-lg shadow">
//             <h3 className="text-xl font-semibold text-green-800 mb-2">Loan Assistance</h3>
//             <p>Easy access to information about agricultural loans and financial support.</p>
//           </div>
//           <div className="bg-green-50 p-6 rounded-lg shadow">
//             <h3 className="text-xl font-semibold text-green-800 mb-2">Expert Support</h3>
//             <p>Get guidance from agricultural experts for your farming needs.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;
import { useState, useEffect } from 'react';

function Home({ onLogin }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);
  const [typedText, setTypedText] = useState('');
  const fullText = "Your complete farming companion for better yield and sustainable growth.";
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (textIndex < fullText.length) {
      const timer = setTimeout(() => {
        setTypedText(prev => prev + fullText[textIndex]);
        setTextIndex(textIndex + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [textIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div className="min-h-screen">
      <div 
        className="h-screen bg-cover bg-center relative"
        style={{ 
          backgroundImage: 'url(https://i.pinimg.com/736x/a2/c7/7c/a2c77c05492aa6037bcf76482cf5d1ed.jpg)',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Darker overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white md:w-1/2 text-center md:text-left z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to FarmerCare</h1>
              <p className="text-xl md:text-2xl">
                {typedText}
                <span className="animate-pulse">|</span>
              </p>
            </div>
            <div className="md:w-1/2 max-w-md w-full z-10">
              <div className="backdrop-blur-md bg-white bg-opacity-10 p-8 rounded-lg shadow-xl">
                <h2 className="text-3xl font-bold text-center text-white mb-8">
                  {isLogin ? 'Login' : 'Sign Up'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white">Email</label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded bg-white bg-opacity-10 text-white placeholder-gray-300"
                      value={credentials.email}
                      onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white">Password</label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded bg-white bg-opacity-10 text-white placeholder-gray-300"
                      value={credentials.password}
                      onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                      required
                    />
                  </div>
                  {!isLogin && (
                    <div>
                      <label className="block text-white">Confirm Password</label>
                      <input
                        type="password"
                        className="w-full p-2 border rounded bg-white bg-opacity-10 text-white placeholder-gray-300"
                        required
                      />
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    {isLogin ? 'Login' : 'Sign Up'}
                  </button>
                </form>
                <p className="text-white text-center mt-4">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 text-green-400 hover:text-green-300 font-semibold"
                  >
                    {isLogin ? 'Sign Up' : 'Login'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-12">
          How does FarmerCare help you
        </h2>
        <div className="container mx-auto max-w-4xl space-y-6">
          <div className="bg-green-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Weather Forecasting</h3>
            <p>Get accurate weather predictions to plan your farming activities effectively.</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Crop Management</h3>
            <p>Track and manage your crops with expert recommendations for better yield.</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Government Schemes</h3>
            <p>Stay updated with latest government schemes and benefits for farmers.</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Loan Assistance</h3>
            <p>Easy access to information about agricultural loans and financial support.</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Expert Support</h3>
            <p>Get guidance from agricultural experts for your farming needs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;