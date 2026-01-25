'use client';

import { useState } from 'react';
import { checkVersion } from '../../utils/api';

export default function VersionCheckPage() {
  const [version, setVersion] = useState('1.0.0');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);

    try {
      const data = await checkVersion(version);
      setResult(data);
    } catch (err) {
      setResult({ error: (err as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold text-gray-800">
            App Version Check
          </h1>
          <p className="text-sm text-gray-500">
            Simple full-stack version validation demo
          </p>
        </div>

        {/* Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            App Version
          </label>
          <input
            type="text"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            placeholder="e.g. 1.0.0"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleCheck}
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Checking version…' : 'Check Version'}
        </button>

        {/* Result */}
        {result && (
          <div
            className={`rounded-lg p-4 text-sm ${
              result.error
                ? 'bg-red-50 text-red-700 border border-red-200'
                : result.supported
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
            }`}
          >
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
