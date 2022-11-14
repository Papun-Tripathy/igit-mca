import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import './verifystudent.css';

function VerifyStudent() {
  return (
    <div className='verifystudent'>

        <table className='verifytable'>
            <thead className='verifyhead'>
                <tr>
                    <td align='center'>Serial No</td>
                    <td align='center'>Name</td>
                    <td align='center'>Batch</td>
                    <td align='center'>Roll No.</td>
                    <td align='center'>Image</td>
                    <td align='center'>Action</td>
                </tr>
            </thead>
            <tbody className='verifybody'>
                   <tr>
                    <td align='center'>1</td>
                    <td align='center'>Pratyush Tripathy</td>
                    <td align='center'>40</td>
                    <td align='center'>404028</td>
                    <td align='center' ><VisibilityIcon/> </td>
                    <td align='center' className='table_action_body'>
                        <CheckIcon/>
                        <CloseIcon/>
                    </td>
                    </tr> 
             </tbody>
        </table>
    </div>
  )
}

export default VerifyStudent