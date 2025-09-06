import React, { useState } from 'react';

function Field({ field, value, onChange }){
  const common = {
    placeholder: field.placeholder || '',
    value: value ?? '',
    onChange: e => onChange(field.id, e.target.value)
  };

  if(field.type === 'text' || field.type === 'email' || field.type === 'number') {
    return <input className="input" type={field.type} {...common} />;
  }

  if(field.type === 'select'){
    return (
      <select className="input" value={value ?? ''} onChange={e=>onChange(field.id, e.target.value)}>
        <option value="">-- select --</option>
        {field.options.map((o,i)=><option key={i} value={o}>{o}</option>)}
      </select>
    );
  }

  if(field.type === 'radio'){
    return (
      <div>
        {field.options.map((o,i)=>(
          <label key={i} style={{display:'block'}}>
            <input type="radio" name={field.id} value={o} checked={value===o} onChange={e=>onChange(field.id, e.target.value)} /> {o}
          </label>
        ))}
      </div>
    );
  }

  if(field.type === 'checkbox'){
    // For checkbox group we store array of selected options
    const vals = Array.isArray(value) ? value : [];
    const toggle = (opt) => {
      if(vals.includes(opt)) onChange(field.id, vals.filter(v=>v!==opt));
      else onChange(field.id, [...vals, opt]);
    };
    return (
      <div>
        {field.options.map((o,i)=>(
          <label key={i} style={{display:'block'}}>
            <input type="checkbox" checked={vals.includes(o)} onChange={()=>toggle(o)} /> {o}
          </label>
        ))}
      </div>
    );
  }

  return null;
}

export default function FormRenderer({ fields = [], onSubmit }){
  const initial = {};
  fields.forEach(f => initial[f.id] = (f.type === 'checkbox' ? [] : ''));

  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  function onChange(id, val){
    setForm(prev => ({ ...prev, [id]: val }));
  }

  function validate(){
    const errs = {};
    fields.forEach(f => {
      const val = form[f.id];
      if(f.required){
        if(f.type === 'checkbox'){
          if(!Array.isArray(val) || val.length === 0) errs[f.id] = 'Required';
        } else if(!val) errs[f.id] = 'Required';
      }
      // basic min/max for length (example)
      if(f.validation?.min && typeof val === 'string' && val.length < f.validation.min) errs[f.id] = `Min ${f.validation.min}`;
      if(f.validation?.max && typeof val === 'string' && val.length > f.validation.max) errs[f.id] = `Max ${f.validation.max}`;
      if(f.validation?.pattern){
        try {
          const rx = new RegExp(f.validation.pattern);
          if(typeof val === 'string' && val && !rx.test(val)) errs[f.id] = 'Invalid format';
        } catch(e){}
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e){
    e.preventDefault();
    if(!validate()) return;
    // Build submission object keyed by label for nicer JSON
    const out = {};
    fields.forEach(f => { out[f.label || f.id] = form[f.id]; });
    if(onSubmit) onSubmit(out);
  }

  return (
    <form className="preview-form" onSubmit={handleSubmit}>
      {fields.map(f => (
        <div key={f.id}>
          <label style={{fontWeight:600}}>{f.label}{f.required && '*'}</label>
          <Field field={f} value={form[f.id]} onChange={onChange} />
          {errors[f.id] && <div style={{color:'crimson',fontSize:13}}>{errors[f.id]}</div>}
        </div>
      ))}

      <div style={{display:'flex',gap:8,justifyContent:'flex-end',marginTop:6}}>
        <button type="submit" className="btn small">Submit</button>
      </div>
    </form>
  );
}
