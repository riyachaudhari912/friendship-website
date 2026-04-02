const { useState, useEffect } = React;

const memories = [
  { id: 1, title: "Chapter One", img: "images/ch1.jpg", text: "It all started with two strangers who had no idea they were about to become forever.", reveal: "You made ordinary days feel like stories worth telling." },
  { id: 2, title: "Chapter Two", img: "images/ch2.jpg", text: "Laughs that stuck, conversations that never really ended.", reveal: "Every “I’m here” built the kind of trust you can feel." },
  { id: 3, title: "Chapter Three", img: "images/ch3.jpg", text: "We grew, we changed, we stumbled — but somehow, we never let go of each other.", reveal: "We kept choosing each other, even when it wasn’t easy." },
  { id: 4, title: "Chapter Four", img: "images/ch4.jpg", text: "Late nights, endless talks, and the quiet comfort of always having each other.", reveal: "That’s what real friendship feels like: steady, warm, and true." },
  { id: 5, title: "Chapter Five", img: "images/ch5.jpg", text: "Dreams we whispered back then, and the future we’re still chasing side by side.", reveal: "You bring clarity to my chaos, and hope to every plan." },
  { id: 6, title: "Chapter Six", img: "images/ch6.jpg", text: "And now we’re here: fifteen years, still growing.", reveal: "I’m proud of us — and excited for what comes next." }
];

function EnhancedMemoryCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="container">
      <div className="section__header">
        <h2>Interactive Memories</h2>
        <p>A dynamic timeline powered by React. Choose a chapter below to explore it.</p>
      </div>
      
      <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* Sidebar Chapter Menu */}
        <div style={{ flex: '1', minWidth: '240px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
           {memories.map((m, idx) => {
             const isActive = activeIndex === idx;
             return (
               <div 
                 key={m.id} 
                 onClick={() => { setActiveIndex(idx); setRevealed(false); }}
                 style={{
                   padding: '1.2rem 1.5rem',
                   cursor: 'pointer',
                   borderRadius: '16px',
                   background: isActive ? 'linear-gradient(90deg, rgba(155, 124, 255, 0.25), transparent)' : 'rgba(255,255,255,0.03)',
                   borderLeft: isActive ? '4px solid #9b7cff' : '4px solid rgba(255,255,255,0.05)',
                   border: isActive ? '1px solid rgba(155, 124, 255, 0.3)' : '1px solid transparent',
                   transition: 'all 0.3s ease',
                   boxShadow: isActive ? '0 10px 30px rgba(155, 124, 255, 0.1)' : 'none',
                   transform: isActive ? 'translateX(5px)' : 'none'
                 }}
               >
                 <h4 style={{ 
                    margin: 0, 
                    fontSize: '1.2rem',
                    fontFamily: '"Playfair Display", serif',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.6)' 
                 }}>
                   {m.title}
                 </h4>
               </div>
             )
           })}
        </div>
        
        {/* Content Viewer container */}
        <div style={{ flex: '2', minWidth: '320px', position: 'relative', minHeight: '500px' }}>
          {memories.map((m, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div 
                key={m.id}
                style={{
                  position: isActive ? 'relative' : 'absolute',
                  top: 0, left: 0, width: '100%',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                  transition: 'all 0.6s cubic-bezier(0.2, 0.9, 0.2, 1)',
                  pointerEvents: isActive ? 'auto' : 'none',
                  zIndex: isActive ? 10 : 0
                }}
              >
                <div className="memory-card" style={{ transform: 'none', margin: 0, width: '100%' }}>
                  <div className="memory-card__media">
                    <div className="chapter-photo" style={{ transform: 'none', height: '340px', padding: '14px', borderRadius: '24px' }}>
                      <img src={m.img} alt={m.title} style={{ height: '100%', objectFit: 'cover', borderRadius: '18px' }} />
                    </div>
                  </div>
                  <div className="memory-card__body" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '2.4rem', marginBottom: '12px' }}>{m.title}</h3>
                    <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.6' }}>{m.text}</p>
                    
                    <button 
                      className="btn btn--primary" 
                      onClick={() => setRevealed(!revealed)}
                      style={{ marginTop: '1.5rem', padding: '12px 24px' }}
                    >
                      {revealed ? "Hide Secret Message" : "Reveal Secret Message"}
                    </button>
                    
                    <div style={{
                      marginTop: '1.5rem',
                      maxHeight: revealed ? '200px' : '0',
                      opacity: revealed ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'all 0.5s cubic-bezier(0.2, 0.9, 0.2, 1)',
                      color: '#53f2d1',
                      fontSize: '1.25rem',
                      fontStyle: 'italic',
                      lineHeight: '1.6',
                      borderLeft: '3px solid #53f2d1',
                      paddingLeft: '1rem'
                    }}>
                      "{m.reveal}"
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

// Check if section exists and render React there
const domNode = document.getElementById("react-memory-root");
if (domNode) {
  const root = ReactDOM.createRoot(domNode);
  root.render(<EnhancedMemoryCards />);
}
