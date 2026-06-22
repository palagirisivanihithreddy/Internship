import Greeting from "./components/Greeting"
import ProfileCard from "./components/ProfileCard"

function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <p>My First React Application</p>

      <Greeting name="Nihith" />
      <Greeting name="Ravi" />
      <Greeting name="Priya" />

      <ProfileCard
        name="Nihith Reddy"
        role="React Intern"
        email="nihith@gmail.com"
      />

      <ProfileCard
        name="Ravi Kumar"
        role="Frontend Intern"
        email="ravi@gmail.com"
      />

      <ProfileCard
        name="Priya Sharma"
        role="UI Intern"
        email="priya@gmail.com"
      />
    </div>
  )
}

export default App