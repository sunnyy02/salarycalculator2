import React from 'react';
import type { PayFrequency } from '../utils/taxCalculations';

interface PermanentInputFormProps {
    amount: number;
    setAmount: (val: number) => void;
    frequency: PayFrequency;
    setFrequency: (val: PayFrequency) => void;
    superIncluded: boolean;
    setSuperIncluded: (val: boolean) => void;
}

const FREQUENCIES: PayFrequency[] = ['Hourly', 'Daily', 'Weekly', 'Fortnightly', 'Monthly', 'Annually'];

export const PermanentInputForm: React.FC<PermanentInputFormProps> = ({
    amount,
    setAmount,
    frequency,
    setFrequency,
    superIncluded,
    setSuperIncluded,
}) => {
    return (
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl border border-blue-200 text-gray-900" style={{ padding: '2rem' }}>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Permanent Employee
            </h2>

            <div className="space-y-8">
                {/* Amount Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Salary / Rate</label>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all overflow-hidden">
                        <span className="pl-4 text-gray-500 text-lg">$</span>
                        <input
                            type="number"
                            value={amount || ''}
                            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                            className="w-full bg-transparent border-none focus:ring-0 py-3 pl-2 pr-4 text-lg text-gray-900 placeholder-gray-400 outline-none"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                {/* Frequency Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                    <div className="relative">
                        <select
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value as PayFrequency)}
                            style={{ paddingRight: '3rem' }}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-4 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg text-gray-900 cursor-pointer hover:bg-gray-100"
                        >
                            {FREQUENCIES.map((freq) => (
                                <option key={freq} value={freq} className="bg-white text-gray-900">
                                    {freq}
                                </option>
                            ))}
                        </select>
                        <div className="dropdown-arrow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </div>
                </div>

                {/* Super Inclusion Checkbox */}
                <div className="pt-4 border-t border-gray-200">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={superIncluded}
                            onChange={(e) => setSuperIncluded(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="text-sm text-gray-700">
                            Rate includes superannuation
                            <span className="block text-xs text-gray-500 mt-0.5">
                                (Check if super is part of the package, not paid on top)
                            </span>
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
};
