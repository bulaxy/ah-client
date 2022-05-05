import { DropdownButton, Dropdown } from 'react-bootstrap'
const dropdownItems = [
    { operator: 'eq', text: <>=</>, type: ['options', 'number', 'boolean'] },
    { operator: 'lt', text: <>&lt;</>, type: ['number'] },
    { operator: 'gt', text: <>&gt;</>, type: ['number'] },
    { operator: 'ge', text: <>&ge;</>, type: ['number'] },
    { operator: 'le', text: <>&le;</>, type: ['number'] },
    { operator: 'ne', text: <>&ne;</>, type: ['number'] },
    { operator: 'includes', text: <>Includes</>, type: ['string'] },
    { operator: 'notIncludes', text: <>Not Includes</>, type: ['string'] },
]

export default function OperatorDropdown({ operator, setOperator, type }) {
    return <Dropdown onSelect={setOperator}>
        <Dropdown.Toggle variant="outline-secondary" >
            {dropdownItems?.find(o => o.operator == operator).text}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ minWidth: '2rem' }}>
            {dropdownItems
                ?.filter(item => item.type.includes(type))
                ?.map(item => (
                    <Dropdown.Item
                        key={item.operator}
                        className='text-center'
                        eventKey={item.operator}
                        href="#"
                    >
                        {item.text}
                    </Dropdown.Item>
                ))
            }
        </Dropdown.Menu>
    </Dropdown >
}