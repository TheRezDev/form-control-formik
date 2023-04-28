import React from 'react';

const TermsCondition = ({name,formik}) => {
   return (
      <div>
         <input
            type="checkBox"
            name='terms'
            id='terms'
            value={true}
            onChange={formik.handleChange}
            checked={formik.values.terms}
         />
         <label htmlFor='terms'>Terms and Conditions</label>
         {formik.errors.terms && formik.touched.terms && (
            <div className='error'>{formik.errors.terms}</div>
         )}
      </div>
   );
}

export default TermsCondition;
