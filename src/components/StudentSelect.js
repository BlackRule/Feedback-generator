import {Fragment} from "react";
import Select from 'react-select'

function StudentSelect(props){
	const options=Object.entries(props.students).map((value) => {
		return {value:value[0],label:`${value[0]}: ${value[1][0]} ${value[1][1][0]}`}})
	const {style,...p} = props
	return (<Fragment>
		<label style={style}>Student Id: <Select options={options} {...p}/></label>
	</Fragment>)
}
export default StudentSelect;
