import React from "react";

function PlayerSelect({value,onChange,options}) {
    const safe_options= options || [];

    return(
        <>
            <p></p>
            <label>Player: </label>
            <select value={value} onChange={ (e) => onChange(e.target.value)}>
                <option value="">---Select Player---</option>
                {safe_options.map( (lg) => (<option key={lg.id} value={lg.id}> {lg.name} </option>))}
            </select>
        </>
    );
}

export default PlayerSelect;