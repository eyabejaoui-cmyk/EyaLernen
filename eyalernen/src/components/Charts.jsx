function Charts() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 12, marginBottom: 18 }}>
      {/* Line Chart */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #e2e8f0" }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: "#0f172a" }}>User Activity</div>
        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>Active users & sessions this week</div>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={activityData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #e2e8f0", borderRadius: 8, boxShadow: "none" }} />
            <Line type="monotone" dataKey="users"    stroke="#2563eb" strokeWidth={2} dot={false} name="Users"    />
            <Line type="monotone" dataKey="sessions" stroke="#10b981" strokeWidth={2} dot={false} name="Sessions" strokeDasharray="4 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #e2e8f0" }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: "#0f172a" }}>Time per Mode</div>
        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>Minutes spent per learning mode</div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={modeData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="mode"    tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #e2e8f0", borderRadius: 8, boxShadow: "none" }} />
            <Bar dataKey="minutes" name="Minutes" radius={[6, 6, 0, 0]} fill="#7c3aed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
