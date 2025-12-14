import React, { useState, useMemo } from 'react';
import { PermanentInputForm } from './PermanentInputForm';
import { ContractorInputForm } from './ContractorInputForm';
import { ResultCard } from './ResultCard';
import { calculatePay, type PayFrequency } from '../utils/taxCalculations';

export const Calculator: React.FC = () => {
    // Permanent employee state
    const [permAmount, setPermAmount] = useState<number>(100000);
    const [permFrequency, setPermFrequency] = useState<PayFrequency>('Annually');
    const [permSuperIncluded, setPermSuperIncluded] = useState<boolean>(false);

    // Contractor state
    const [contractAmount, setContractAmount] = useState<number>(100000);
    const [contractFrequency, setContractFrequency] = useState<PayFrequency>('Annually');
    const [workingWeeks, setWorkingWeeks] = useState<number>(48);

    // Calculate permanent result
    const permResult = useMemo(() => {
        return calculatePay(permAmount, permFrequency, false, permSuperIncluded, 52);
    }, [permAmount, permFrequency, permSuperIncluded]);

    // Calculate contractor result
    const contractResult = useMemo(() => {
        return calculatePay(contractAmount, contractFrequency, true, true, workingWeeks);
    }, [contractAmount, contractFrequency, workingWeeks]);

    return (
        <div className="w-full space-y-8">
            {/* Input Forms - Side by Side */}
            <div className="grid grid-cols-2 gap-6">
                <PermanentInputForm
                    amount={permAmount}
                    setAmount={setPermAmount}
                    frequency={permFrequency}
                    setFrequency={setPermFrequency}
                    superIncluded={permSuperIncluded}
                    setSuperIncluded={setPermSuperIncluded}
                />
                <ContractorInputForm
                    amount={contractAmount}
                    setAmount={setContractAmount}
                    frequency={contractFrequency}
                    setFrequency={setContractFrequency}
                    workingWeeks={workingWeeks}
                    setWorkingWeeks={setWorkingWeeks}
                />
            </div>

            {/* Results - Side by Side */}
            <div className="grid grid-cols-2 gap-6">
                <ResultCard
                    title="Permanent"
                    result={permResult}
                    type="Permanent"
                />
                <ResultCard
                    title="Contractor"
                    result={contractResult}
                    type="Contractor"
                />
            </div>
        </div>
    );
};
