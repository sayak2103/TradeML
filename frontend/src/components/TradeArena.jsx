import { useState } from 'react'
import QueryForm from './QueryForm.jsx'
import TradeWindow from './TradeWindow.jsx'

function TradeArena() {
  const [formData, setFormData] = useState(null);
  return (
    <>
      <h1>TradeArena</h1>
      <QueryForm setFormData={setFormData} />
      {formData && <TradeWindow />}
    </>
  )
}

export default TradeArena
