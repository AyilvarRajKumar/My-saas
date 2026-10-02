import { useEffect, useRef, useState } from 'react';
import { HiChevronDown, HiCheck } from 'react-icons/hi';

interface ServiceSelectProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

/** Custom dropdown: native <select> popups render unstyled and misplaced inside the 3D-tilted form card. */
export default function ServiceSelect({ value, options, onChange }: ServiceSelectProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-left focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/50 focus:outline-none transition-all"
      >
        <span className={value ? 'text-white' : 'text-gray-500'}>{value || 'Service Interested In'}</span>
        <HiChevronDown className={`text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          data-lenis-prevent
          className="absolute left-0 right-0 top-full mt-2 z-50 max-h-64 overflow-y-auto rounded-xl border border-white/10 bg-[#12121a] p-1.5 shadow-2xl shadow-black/60"
        >
          {options.map((opt) => (
            <li key={opt} role="option" aria-selected={opt === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-gray-200 hover:bg-accent-purple/20 hover:text-white transition-colors"
              >
                {opt}
                {opt === value && <HiCheck className="text-accent-cyan" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
