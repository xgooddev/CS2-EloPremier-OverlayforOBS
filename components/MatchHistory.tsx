export default function MatchHistory({ matches }: { matches: boolean[] }){
return (
<div className="flex gap-2 mt-2">
{matches.map((m, i) => (
<div key={i} className={`w-6 h-6 rounded-full ${m ? 'bg-green-500' : 'bg-red-500'}`}></div>
))}
</div>
)
}