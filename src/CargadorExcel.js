import React from 'react';
import * as XLSX from 'xlsx';

const CargadorExcel = ({ onFileChange }) => {
    const handleFileChange = (e) => {
        try {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (evt) => {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                onFileChange(data);
            };
            reader.readAsBinaryString(file);
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <div className="cargador-excel">
            <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
        </div>
    );
};

export default CargadorExcel;
