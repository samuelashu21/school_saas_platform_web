export default function ParentInformationFields({ form, update }: any) {
  return (
    <div className="space-y-3">
      <h2 className="font-semibold">Parent Information</h2>

      <input
        className="input"
        placeholder="Parent Name"
        value={form.parentName}
        onChange={(e) =>
          update({
            parentName: e.target.value,
          })
        }
      />

      <input
        className="input"
        placeholder="Phone"
        value={form.parentPhone}
        onChange={(e) =>
          update({
            parentPhone: e.target.value,
          })
        }
      />
    </div>
  );
} 
