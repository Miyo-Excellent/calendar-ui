import './App.css'
import {Week, Day} from 'components/Calendar'
import data from 'assets/data.json'
import { ServiceByTechnician } from './types'

function App() {

  return (
    <>
      <div>
        <h1>Day View</h1>
        <Day data={data as ServiceByTechnician[]} day={new Date()} />
        <h1>Week View</h1>
        <Week firstDateOfWeek={new Date("2023/07/31")} data={data as ServiceByTechnician[]} />
      </div>
    </>
  )
}

export default App
