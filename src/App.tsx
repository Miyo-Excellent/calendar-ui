import './App.css'
import {Week} from 'components/Week'
import data from 'assets/data.json'
import { ServiceByTechnician } from './types'

function App() {

  return (
    <>
      <div>
        <h1>Gantt</h1>
        <Week firstDateOfWeek={new Date("2023/07/31")} data={data as ServiceByTechnician[]} />
      </div>
    </>
  )
}

export default App
