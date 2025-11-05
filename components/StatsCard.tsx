type Props = { elo: number; kd: number; trend: number[] }
export default function StatsCard({ elo, kd }: Props){
return (
<div className="mb-2">
<div className="text-sm">Premier ELO</div>
<div className="text-3xl font-bold">{elo.toLocaleString()}</div>
<div className="text-sm">KD: {kd.toFixed(2)}</div>
</div>
)
}