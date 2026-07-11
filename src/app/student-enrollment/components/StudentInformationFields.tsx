interface Props {
  form: any;

  update: (data: any) => void;
}

export default function StudentInformationFields({ form, update }: Props) {
  return (
    <div className="space-y-3">
      <h2 className="font-semibold">Student Information</h2>

      <input 
        className="input"
        placeholder="First Name"
        value={form.firstName}
        onChange={(e) =>
          update({
            firstName: e.target.value,
          })
        }
      />

      <input
        className="input"
        placeholder="Last Name"
        value={form.lastName}
        onChange={(e) =>
          update({
            lastName: e.target.value,
          })
        }
      />

      <select
        className="input"
        value={form.gender}
        onChange={(e) =>
          update({
            gender: e.target.value,
          })
        }
      >
        <option value="">Gender</option>

        <option>Male</option>

        <option>Female</option>
      </select>

      <input
        type="date"
        className="input"
        value={form.dateOfBirth}
        onChange={(e) =>
          update({
            dateOfBirth: e.target.value,
          })
        }
      />
    </div>
  );
}
