import {useState} from "react";
import { sportsData } from "./MockData";
import LeagueSelect from "./components/LeagueSelect";
import TeamSelect from "./components/TeamSelect.jsx";

function App() {
    const [sport,setSport]= useState("");
    const [league,setLeague]= useState("");
    const [team,setTeam]=useState("");

    const selected_sport=sportsData.find( (s) => s.id === sport );
    const league_opt= selected_sport ? selected_sport.leagues: [];

    const selected_league= league_opt.find( (l) => l.id === league);

    const team_opt= selected_league ? selected_league.teams:[];
    const selected_team= team_opt.find( (t) => t.id === team);

    const when_sport_change = (value) => { setSport(value); setLeague(""); };
    const when_league_change= (value) => { setLeague(value); setTeam(""); };


    return (
        <>
            <h1>Sport Stats App</h1>
            <select value={sport} onChange={(e) => when_sport_change(e.target.value)}>
                <option value="">---Select Sport for Stats---</option>
                <option value="basketball">Basketball</option>
                <option value="football">Football</option>
            </select>

            <LeagueSelect
                value={league}
                onChange={when_league_change}
                options={league_opt}
            />

            <TeamSelect
                value={team}
                onChange={setTeam}
                options={team_opt}
            />

            <p>Selected Sport: {selected_sport?.name || "None"}</p>
            <p>Selected League: {selected_league?.name || "None"}</p>
            <p>Selected Team: { selected_team?.name || "None"}</p>
        </>
    );
}

export default App;