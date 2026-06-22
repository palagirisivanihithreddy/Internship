function News() {

  const news = [
    {
      title: "NIRF Rankings 2026 Released"
    },
    {
      title: "IIT Placements Increased"
    },
    {
      title: "New AI Courses Introduced"
    },
    {
      title: "Government Scholarship Program"
    },
    {
      title: "Top MBA Colleges Announced"
    }
  ];

  return (
    <div className="page">

      <h1>Latest Education News</h1>

      {news.map((item, index) => (
        <div
          key={index}
          className="card"
          style={{ marginTop: "20px" }}
        >
          <h3>{item.title}</h3>
        </div>
      ))}

    </div>
  );
}

export default News;