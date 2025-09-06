import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadSchema, saveSchema } from '../utils/storage';
import { v4 as uuid } from 'uuid';

const FormBuilderContext = createContext();

export function useFormBuilder(){ return useContext(FormBuilderContext); }

const initialFields = [
  // an example starter field (optional)
];

export function FormBuilderProvider({ children }){
  const [fields, setFields] = useState(() => loadSchema() || initialFields);
  const [selectedFieldId, setSelectedFieldId] = useState(null);

  useEffect(()=>{ saveSchema(fields); }, [fields]);

  function addField(type){
    const newField = {
      id: uuid(),
      type,
      label: type === 'select' ? 'Select' : `${type.charAt(0).toUpperCase()+type.slice(1)} Field`,
      placeholder: '',
      options: type === 'select' || type === 'radio' || type === 'checkbox' ? ['Option 1','Option 2'] : [],
      required: false,
      validation: {}
    };
    setFields(prev => [...prev, newField]);
    setSelectedFieldId(newField.id);
  }

  function updateField(id, patch){
    setFields(prev => prev.map(f => f.id === id ? { ...f, ...patch } : f));
  }

  function deleteField(id){
    setFields(prev => prev.filter(f => f.id !== id));
    if(selectedFieldId === id) setSelectedFieldId(null);
  }

  function moveField(fromIndex, toIndex){
    setFields(prev => {
      const items = Array.from(prev);
      const [moved] = items.splice(fromIndex,1);
      items.splice(toIndex,0,moved);
      return items;
    });
  }

  function setSchema(schema){
    setFields(schema || []);
    setSelectedFieldId(null);
  }

  return (
    <FormBuilderContext.Provider value={{
      fields, addField, updateField, deleteField, moveField,
      selectedFieldId, setSelectedFieldId, setSchema
    }}>
      {children}
    </FormBuilderContext.Provider>
  );
}
