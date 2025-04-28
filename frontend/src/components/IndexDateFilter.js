/**
 * IndexDateFilter component
 *
 * @param {Object} props - The component props
 * @returns
 */
export default function IndexDateFilter({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  onReset,
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>
        From:{" "}
        <input
          style={{
            border: "2px solid #ccc",
            padding: "0.5rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </label>
      To:{" "}
      <label>
        <input
          style={{
            border: "2px solid #ccc",
            padding: "0.5rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </label>
      <button
        style={{
          marginLeft: "1rem",
          border: "2px solid #ccc",
          padding: "0.5rem",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
}
