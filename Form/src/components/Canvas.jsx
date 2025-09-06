import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useFormBuilder } from '../context/FormBuilderContext';

export default function Canvas(){
  const { fields, moveField, setSelectedFieldId } = useFormBuilder();

  function onDragEnd(result){
    if(!result.destination) return;
    if(result.source.index === result.destination.index) return;
    moveField(result.source.index, result.destination.index);
  }

  return (
    <section className="canvas">
      <h3>Form Canvas</h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="canvas-droppable">
          {(provided)=>(
            <div ref={provided.innerRef} {...provided.droppableProps} style={{minHeight:200}}>
              {fields.length === 0 && (
                <div className="drag-placeholder">No fields yet — add from the left</div>
              )}

              {fields.map((f, i)=>(
                <Draggable key={f.id} draggableId={f.id} index={i}>
                  {(prov, snapshot)=>(
                    <div
                      ref={prov.innerRef}
                      {...prov.draggableProps}
                      {...prov.dragHandleProps}
                      className="field-card"
                      onClick={()=>setSelectedFieldId(f.id)}
                    >
                      <div>
                        <strong>{f.label}</strong>
                        <div style={{fontSize:13,color:'#555'}}>{f.type}</div>
                      </div>
                      <div style={{fontSize:13,color:'#666'}}>#{i+1}</div>
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}
