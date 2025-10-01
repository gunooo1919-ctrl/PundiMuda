// pundimuda/app/simulasi/page.js

'use client'; // WAJIB: Kita menggunakan state dan input form

import { useState } from 'react';

export default function SimulationPage() {
    const [income, setIncome] = useState('');
    const [expenses, setExpenses] = useState({
        housing: '',
        food: '',
        transport: '',
        entertainment: '',
        other: '',
    });

    const handleIncomeChange = (e) => {
        setIncome(e.target.value.replace(/[^0-9]/g, '')); // Hanya angka
    };

    const handleExpenseChange = (e) => {
        const { name, value } = e.target;
        setExpenses(prev => ({
            ...prev,
            [name]: value.replace(/[^0-9]/g, ''),
        }));
    };

    // Hitungan
    const totalIncome = parseInt(income) || 0;
    const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    const netSavings = totalIncome - totalExpenses;
    const savingsPercentage = totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(1) : 0;

    // Fungsi Pembantu Format
    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
            <h1>💰 Simulasi Budget Bulanan</h1>
            <p style={{ color: 'gray' }}>Tentukan prioritas keuanganmu!</p>

            {/* Input Gaji */}
            <div style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
                    Gaji/Pemasukan Bulanan (Rp)
                </label>
                <input
                    type="text"
                    value={income.toLocaleString('id-ID')}
                    onChange={handleIncomeChange}
                    placeholder="Contoh: 7000000"
                    style={{ padding: '10px', width: '95%', border: '1px solid #ccc', borderRadius: '5px' }}
                />
            </div>

            {/* Input Pengeluaran */}
            <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: '30px' }}>
                Pengeluaran Wajib
            </h2>
            {Object.keys(expenses).map((key) => (
                <div key={key} style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', textTransform: 'capitalize' }}>
                        {key.charAt(0).toUpperCase() + key.slice(1)} (Rp):
                    </label>
                    <input
                        type="text"
                        name={key}
                        value={expenses[key].toLocaleString('id-ID')}
                        onChange={handleExpenseChange}
                        placeholder={`Biaya ${key}...`}
                        style={{ padding: '8px', width: '95%', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                </div>
            ))}

            {/* Hasil Simulasi */}
            <div style={{ border: '2px solid #0070f3', padding: '20px', marginTop: '40px', borderRadius: '10px', background: '#e6f7ff' }}>
                <h2>📊 Hasil Proyeksi</h2>
                <p>Pemasukan Total: <strong style={{ color: 'green' }}>{formatRupiah(totalIncome)}</strong></p>
                <p>Pengeluaran Total: <strong style={{ color: 'red' }}>{formatRupiah(totalExpenses)}</strong></p>
                
                <hr style={{ margin: '15px 0' }} />
                
                <h3>Sisa Dana (Tabungan/Investasi)</h3>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: netSavings >= 0 ? '#0070f3' : 'red' }}>
                    {formatRupiah(netSavings)}
                </p>
                
                {totalIncome > 0 && (
                    <p style={{ fontWeight: 'bold', color: savingsPercentage >= 20 ? 'green' : 'orange' }}>
                        Persentase Tabungan: {savingsPercentage}%
                    </p>
                )}
            </div>
        </div>
    );
}
