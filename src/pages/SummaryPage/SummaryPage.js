import React, { useState } from 'react'

const SummaryPage = () => {
const [checked, setChecked] = useState(false)

  return (
    <div>
        <form>
            <input 
                type="checkbox" 
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                id='confirm-checkbox'
                />
                <label htmlFor='confirm-checkbox'>I want to confirm this order</label>
                <br />
                <button 
                    type='submit'
                    disabled={!checked}
                    >
                    Confirm Order
                </button>
        </form>
    </div>
  )
}

export default SummaryPage;