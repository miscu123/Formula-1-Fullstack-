import React from 'react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Predictors',
      links: ['Qualifying AI', 'Podium AI', 'Grid Predictor']
    },
    {
      title: 'Races',
      links: ['Calendar', 'Results', 'Statistics']
    },
    {
      title: 'FAQ',
      links: ['How it works', 'Accuracy', 'Support']
    }
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-700 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center font-black">
                F1
              </div>
              <span className="text-xl font-bold">Overtake Intelligence</span>
            </div>
            <p className="text-gray-400">The pinnacle of motorsport excellence.</p>
          </div>
          
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold mb-4">{section.title}</h4>
              <div className="space-y-2">
                {section.links.map((link) => (
                  <div key={link} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    {link}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Overtake Intelligence. All rights reserved. | Experience the speed.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
