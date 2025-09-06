import React from 'react';
import { useFormBuilder } from '../context/FormBuilderContext';

export default function FieldEditor(){
  const { fields, selectedFieldId, updateField, deleteField } = useFormBuilder();
  const field = fields.find(f=>f.id === selectedFieldId);

  if(!field) return (
    <div className="field-editor">
      <h4>Field Editor</h4>
      <p className="hint">Select a field on the canvas to edit its properties.</p>
    </div>
  );

  function onChange(key, val){
    updateField(field.id, { [key]: val });
  }

  function updateOption(idx, val){
    const next = [...field.options];
    next[idx] = val;
    updateField(field.id, { options: next });
  }
  function addOption(){ updateField(field.id, { options: [...field.options, `Option ${field.options.length+1}`] }); }
  function removeOption(idx){ updateField(field.id, { options: field.options.filter((_,i)=>i!==idx) }); }

  return (
    <div className="field-editor">
      <h4>Field Editor</h4>
      <div className="field-prop">
        <label>Label</label>
        <input className="input" value={field.label} onChange={e=>onChange('label', e.target.value)} />
      </div>

      {field.type !== 'checkbox' && field.type !== 'radio' && (
        <div className="field-prop">
          <label>Placeholder</label>
          <input className="input" value={field.placeholder} onChange={e=>onChange('placeholder', e.target.value)} />
        </div>
      )}

      {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
        <div className="field-prop">
          <label>Options</label>
          {field.options.map((opt, idx)=>(
            <div key={idx} style={{display:'flex',gap:8, marginBottom:8}}>
              <input className="input" value={opt} onChange={e=>updateOption(idx, e.target.value)} />
              <button className="small" onClick={()=>removeOption(idx)}>Remove</button>
            </div>
          ))}
          <button className="small" onClick={addOption}>Add option</button>
        </div>
      )}

      <div className="field-prop">
        <label><input type="checkbox" checked={field.required} onChange={e=>onChange('required', e.target.checked)} /> Required</label>
      </div>

      <div className="footer-actions">
        <button className="small" onClick={()=>deleteField(field.id)} style={{background:'#ef4444'}}>Delete</button>
      </div>
    </div>
  );
}
