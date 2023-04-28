import React from 'react';

const RadioInput = ({ name, formik,radioOptions }) => {
   return (
      <div className="formControl">
         {radioOptions.map((item) => (
               <React.Fragment key={item.value}>
                  <input
                     id={item.value}
                     type="radio"
                     name= {name}
                     value={item.value}
                     onChange={formik.handleChange}
                     checked={formik.values[name] === item.value}
                  />
                  <label htmlFor={item.value}>{item.label}</label>
               </React.Fragment>
         ))}
            {formik.errors[name] && formik.touched[name] && (
            <div className='error'>{formik.errors[name]}</div>
         )}
      </div>
   );
};

export default RadioInput;
