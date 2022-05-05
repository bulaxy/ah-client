import { InputGroup, Button } from 'react-bootstrap'
import TextField from './selectors/TextField'
import NumberField from './selectors/NumberField'
import SelectField from './selectors/SelectField'
import BooleanField from './selectors/BooleanField'
import { useCardsSearchContext } from "../../contexts/CardsSearchContext"

export default function FilterRow({ filterKey }) {
    const { removeFilter } = useCardsSearchContext()

    const filterType = {
        number: <NumberField type={filterKey} />,
        string: <TextField type={filterKey} />,
        options: <SelectField type={filterKey} />,
        boolean: <BooleanField type={filterKey} />,
    }

    return <InputGroup className='pb-1' >
        {filterType[filterKey.type]}
        <Button variant="outline-secondary" onClick={() => removeFilter(filterKey)}>Remove Filter</Button>
    </InputGroup>

}
