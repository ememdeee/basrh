export default function Table({ data }: { data: any[] }) {
    // Check if data is available
    if (!data || data.length === 0) {
      return null; // If data is not available, render nothing
    }

    return (
      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="border-b border-gray-200 rounded dark:border-gray-700 prose prose-base prose-invert mb-1 py-4 ms-2">
            <tr>
              <th className="px-1 py-4 md:px-3">No</th>
              <th className="px-1 py-4 md:px-6">Url</th>
              <th className="px-1 py-4 md:px-6">ID</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through data and render table rows */}
            {data.map((rowData, index) => (
              <tr key={index} className="border-gray-200 rounded dark:border-gray-700 prose prose-sm prose-invert">
                <td className="px-1 py-4 md:px-3">{index + 1}</td> {/* Use index + 1 as the row number */}
                <td className="px-1 py-4 md:px-6">{rowData.url}</td> {/* Render URL */}
                <td className="px-1 py-4 md:px-6">{rowData.id}</td> {/* Render Page ID */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  