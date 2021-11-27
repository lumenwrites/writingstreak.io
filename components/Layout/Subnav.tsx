import SelectTag from './SelectTag'
import Sorting from './Sorting'
import Search from './Search'

export default function Subnav() {
  return (
    <div className="subnav">
      <div className="subnav-wrapper">
        <Sorting />
        <SelectTag />
        <Search />
        <div className="clearfix" />
      </div>
    </div>
  )
}
