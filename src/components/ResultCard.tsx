import React from 'react';
import type { TaxResult } from '../utils/taxCalculations';

interface ResultCardProps {
    title: string;
    result: TaxResult;
    type: 'Permanent' | 'Contractor';
}

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        maximumFractionDigits: 0,
    }).format(val);
};

export const ResultCard: React.FC<ResultCardProps> = ({ title, result, type }) => {
    const isPerm = type === 'Permanent';

    return (
        <div className={`relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-2xl ${isPerm
            ? 'bg-gradient-to-br from-blue-50 to-white border-blue-200 hover:border-blue-300'
            : 'bg-gradient-to-br from-purple-50 to-white border-purple-200 hover:border-purple-300'
            } `} style={{ padding: '2rem' }}>
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isPerm ? 'from-blue-500 to-cyan-400' : 'from-purple-500 to-pink-400'} `} />

            <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 mb-6">{isPerm ? 'Includes Sick Leave & Annual Leave' : 'No Leave Entitlements'}</p>

            <div className="space-y-4">
                <div className="flex justify-between items-end pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Gross Income</span>
                    <span className="text-xl font-semibold text-gray-900">{formatCurrency(result.grossPay)}</span>
                </div>

                <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="flex justify-between text-sm" style={{ marginBottom: '0.875rem' }}>
                        <span className="text-gray-600">Taxable Income</span>
                        <span className="text-gray-900">{formatCurrency(result.taxableIncome)}</span>
                    </div>

                    <div className="flex justify-between text-sm" style={{ marginBottom: '0.875rem' }}>
                        <span className="text-gray-600">Income Tax</span>
                        <span className="text-red-500">-{formatCurrency(result.tax)}</span>
                    </div>

                    <div className="flex justify-between text-sm" style={{ marginBottom: '0.875rem' }}>
                        <span className="text-gray-600">Medicare Levy</span>
                        <span className="text-red-500">-{formatCurrency(result.medicareLevy)}</span>
                    </div>

                    <div className="flex justify-between text-sm pt-3 border-t border-gray-100" style={{ paddingTop: '0.875rem', borderTopWidth: '1px' }}>
                        <span className="text-gray-600">Superannuation (12%)</span>
                        <span className="text-emerald-600">{formatCurrency(result.superannuation)}</span>
                    </div>
                </div>

                <div className="pt-6 mt-4 border-t-2 border-gray-200">
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="block text-sm text-gray-600">Net Pay (Annually)</span>
                            <span className={`text-3xl font-bold ${isPerm ? 'text-blue-600' : 'text-purple-600'} `}>
                                {formatCurrency(result.netPay)}
                            </span>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                        <div className="bg-white/60 rounded p-2 border border-gray-200">
                            <div className="text-xs text-gray-500">Monthly</div>
                            <div className="text-sm font-medium text-gray-900">{formatCurrency(result.netPay / 12)}</div>
                        </div>
                        <div className="bg-white/60 rounded p-2 border border-gray-200">
                            <div className="text-xs text-gray-500">Fortnightly</div>
                            <div className="text-sm font-medium text-gray-900">{formatCurrency(result.netPay / 26)}</div>
                        </div>
                        <div className="bg-white/60 rounded p-2 border border-gray-200">
                            <div className="text-xs text-gray-500">Weekly</div>
                            <div className="text-sm font-medium text-gray-900">{formatCurrency(result.netPay / 52)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
