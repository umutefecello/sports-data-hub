import React from "react";

function LeagueSelect({value,onChange,options}) {

    const safe_options= options || [];
    return (
        <>
            <label>
                <select value={value} onChange={ (e) => onChange(e.target.value)}>
                    <option value="">---Select League---</option>
                    {safe_options.map( (lg) => (<option key={lg.id} value={lg.id}> {lg.name} </option>))}
                </select>
            </label>
        </>
    );
}

export default LeagueSelect;