import { InputGroup, Button } from 'react-bootstrap'
import TextField from './selectors/TextField'
import NumberField from './selectors/NumberField'
import SelectField from './selectors/SelectField'
import BooleanField from './selectors/BooleanField'

export default function FilterRow({ filterKey, filterOptions }) {

    const filterType = {
        number: <NumberField type={filterKey} filter={filterOptions.filter} setFilter={filterOptions.setFilter} />,
        string: <TextField type={filterKey} filter={filterOptions.filter} setFilter={filterOptions.setFilter} />,
        options: <SelectField type={filterKey} filter={filterOptions.filter} setFilter={filterOptions.setFilter} />,
        boolean: <BooleanField type={filterKey} filter={filterOptions.filter} setFilter={filterOptions.setFilter} />,
    }

    return <InputGroup className='pb-1' >
        {filterType[filterKey.type]}
        <Button variant="outline-secondary" onClick={() => filterOptions.removeFilter(filterKey)}>Remove Filter</Button>
    </InputGroup>

}
