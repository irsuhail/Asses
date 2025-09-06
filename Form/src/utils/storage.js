const KEY = 'form_builder_schema_v1';

export function saveSchema(schema){
  localStorage.setItem(KEY, JSON.stringify(schema));
}

export function loadSchema(){
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e){ return null; }
}

export function clearSchema(){
  localStorage.removeItem(KEY);
}
