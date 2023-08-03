import './App.css'
import {Week} from 'components/Week'
import data from 'assets/data.json'
import { ServiceByTechnician } from './types'

function App() {

  return (
    <>
      <div>
        <Week firstDateOfWeek={new Date("2023/07/31")} data={data as ServiceByTechnician[]} />
      </div>
    </>
  )
}

export default App
