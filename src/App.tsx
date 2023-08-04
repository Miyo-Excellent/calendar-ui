import './App.css'
import {Week, Day} from 'components/Calendar'
import data from 'assets/data.json'
import { ServiceByTechnician } from './types'
import { Picker } from 'components/Calendar/Picker'

function App() {

  return (
    <>
      <div>
        <div style={{ display: 'flex', marginTop: 50, gap: 20 }}>
          <Picker />
          <Day data={data as ServiceByTechnician[]} day={new Date()} />
        </div>
        <h1>Week View</h1>
        <Week firstDateOfWeek={new Date("2023/07/31")} data={data as ServiceByTechnician[]} />
      </div>
    </>
  )
}

export default App
