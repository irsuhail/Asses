import React, { useState } from 'react';
import { useFormBuilder } from '../context/FormBuilderContext';
import FormRenderer from './FormRenderer';

export default function Preview(){
  const { fields, setSchema } = useFormBuilder();
  const [submitted, setSubmitted] = useState(null);

  function clearAll(){
    if(confirm('Clear form schema and saved data?')){
      setSchema([]);
      localStorage.removeItem('form_builder_schema_v1');
      setSubmitted(null);
    }
  }

  function exportData(){
    const blob = new Blob([JSON.stringify(fields, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'form-schema.json'; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="preview-card">
      <h4>Preview & Test</h4>
      <FormRenderer fields={fields} onSubmit={(data)=>setSubmitted(data)} />
      <div style={{marginTop:10, display:'flex',gap:8}}>
        <button className="small" onClick={exportData}>Export Schema</button>
        <button className="small" onClick={clearAll}>Clear</button>
      </div>

      {submitted && (
        <>
          <h5 style={{marginTop:12}}>Submitted JSON</h5>
          <pre style={{maxHeight:180,overflow:'auto',background:'#0f172a',color:'#e6eef8',padding:10,borderRadius:6}}>
            {JSON.stringify(submitted, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}
