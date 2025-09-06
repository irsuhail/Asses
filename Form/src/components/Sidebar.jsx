import React from 'react';
import { useFormBuilder } from '../context/FormBuilderContext';

const TYPES = [
  { key: 'text', label: 'Text' },
  { key: 'number', label: 'Number' },
  { key: 'email', label: 'Email' },
  { key: 'select', label: 'Dropdown' },
  { key: 'checkbox', label: 'Checkbox' },
  { key: 'radio', label: 'Radio' }
];

export default function Sidebar(){
  const { addField, setSchema } = useFormBuilder();

  function exportSchema(){
    const data = localStorage.getItem('form_builder_schema_v1') || '[]';
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'form-schema.json'; a.click();
    URL.revokeObjectURL(url);
  }

  async function importSchema(e){
    const file = e.target.files?.[0];
    if(!file) return;
    const text = await file.text();
    try{
      const parsed = JSON.parse(text);
      setSchema(parsed);
      alert('Schema imported');
    }catch(e){
      alert('Invalid JSON');
    }
  }

  return (
    <aside className="sidebar">
      <h3>Field types</h3>
      <div className="field-list">
        {TYPES.map(t => (
          <div key={t.key} className="field-card">
            <div>{t.label}</div>
            <button className="small" onClick={()=>addField(t.key)}>Add</button>
          </div>
        ))}
      </div>

      <hr style={{margin:'12px 0'}} />

      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        <button className="btn small" onClick={exportSchema}>Export Schema</button>
        <label className="btn small" style={{display:'inline-block',cursor:'pointer'}}>
          Import Schema
          <input type="file" accept="application/json" style={{display:'none'}} onChange={importSchema} />
        </label>
        <button className="small" onClick={()=>{ if(confirm('Clear saved form?')){ localStorage.removeItem('form_builder_schema_v1'); window.location.reload(); } }}>Reset</button>
      </div>

      <p className="hint">Tip: Add fields and edit their properties on the right. Drag to reorder.</p>
    </aside>
  );
}
