function ProfileCard(props) {
  return (
    <div>
      <h3>{props.name}</h3>
      <p>{props.role}</p>
      <p>{props.email}</p>
    </div>
  )
}

export default ProfileCard