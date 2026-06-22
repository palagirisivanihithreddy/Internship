function DashboardCard({title,count})
{
  return(
    <div className="card">
      <h2>{count}</h2>
      <p>{title}</p>
    </div>
  )
}

export default DashboardCard;