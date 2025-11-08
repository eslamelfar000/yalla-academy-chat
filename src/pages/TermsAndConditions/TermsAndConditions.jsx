import React from "react";
import { useSettings } from "@/context/SettingsContext";
import TermsAndConditionsSkeleton from "../../components/TermsAndConditions/TermsAndConditionsSkeleton";

const TermsAndConditions = () => {
  const { settings, isLoading, error } = useSettings();

  // Extract terms and conditions content from settings
  const termsContent = settings?.terms_and_conditions || "";

  // Show loading skeleton while fetching data
  if (isLoading) {
    return <TermsAndConditionsSkeleton />;
  }

  // Show error state if there's an error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-red-600 mb-4">
                Error Loading Terms and Conditions
              </h2>
              <p className="text-gray-600">
                Failed to load terms and conditions. Please try again later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Terms and Conditions
          </h1>

          <div className="prose prose-lg max-w-none">
            {termsContent ? (
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: termsContent }}
              />
            ) : (
              <p className="text-gray-600 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
