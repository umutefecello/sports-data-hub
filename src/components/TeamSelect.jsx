import React from "react";

function TeamSelect({ value, onChange, options }) {
    const safe = options || [];
    return (
        <>
            <label>Team: </label>
            <select value={value} onChange={ (e) => onChange(e.target.value)}>
                <option value="">-- Select a Team --</option>
                {safe.map( (t) => (<option key={t.id} value={t.id}>{t.name}</option>))}
            </select>
        </>
    );
}

export default TeamSelect;