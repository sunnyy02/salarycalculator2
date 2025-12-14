import React from 'react';
import type { PayFrequency } from '../utils/taxCalculations';

interface InputFormProps {
    amount: number;
    setAmount: (val: number) => void;
    frequency: PayFrequency;
    setFrequency: (val: PayFrequency) => void;
    viewMode: 'Single' | 'Compare';
    setViewMode: (val: 'Single' | 'Compare') => void;
    employmentType: 'Permanent' | 'Contractor';
    setEmploymentType: (val: 'Permanent' | 'Contractor') => void;
    superIncluded: boolean;
    setSuperIncluded: (val: boolean) => void;
}

const FREQUENCIES: PayFrequency[] = ['Hourly', 'Daily', 'Weekly', 'Fortnightly', 'Monthly', 'Annually'];

export const InputForm: React.FC<InputFormProps> = ({
    amount,
    setAmount,
    frequency,
    setFrequency,
    viewMode,
    setViewMode,
    employmentType,
    setEmploymentType,
    superIncluded,
    setSuperIncluded,
}) => {
    return (
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/50 text-gray-900">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Salary Details
            </h2>

            <div className="space-y-6">
                {/* Amount Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rate / Salary</label>
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
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg text-gray-900 cursor-pointer hover:bg-gray-100"
                        >
                            {FREQUENCIES.map((freq) => (
                                <option key={freq} value={freq} className="bg-white text-gray-900">
                                    {freq}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </div>
                </div>
                {/* View Mode Toggle */}
                <div className="pt-4 border-t border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('Single')}
                            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'Single'
                                ? 'bg-white text-gray-900 shadow'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            Single View
                        </button>
                        <button
                            onClick={() => setViewMode('Compare')}
                            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'Compare'
                                ? 'bg-white text-gray-900 shadow'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            Compare Perm vs Contract
                        </button>
                    </div>
                </div>

                {/* Employment Type (Only for Single View) */}
                {viewMode === 'Single' && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${employmentType === 'Permanent' ? 'border-blue-500' : 'border-gray-300 group-hover:border-gray-400'}`}>
                                    {employmentType === 'Permanent' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
                                </div>
                                <input
                                    type="radio"
                                    name="employmentType"
                                    className="hidden"
                                    checked={employmentType === 'Permanent'}
                                    onChange={() => setEmploymentType('Permanent')}
                                />
                                <span className={employmentType === 'Permanent' ? 'text-gray-900' : 'text-gray-500'}>Permanent</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${employmentType === 'Contractor' ? 'border-purple-500' : 'border-gray-300 group-hover:border-gray-400'}`}>
                                    {employmentType === 'Contractor' && <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />}
                                </div>
                                <input
                                    type="radio"
                                    name="employmentType"
                                    className="hidden"
                                    checked={employmentType === 'Contractor'}
                                    onChange={() => setEmploymentType('Contractor')}
                                />
                                <span className={employmentType === 'Contractor' ? 'text-gray-900' : 'text-gray-500'}>Contractor</span>
                            </label>
                        </div>

                        {/* Super Inclusion Checkbox (Only for Permanent) */}
                        {employmentType === 'Permanent' && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
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
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
