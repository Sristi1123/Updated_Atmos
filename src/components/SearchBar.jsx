import { useState, useRef, useEffect } from 'react';
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
import layout from 'simple-keyboard-layouts/build/layouts/hindi';

export default function SearchBar({ isHindi, setIsHindi, onSearch, onForecast }) {
  const [input, setInput] = useState('');
  const keyboard = useRef(null);
  const keyboardRef = useRef(null);
  
  // Use refs to handle closures safely for event listeners
  const inputRef = useRef(input);
  inputRef.current = input;
  
  const onSearchRef = useRef(onSearch);
  onSearchRef.current = onSearch;

  // Initialize and destroy keyboard
  useEffect(() => {
    if (isHindi && keyboardRef.current) {
      if (keyboard.current) {
        keyboard.current.destroy();
      }
      try {
        const layoutConfig = layout.default || layout.layout ? layout.default || layout : layout;
        
        const KeyboardClass = typeof Keyboard === 'function' ? Keyboard : Keyboard.default;
        
        keyboard.current = new KeyboardClass(keyboardRef.current, {
          onChange: val => setInput(val),
          onKeyPress: button => {
            if (button === "{enter}") {
              onSearchRef.current(inputRef.current);
            }
            if (button === "{shift}" || button === "{lock}") {
              const currentLayout = keyboard.current.options.layoutName;
              const shiftToggle = currentLayout === "default" ? "shift" : "default";
              keyboard.current.setOptions({
                layoutName: shiftToggle
              });
            }
          },
          ...layoutConfig
        });
        
        keyboard.current.setInput(inputRef.current);
      } catch (err) {
        console.error("Keyboard Initialization Error:", err);
      }
    }

    return () => {
      if (keyboard.current) {
        keyboard.current.destroy();
        keyboard.current = null;
      }
    };
  }, [isHindi]);

  // Sync Input state to Keyboard when Input changes externally
  useEffect(() => {
    if (keyboard.current && keyboard.current.getInput() !== input) {
      keyboard.current.setInput(input);
    }
  }, [input]);

  const handleToggle = () => {
    setIsHindi(!isHindi);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="w-100">
      <div className="d-flex w-100 align-items-center">
        <input 
          className="form-class flex-grow-1" 
          type="search" 
          value={input}
          onChange={handleInputChange}
          placeholder="Input your search keyword" 
          onKeyDown={(e) => e.key === 'Enter' && onSearch(input)}
        />
        <button 
          type="button" 
          onClick={handleToggle}
          className={`btn ml-3 ${isHindi ? 'btn-warning' : 'btn-outline-warning'}`}
          title="Toggle Hindi Keyboard" 
          style={{ borderRadius: '50%', width: '50px', height: '50px', flexShrink: 0 }}
        >
          <i className="fas fa-globe" style={{ fontSize: '1.5rem' }}></i>
        </button>
      </div>
      
      {/* We use display property to hide/show to maintain the DOM node for simple-keyboard */}
      <div 
         ref={keyboardRef}
         className="simple-keyboard mt-3" 
         style={{ display: isHindi ? 'block' : 'none', color: 'black', background: 'rgba(255,255,255,0.9)', borderRadius: '10px' }}
      ></div>
      
      <div className="btn-group-custom mt-4 d-flex justify-content-center">
        <input type="button" className="btn btn-warning mr-2" value="Weather" onClick={() => onSearch(input)} />
        <input type="button" className="btn btn-warning ml-2" value="Forecast!" onClick={() => onForecast(input)} />
      </div>
    </div>
  );
}
