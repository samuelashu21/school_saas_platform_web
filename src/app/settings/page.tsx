'use client';

import { useState } from 'react';
import Header from '@/app/(components)/Header';

type UserSetting = {
  label: string;
  value: string | boolean;
  type: 'text' | 'toggle';
};

const mockSettings: UserSetting[] = [
  { label: 'Registered Administrator Name', value: 'Principal Administrator', type: 'text' },
  { label: 'Institutional Contact Email', value: 'admin@academy.edu', type: 'text' },
  { label: 'Automate Academic Arrears Alerts', value: true, type: 'toggle' },
  { label: 'Interface Dark Mode Profile', value: false, type: 'toggle' },
  { label: 'System Primary Language Locales', value: 'English (US)', type: 'text' },
];

const Settings = () => {
  const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings);
  const [statusMessage, setStatusMessage] = useState('');

  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = !settingsCopy[index].value as boolean;
    setUserSettings(settingsCopy);
  };

  return (
    <div className="w-full" data-testid="settings-page">
      <Header name="System Control Parameters" />
      {statusMessage && (
        <div className="mt-3 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm text-green-700 font-medium" data-testid="settings-status">
          {statusMessage}
        </div>
      )}
      <div className="overflow-hidden mt-5 shadow-sm border border-gray-100 rounded-xl bg-white">
        <table className="min-w-full bg-white">
          <thead className="bg-slate-800 text-white text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-6 py-4 font-semibold">Configuration Flag</th>
              <th className="text-left px-6 py-4 font-semibold">Current State Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {userSettings.map((setting, index) => (
              <tr className="hover:bg-blue-50/40 transition-colors" key={setting.label}>
                <td className="px-6 py-4 font-medium text-gray-600">{setting.label}</td>
                <td className="px-6 py-4">
                  {setting.type === 'toggle' ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.value as boolean}
                        onChange={() => handleToggleChange(index)}
                        data-testid={`settings-toggle-${setting.label.toLowerCase().replace(/\s+/g, '-')}`}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 transition peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  ) : (
                    <input
                      type="text"
                      className="px-3 py-1.5 border border-gray-200 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64 bg-slate-50/50"
                      value={setting.value as string}
                      onChange={(e) => {
                        const settingsCopy = [...userSettings];
                        settingsCopy[index].value = e.target.value;
                        setUserSettings(settingsCopy);
                      }}
                      data-testid={`settings-input-${setting.label.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-3 p-4 border-t border-gray-100 bg-gray-50/70">
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 font-semibold text-white text-xs shadow-sm hover:bg-blue-700 transition-colors"
            onClick={() => setStatusMessage('Configuration flags written to local runtime context.')}
            data-testid="save-settings"
          >
            Save Parameter Configurations
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold text-xs hover:bg-gray-50 transition-colors"
            onClick={() => {
              setUserSettings(mockSettings);
              setStatusMessage('Parameters reverted back to system factory defaults.');
            }}
            data-testid="reset-settings"
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;