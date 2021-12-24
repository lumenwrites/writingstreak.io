//@ts-nocheck
import moment from 'moment'
import { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function CustomDatePicker(props) {
  return (
    <div className="date-picker">
      <DatePicker {...props} dateFormat="yyyy-MM-dd" customInput={<DatePickerButton end={props.selectsEnd} />} />
    </div>
  )
}

/* Has to be class based, otherwise I get an error
   "Function components cannot be given refs." */
class DatePickerButton extends Component {
  render() {
    return (
      <div className="date-picker-button" onClick={this.props.onClick}>
        {this.props.end ? 'End ' : 'Start '} date: <br />
        {moment(this.props.value).format('MMM DD, YYYY')}
      </div>
    )
  }
}
