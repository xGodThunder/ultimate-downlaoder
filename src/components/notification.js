import Swal from 'sweetalert2';
export default  (props) =>{
    Swal.fire({
        icon: props.icon ? props.icon : '',
        title: props.title ? props.title : '',
        text: props.text ? props.text : ''
      })
}