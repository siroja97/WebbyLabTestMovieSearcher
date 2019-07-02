import React from 'react';
import './formErrrors.css';

 export const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i} className="error_message"><span className="field">{fieldName}</span> {formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>
