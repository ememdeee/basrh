export default function Table({ data }: { data: any[] }) {
    // Check if data is available
    if (!data || data.length === 0) {
      return null; // If data is not available, render nothing
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Url</th>
            <th>Page ID</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through data and render table rows */}
          {data.map((rowData, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* Use index + 1 as the row number */}
              <td>{rowData.url}</td> {/* Render URL */}
              <td>{rowData.id}</td> {/* Render Page ID */}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  