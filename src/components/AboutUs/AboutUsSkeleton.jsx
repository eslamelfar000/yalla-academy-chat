import React from "react";

function AboutUsSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative py-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-main-dark"></div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto w-full">
          <div className="h-16 bg-white/20 rounded animate-pulse mb-6 max-w-2xl mx-auto"></div>
          <div className="h-12 bg-white/20 rounded animate-pulse mb-8 max-w-xl mx-auto"></div>
        </div>
      </section>

      {/* Video Section Skeleton */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="h-6 bg-gray-300 rounded animate-pulse w-24 mx-auto mb-4"></div>
            <div className="h-10 bg-gray-300 rounded animate-pulse w-96 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-300 rounded animate-pulse w-2/3 mx-auto"></div>
          </div>
          <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <div className="absolute top-0 left-0 w-full h-full bg-gray-300 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Skeleton */}
      <section className="py-20 bg-[#F5F6F9]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="h-6 bg-gray-300 rounded animate-pulse w-32"></div>
              <div className="h-10 bg-gray-300 rounded animate-pulse w-full"></div>
              <div className="h-24 bg-gray-300 rounded animate-pulse w-full"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-[#5685CE] rounded-2xl p-8">
                <div className="h-10 bg-white/20 rounded animate-pulse w-32 mb-4"></div>
                <div className="h-24 bg-white/20 rounded animate-pulse w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section Skeleton */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="h-6 bg-gray-300 rounded animate-pulse w-24 mx-auto mb-4"></div>
            <div className="h-10 bg-gray-300 rounded animate-pulse w-96 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-300 rounded animate-pulse w-2/3 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-gray-50 border-2 rounded-lg p-6">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded animate-pulse w-3/4 mx-auto mb-3"></div>
                <div className="h-20 bg-gray-300 rounded animate-pulse w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-20 bg-main relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <div className="h-12 bg-white/20 rounded animate-pulse w-2/3 mx-auto mb-6"></div>
          <div className="h-6 bg-white/20 rounded animate-pulse w-1/2 mx-auto mb-8"></div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-12 bg-white/20 rounded animate-pulse w-48"></div>
            <div className="h-12 bg-white/20 rounded animate-pulse w-48"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUsSkeleton;

