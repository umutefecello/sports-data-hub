import {useState} from "react";
import { sportsData } from "./MockData";
import LeagueSelect from "./components/LeagueSelect";

function App() {
    const [sport,setSport] = useState("");
    const [league,setLeague] = useState("");

    const selected_sport=sportsData.find( (s) => s.id === sport );
    const league_opt= selected_sport ? selected_sport.leagues: [];

    const selected_league= league_opt.find( (l) => l.id === league);

    const when_sport_change = (value) => {
        setSport(value);
        setLeague("");
    };

    console.log("App:", { sport, selected_sport, league_opt });
    console.log("LeagueSelect:", { value: league, league_opt });

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
                onChange={setLeague}
                options={league_opt}
            />

            <p>Selected Sport: {sport || "None"}</p>
            <p>Selected League: {league ? selected_league.name: "None"}</p>
        </>
    );
}

export default App;