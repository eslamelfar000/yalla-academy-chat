import React from "react";

function TermsAndConditionsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="h-10 bg-gray-300 rounded animate-pulse w-64 mx-auto mb-8"></div>
          <div className="h-6 bg-gray-300 rounded animate-pulse w-48 mb-6"></div>
          
          <div className="space-y-8">
            {[1, 2, 3, 4, 5].map((index) => (
              <section key={index} className="mb-8">
                <div className="h-8 bg-gray-300 rounded animate-pulse w-64 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditionsSkeleton;

