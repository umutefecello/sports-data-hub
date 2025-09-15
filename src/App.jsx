import {useState} from "react";
import LeagueSelect from "./components/LeagueSelect";
import TeamSelect from "./components/TeamSelect.jsx";
import PlayerSelect from "./components/PlayerSelect.jsx";

const KEY= import.meta.env.VITE_API_KEY;


const BASES = {
    football : "https://v3.football.api-sports.io",
    basketball : "https://v1.basketball.api-sports.io",
    american_football: "https://v1.american-football.api-sports.io",
    volleyball:"https://v1.volleyball.api-sports.io"
}

async function apiGet(base,path,params = {}){
    const myUrl= new URL(path,base);
    Object.entries(params).forEach(([k,v]) => myUrl.searchParams.set(k,v));

    const res= await fetch(myUrl.toString(), {
        headers: {"x-apisports-key": KEY},
    });
    if(!res.ok){
        throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
}


function adapt_leagues(resp=[]){
    return resp.map((it) => ({id: String(it?.league?.id ?? ""), name: it?.league?.name ?? "",})).filter((x) => x.id && x.name);
}



function App() {

    const [leagueOpt,setLeagueOpt]= useState([]);
    const [leagueError,setLeagueError]= useState("");

    const [sport,setSport]= useState("");
    const [league,setLeague]= useState("");
    const [team,setTeam]=useState("");
    const [player,setPlayer]=useState("");

    const when_sport_change = async (s) =>{
        setSport(s);
        setLeague("");
        setTeam("");
        setPlayer("");
        setLeagueOpt([]);
        setLeagueError("");
        if(!s) return;
        const cur_base=BASES[s];
        if(!cur_base){
            setLeagueError("Invalid sport");
            return;
        }
        try{
            const params = s === "football" ? { current: true } : {};
            const json = await apiGet(cur_base, "/leagues", params);
            const leagues = adapt_leagues(json?.response) || [];
            setLeagueOpt(leagues);
        }catch (e) {
            setLeagueError(e.message || "lEAGUE LOAD ERROR!!");
        }
    };
    const when_league_change= (value) => { setLeague(value); setTeam(""); setPlayer(""); };
    const when_team_change= (value) => { setTeam(value); setPlayer(""); };


    return (
        <>
            <h1>Sport Stats App</h1>
            <label>Sport: </label>
            <select value={sport} onChange={(e) => when_sport_change(e.target.value)}>
                <option value="">---Select Sport---</option>
                <option value="basketball">Basketball</option>
                <option value="football">Football</option>
                <option value="volleyball">Volleyball</option>
                <option value="american_football">American Football</option>
            </select>

            <LeagueSelect
                value={league}
                onChange={when_league_change}
                options={leagueOpt}
            />

            <TeamSelect
                value={team}
                onChange={when_team_change}
                options={[]}
            />

            <PlayerSelect
                value={player}
                onChange={setPlayer}
                options={[]}
            />
            {leagueError && <p style={{ color: "red" }}>{leagueError}</p>}
            {!leagueError && sport && leagueOpt.length === 0 && (
                <p>No leagues found for this sport.</p>
            )}
        </>
    );
}

export default App;