const FeatureCards = () => {
  return (
    <div>
      {/* GCP Documentation Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">GCP Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Compute Engine</h3>
                <p className="text-gray-600">Virtual machines running in Google's data centers.</p>
                <a href="#" className="mt-4 inline-block text-blue-500 hover:underline">
                  Learn More
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Cloud Storage</h3>
                <p className="text-gray-600">Scalable and durable object storage.</p>
                <a href="#" className="mt-4 inline-block text-blue-500 hover:underline">
                  Learn More
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">BigQuery</h3>
                <p className="text-gray-600">A fully-managed, serverless data warehouse.</p>
                <a href="#" className="mt-4 inline-block text-blue-500 hover:underline">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* See Also Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-8">See Also</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Link 1 */}
            <a
              href="#"
              className="block bg-gray-100 rounded-lg shadow-md p-6 hover:bg-gray-200 transition duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Google Cloud Pricing</h3>
              <p className="text-gray-600">Understand Google Cloud's pricing model.</p>
            </a>

            {/* Link 2 */}
            <a
              href="#"
              className="block bg-gray-100 rounded-lg shadow-md p-6 hover:bg-gray-200 transition duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Google Cloud Free Tier</h3>
              <p className="text-gray-600">Get started with Google Cloud for free.</p>
            </a>

            {/* Link 3 */}
            <a
              href="#"
              className="block bg-gray-100 rounded-lg shadow-md p-6 hover:bg-gray-200 transition duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Google Cloud Documentation</h3>
              <p className="text-gray-600">Explore the official Google Cloud documentation.</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FeatureCards
